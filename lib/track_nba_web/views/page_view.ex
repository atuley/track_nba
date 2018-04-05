defmodule TrackNbaWeb.PageView do
  use TrackNbaWeb, :view

  def render("players.json", %{data: players}) do
    %{data: Enum.map(players, fn(player) ->
        render(__MODULE__, "player.json", data: player)
      end)
    }
  end

  # dont use unecessary fields
  def render("player.json", %{data: player}) do
    %{
      id: player.personId,
      country: player.country,
      firstName: player.firstName,
      heightFeet: player.heightFeet,
      heightInches: player.heightInches,
      isActive: player.isActive,
      lastName: player.lastName,
      pos: player.pos,
      teamId: player.teamId,
      fullName: "#{player.firstName} #{player.lastName}",
      # stats: player.stats
    }
  end
end
