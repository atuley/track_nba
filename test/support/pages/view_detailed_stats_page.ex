defmodule TrackNbaWeb.ViewDetailedStatsPage do
  use TrackNbaWeb.Page

  def visit() do
    navigate_to("/player/201939")
  end

  def has_last_three_games?() do
    find_element(:class, "game-1")
    find_element(:class, "game-2")
    find_element(:class, "game-3")
  end
end
