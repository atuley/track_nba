defmodule TrackNbaWeb.PageController do
  alias TrackNbaWeb.Utils
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    player = NbaEx.players |> List.first
    render(conn, "index.html", player: player)
  end

  def players(conn, _params) do
    players = NbaEx.players()

    render(conn, "players.json", data: players)
  end

  def create(conn, %{player: player}) do
    stats = player.id
    |> NbaEx.player_game_log
    |> List.first

    Map.put_new(player, :stats, stats)

    render(conn, "player.json", data: player)
  end
end
