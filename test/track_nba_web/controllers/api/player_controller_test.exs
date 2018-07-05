defmodule TrackNbaWeb.PlayerControllerTest do
  use TrackNbaWeb.ConnCase
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  test "GET /api/players", %{conn: conn} do
    use_cassette "players" do
      conn = get conn, "/api/players"
      assert json_response(conn, 200)
    end
  end
  # 
  # test "POST /api/player/:player_id" do
  #
  # end
  #
  # test "POST /api/players/:player_ids" do
  #
  # end
end
