defmodule TrackNbaWeb.ViewDetailedStatsFeature do
  use TrackNbaWeb.FeatureCase
  alias TrackNbaWeb.ViewDetailedStatsPage

  setup do
    ViewDetailedStatsPage.visit()
    :ok
  end

  # test "player stat detail page is displayed with last three games played" do
  #   assert ViewDetailedStatsPage.has_last_three_games?()
  # end
end
