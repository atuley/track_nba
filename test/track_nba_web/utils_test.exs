defmodule UtilsTest do
  use ExUnit.Case, async: false
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  alias TrackNbaWeb.Utils

  setup_all do
    HTTPoison.start()
  end

  test "find_team/1" do
    use_cassette "teams" do
      assert Utils.find_team("201939") == "1610612744"
    end
  end

  describe "find_game/1" do
    test "should return game_id if given team has a game on the scoreboard" do
      use_cassette "scoreboard" do
        assert Utils.find_game("1610612744", "20180504") == "0041700233"
      end
    end

    test "should return error if given team doesn't have game on scoreboard" do
      use_cassette "scoreboard" do
        assert Utils.find_game("1610612758", "20180504") == {:error, "Game for player not found"}
      end
    end
  end

  describe "retrieve_stats_for_player/2" do
    test "should return player stats if game has begun" do
      use_cassette "boxscore" do
        stats = Utils.retrieve_stats_for_player("0041700233", "201939", "20180504")
        |> Map.get(:player_stats)
        |> List.first

        assert stats.assists == "3"
        assert stats.points == "22"
        assert stats.totReb == "3"
      end
    end

    test "should return boxscore with no player stats if game has not started" do
      use_cassette "boxscore_no_stats" do
        stats_length = Utils.retrieve_stats_for_player("0041700214", "201939", "20180507")
        |> Map.get(:player_stats)
        |> Kernel.length

        assert stats_length == 1
      end
    end

    test "should return error tuple if passed down from find_game" do
      use_cassette "boxscore_error" do
        assert Utils.retrieve_stats_for_player({:error, "Game for player not found"}, "201939", "20180504") == {:error, "Game for player not found"}
      end
    end
  end

  test "filter_out_non_franchise_players/1" do
    use_cassette "players" do
      players = NbaEx.players()

      assert players |> length == 604
      assert Utils.filter_out_non_franchise_players(players) |> length == 505
    end
  end

  test "add_team_colors/1" do
    use_cassette "players" do
      result = NbaEx.players()
      |> Utils.filter_out_non_franchise_players()
      |> Utils.add_team_colors()

      first_player = result
      |> List.first()

      assert first_player.teamColor == "#002d62"
    end
  end

  test "find_last_game/1" do
    use_cassette "game_log" do
      stats = Utils.find_last_game("201939")
      |> Map.get(:player_stats)
      |> List.first

      assert stats.fgp == "50.0"
      assert stats.min == "27:03"
      assert stats.points == "5"
    end
  end
end
