defmodule TrackNbaWeb.PlayerController do
  alias TrackNbaWeb.Utils
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: NbaEx.players())
  end

  def create(conn, %{"player_id" => player_id}) do
    stats = player_id
    |> Utils.find_team()
    |> Utils.find_game()
    |> Utils.retrieve_stats_for_player(player_id)

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)

    new_player = Map.put_new(player, :stats, stats)

    render(conn, "player_stat.json", data: new_player)
  end
end
