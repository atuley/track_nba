defmodule TrackNbaWeb.ViewDetailedStatsPage do
  use TrackNbaWeb.Page

  def visit() do
    navigate_to("/player/201939")
  end

  def has_name?() do
    find_element(:class, "qa-player-name") |> inner_text()
  end
end
