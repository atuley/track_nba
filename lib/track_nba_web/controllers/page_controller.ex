defmodule TrackNbaWeb.PageController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    player = NbaEx.players |> List.first
    render(conn, "index.html", player: player)
  end
end
