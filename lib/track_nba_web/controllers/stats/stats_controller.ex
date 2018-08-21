defmodule TrackNbaWeb.StatsController do
  use TrackNbaWeb, :controller

  def show(conn, _params) do
    render(conn, "show.html")
  end
end
