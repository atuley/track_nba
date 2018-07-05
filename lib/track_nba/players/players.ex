defmodule TrackNba.Players do
  alias TrackNba.Colors

  def all do
    NbaEx.players()
    |> filter_out_non_franchise_players()
    |> add_team_colors()
  end

  def add_color(player) do
    team_color_for_player =
      Enum.find(Colors.all(), fn(color) ->
        color.teamId == player.teamId
      end)

    Map.put(player, :teamColor, team_color_for_player.primaryColor)
  end

  defp filter_out_non_franchise_players(players) do
    players
    |> Enum.filter(fn(player) -> player.yearsPro != "" end)
  end

  defp add_team_colors(players) do
    Enum.map(players, fn(player) -> add_color(player) end)
  end
end
