defmodule TrackNbaWeb.PlayerController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: NbaEx.players())
  end

  def create(conn, %{"player_id" => player_id}) do
    stats = player_id
    |> find_team()
    |> find_game()
    # |> retrieve_stats_for_player(game, player_id)


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
    scoreboard = NbaEx.scoreboard_for("20180410")

    game = scoreboard.games
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)
    |> IO.inspect

  end
end
