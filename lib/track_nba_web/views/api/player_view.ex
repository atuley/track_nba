defmodule TrackNbaWeb.PlayerView do
  use TrackNbaWeb, :view

  def render("players.json", %{data: players}) do
    %{
      data:
        Enum.map(players, fn player ->
          render(__MODULE__, "player.json", data: player)
        end)
    }
  end

  def render("player.json", %{data: player}) do
    %{
      personId: player.personId,
      country: player.country,
      firstName: player.firstName,
      heightFeet: player.heightFeet,
      heightInches: player.heightInches,
      isActive: player.isActive,
      lastName: player.lastName,
      pos: player.pos,
      teamId: player.teamId,
      fullName: "#{player.firstName} #{player.lastName}",
      isWatching: false,
      teamColor: player.teamColor
    }
  end

  def render("player_stat.json", %{data: player}) do
    %{
      data: %{
        personId: player.personId,
        country: player.country,
        firstName: player.firstName,
        heightFeet: player.heightFeet,
        heightInches: player.heightInches,
        isActive: player.isActive,
        lastName: player.lastName,
        pos: player.pos,
        teamId: player.teamId,
        fullName: "#{player.firstName} #{player.lastName}",
        stats: player.stats,
        teamColor: player.teamColor
      }
    }
  end

  def render("player_stats.json", %{data: players}) do
    %{
      data:
        Enum.map(players, fn player ->
          render(__MODULE__, "player_s.json", data: player)
        end)
    }
  end

  def render("player_s.json", %{data: player}) do
    %{
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
      personId: player.personId,
      teamId: player.teamId,
      pos: player.pos,
      stats: player.stats,
      teamColor: player.teamColor
    }
  end
end
