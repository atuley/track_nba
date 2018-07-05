defmodule TrackNbaWeb.Utils do
  alias TrackNba.Players

  def find_team(player_id) do
    NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Map.get(:teamId)
  end

  def find_game(team_id, date) do
    result = date
    |> NbaEx.scoreboard_for()
    |> Map.get(:games)
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)

    case result do
      nil -> {:error, "Game for player not found"}
      _   -> Map.get(result, :gameId)
    end
  end

  def find_last_game(player_id) do
    result = player_id
    |> NbaEx.player_game_log()
    |> List.first

    date = result
    |> Map.get(:gameDateUTC)
    |> String.replace("-", "")

    game_id = result
    |> Map.get(:gameId)

    retrieve_stats_for_player(game_id, player_id, date)
  end

  def retrieve_stats_for_player({:error, "Game for player not found"}, _player_id, _date), do: {:error, "Game for player not found"}
  def retrieve_stats_for_player(game_id, player_id, date) do
    result = date
    |> NbaEx.boxscore(game_id)
    # |> IO.inspect

    stat = Map.get(result, :player_stats)
    |> Kernel.length
    |> has_stats?(result, player_id)

    Map.put(result, :stats, stat)
  end

  defp has_stats?(1, result, _player_id), do: result
  defp has_stats?(_length, result, player_id) do
    result
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end)
    # |> Players.add_color()
  end

  def current_date do
    Timex.now("America/Los_Angeles")
    |> DateTime.to_date()
    |> Date.to_iso8601(:basic)
  end

  # TODO: write unit test
  def find_stats_for_id(player_id) do
    stats = player_id
    |> find_last_game()

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Players.add_color()

    case stats do
      {:error, "Game for player not found"} -> Map.put_new(player, :stats, %NbaEx.PlayerStat{})
      _ -> Map.put_new(player, :stats, stats)
    end
  end
end
