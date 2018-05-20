defmodule TrackNbaWeb.PlayerControllerTest do
  use TrackNbaWeb.ConnCase
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  test "GET /api/players", %{conn: conn} do
    use_cassette "players" do
      conn = get conn, "/api/players"
      assert json_response(conn, 200)
    end
  end
end
