defmodule TrackNbaWeb.WatchPlayerFeature do
  use TrackNbaWeb.FeatureCase
  alias TrackNbaWeb.WatchPlayerPage

  setup do
    WatchPlayerPage.visit
    WatchPlayerPage.search("steph")
    WatchPlayerPage.watch_player("player-201939")
    :ok
  end

  test "player stats exist after watching a player" do
    assert WatchPlayerPage.has_stats?()
  end

  test "player no longer exists after removing" do
    WatchPlayerPage.remove_player()
    assert_raise(Hound.NoSuchElementError, fn -> WatchPlayerPage.has_stats?() end)
  end
end
