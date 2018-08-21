defmodule TrackNbaWeb.StatsControllerTest do
  use TrackNbaWeb.ConnCase
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  test "GET /player/:player_id", %{conn: conn} do
    # use_cassette "players" do
    conn = get(conn, "/player/201939")
    assert html_response(conn, 200)
    # end
  end
end
