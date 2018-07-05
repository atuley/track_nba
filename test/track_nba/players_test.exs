defmodule PlayersTest do
  use ExUnit.Case, async: false
  use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney

  alias TrackNba.Players

  setup_all do
    HTTPoison.start()
  end

  describe "all/0" do
    test "should return all franchise NBA players with their given team colors" do
      use_cassette "players" do
        first_player = Players.all() |> List.first()

        assert Players.all() |> length == 505
        assert first_player.teamColor == "#002d62"
      end
    end
  end
end
