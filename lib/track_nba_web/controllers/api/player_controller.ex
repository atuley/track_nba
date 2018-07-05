defmodule TrackNbaWeb.PlayerController do
  alias TrackNba.Players
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: Players.all())
  end

  def create(conn, %{"player_id" => player_id}) do
    player = player_id
    |> Players.find_player_stats()

    render(conn, "player_stat.json", data: player)
  end

  def player_stats(conn, %{"player_ids" => player_ids}) do
    players = player_ids
    |> String.split(",")
    |> Enum.map(fn player_id ->
      Players.find_player_stats(player_id)
    end)

    render(conn, "player_stats.json", data: players)
  end
end
