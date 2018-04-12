defmodule TrackNbaWeb.PlayerController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: NbaEx.players())
  end

  def create(conn, %{"player_id" => player_id}) do
    stats = player_id
    |> find_team()
    |> find_game()
    |> retrieve_stats_for_player(player_id)

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)

    new_player = Map.put_new(player, :stats, stats)

    render(conn, "player_stat.json", data: new_player)
  end

  defp find_team(player_id) do
    NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Map.get(:teamId)
  end

  defp find_game(team_id) do
    scoreboard = NbaEx.scoreboard_for("20180411") # use NbaEx.scoreboard

    game = scoreboard.games
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)
    |> Map.get(:gameId)
  end

  defp retrieve_stats_for_player(game_id, player_id) do
    NbaEx.boxscore("20180411", game_id) # pass in date
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end) # if player did not play? result will be nil
  end
end
