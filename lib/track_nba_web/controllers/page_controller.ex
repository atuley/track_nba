defmodule TrackNbaWeb.PageController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    player = NbaEx.players |> List.first
    render(conn, "index.html", player: player)
  end

  def show(conn, _params) do
    players = NbaEx.players()
    # |> Poison.encode!

    render(conn, "show.json", data: players)
  end
end
