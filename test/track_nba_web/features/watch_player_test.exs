defmodule TrackNbaWeb.WatchPlayerFeature do
  use TrackNbaWeb.FeatureCase
  alias TrackNbaWeb.WatchPlayerPage

  test "visit item create page" do
    WatchPlayerPage.visit
    :timer.sleep(5000)
  end
end
