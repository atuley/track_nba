defmodule TrackNbaWeb.Router do
  use TrackNbaWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", TrackNbaWeb do
    pipe_through(:api)
    get("/players", PlayerController, :index)
    post("/player/:player_id", PlayerController, :create)
    post("/players/:player_ids", PlayerController, :player_stats)
  end

  scope "/", TrackNbaWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
  end
end
