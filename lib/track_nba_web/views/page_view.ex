defmodule TrackNbaWeb.PageView do
  use TrackNbaWeb, :view

  def render("show.json", %{data: players}) do
    %{data: Enum.map(players, fn(player) ->
        render(__MODULE__, "player.json", data: player)
      end)
    }
  end

  # dont use unecessary fields
  def render("player.json", %{data: player}) do
    %{
      id: player.personId,
      collegeName: player.collegeName,
      country: player.country,
      dateOfBirthUTC: player.dateOfBirthUTC,
      firstName: player.firstName,
      heightFeet: player.heightFeet,
      heightInches: player.heightInches,
      isActive: player.isActive,
      jersey: player.jersey,
      lastName: player.lastName,
      nbaDebutYear: player.nbaDebutYear,
      pos: player.pos,
      teamId: player.teamId,
      weightPounds: player.weightPounds,
      yearsPro: player.yearsPro,
      fullName: "#{player.firstName} #{player.lastName}",
      stats: %{}
    }
  end
end
