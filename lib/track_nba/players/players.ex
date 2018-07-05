defmodule TrackNba.Players do
  alias TrackNba.Colors
  alias TrackNbaWeb.Utils

  def all do
    NbaEx.players()
    |> filter_out_non_franchise_players()
    |> add_team_colors()
  end

  def find_player_stats(player_id) do
    stats =
      player_id
      |> find_last_game()

    player =
      player_id
      |> find_player_by_id()

    Map.put_new(player, :stats, stats)
  end

  defp find_player_by_id(player_id) do
    NbaEx.players()
    |> Enum.find(fn player -> player.personId == player_id end)
    |> Colors.add_color()
  end

  defp find_last_game(player_id) do
    result =
      player_id
      |> NbaEx.player_game_log()
      |> List.first()

    date =
      result
      |> Map.get(:gameDateUTC)
      |> String.replace("-", "")

    game_id =
      result
      |> Map.get(:gameId)

    retrieve_stats_for_player(game_id, player_id, date)
  end

  defp retrieve_stats_for_player(game_id, player_id, date) do
    result =
      date
      |> NbaEx.boxscore(game_id)

    stat =
      Map.get(result, :player_stats)
      |> length()
      |> has_stats?(result, player_id)

    Map.put(result, :stats, stat)
  end

  defp has_stats?(1, result, _player_id), do: result

  defp has_stats?(_length, result, player_id) do
    result
    |> Map.get(:player_stats)
    |> Enum.find(fn player -> player.personId == player_id end)
  end

  defp filter_out_non_franchise_players(players) do
    players
    |> Enum.filter(fn player -> player.yearsPro != "" end)
  end

  defp add_team_colors(players) do
    Enum.map(players, fn player -> Colors.add_color(player) end)
  end
end
