defmodule TrackNbaWeb.PlayerController do
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: NbaEx.players())
  end

  def create(conn, %{"player_id" => player_id}) do
    stats = player_id
    |> NbaEx.player_game_log
    |> List.first

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)

    new_player = Map.put_new(player, :stats, stats)

    render(conn, "player_stat.json", data: new_player)
  end
end
