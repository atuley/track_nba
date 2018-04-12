defmodule TrackNbaWeb.Utils do
  def find_team(player_id) do
    NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Map.get(:teamId)
  end

  def find_game(team_id) do
    scoreboard = NbaEx.scoreboard_for("20180411") # use NbaEx.scoreboard

    game = scoreboard.games
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)
    |> Map.get(:gameId)
  end

  def retrieve_stats_for_player(game_id, player_id) do
    NbaEx.boxscore("20180411", game_id) # pass in date
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end) # if player did not play? result will be nil
  end
end
