defmodule TrackNbaWeb.PlayerControllerTest do
  use TrackNbaWeb.ConnCase
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  test "GET /api/players", %{conn: conn} do
    use_cassette "players" do
      conn = get(conn, "/api/players")
      assert json_response(conn, 200)
    end
  end

  describe "POST /api/player/:player_id" do
    test "returns 200 with valid player_id" do
      use_cassette "get_player" do
        conn = post(build_conn(), "/api/player/201939")

        assert json_response(conn, 200)
      end
    end

    # test "returns 400 if player_id is invalid" do
    #   use_cassette "get_player_error" do
    #     conn = post(build_conn(), "/api/player/20193")
    #
    #     assert json_response(conn, 400)
    #   end
    # end
  end

  describe  "POST /api/players/:player_ids" do
    test "return 200 with valid player_ids" do
      use_cassette "get_players" do
        conn = post(build_conn(), "/api/players/201939,203112")

        assert json_response(conn, 200)
      end
    end

    # test "returns 400 if player_id is invalid" do
    #   use_cassette "get_player_error" do
    #     conn = post(build_conn(), "/api/players/20193,20311")
    #
    #     assert json_response(conn, 400)
    #   end
    # end
  end
end
