defmodule TrackNbaWeb.Utils do
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

  def retrieve_stats_for_player({:error, "Game for player not found"}, _player_id, _date), do: {:error, "Game for player not found"}
  def retrieve_stats_for_player(game_id, player_id, date) do
    result = date
    |> NbaEx.boxscore(game_id)

    Map.get(result, :player_stats)
    |> Kernel.length
    |> has_stats?(result, player_id)
  end

  defp has_stats?(1, result, _player_id), do: result
  defp has_stats?(_length, result, player_id) do
    result
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end)
  end

  def current_date do
    Timex.now("America/Los_Angeles")
    |> DateTime.to_date()
    |> Date.to_iso8601(:basic)
  end

  def filter_out_non_franchise_players(players) do
    players
    |> Enum.filter(fn(player) -> player.yearsPro != "" end)
  end
end
