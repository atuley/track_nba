defmodule TrackNbaWeb.WatchPlayerPage do
  use TrackNbaWeb.Page

  def visit do
    navigate_to("/")
    :timer.sleep(2000)
  end

  def search(query) do
    fill_field({:class, "player-search-bar"}, query)
  end

  def watch_player(player_id) do
    click({:class, player_id})
  end

  def has_stats? do
    find_element(:class, "main-stats")
  end

  def remove_player do
    click({:class, "delete"})
  end
end
