defmodule TrackNbaWeb.PageController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
