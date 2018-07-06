defmodule TrackNba.PlayersTest do
  use ExUnit.Case, async: false
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  alias TrackNba.Players

  setup_all do
    HTTPoison.start()
  end

  describe "all/0" do
    test "should return all franchise NBA players with their given team colors" do
      use_cassette "players" do
        first_player = Players.all() |> List.first()

        assert Players.all() |> length == 505
        assert first_player.teamColor == "#002d62"
      end
    end
  end

  describe "find_player_stats/1" do
    test "should return a player with last game played stats" do
      player = Players.find_player_stats("201939")

      assert player.firstName == "Stephen"
      assert player.stats.stats.points == "37"
      assert player.teamColor == "#003399"
      assert player.stats.home_team_stats.totals.points == "85"
    end
  end
end
