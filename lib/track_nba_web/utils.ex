defmodule TrackNbaWeb.Utils do
  def find_team(player_id) do
    NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Map.get(:teamId)
  end

  def find_game(team_id) do
    scoreboard = NbaEx.scoreboard_for("20180411") # use NbaEx.scoreboard

    result = scoreboard.games
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)

    case result do
      nil -> {:error, "Game for player not found"}
      _   -> Map.get(result, :gameId)
    end
  end

  def retrieve_stats_for_player({:error, "Game for player not found"}, player_id), do: {:error, "Game for player not found"}
  def retrieve_stats_for_player(game_id, player_id) do
    result = NbaEx.boxscore("20180411", game_id) # pass in date from scoreboard
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end) # if player did not play? result will be nil
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
