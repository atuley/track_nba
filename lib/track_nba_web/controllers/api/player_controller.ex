defmodule TrackNbaWeb.PlayerController do
  alias TrackNbaWeb.Utils
  alias TrackNba.Players
  use TrackNbaWeb, :controller

  def index(conn, _params) do
    render(conn, "players.json", data: Players.all())
  end

  def create(conn, %{"player_id" => player_id}) do
    stats = player_id
    |> Utils.find_last_game()

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Players.add_color()

    new_player = case stats do
      {:error, "Game for player not found"} -> Map.put_new(player, :stats, %NbaEx.PlayerStat{})
      _ -> Map.put_new(player, :stats, stats)
    end

    render(conn, "player_stat.json", data: new_player)
  end

  def player_stats(conn, %{"player_ids" => player_ids}) do
    # IO.inspect(player_ids)
    players = player_ids
    |> String.split(",")
    |> Enum.map(fn player_id ->
      Utils.find_stats_for_id(player_id)
    end)

    render(conn, "player_stats.json", data: players)
  end
end
