defmodule TrackNbaWeb.Utils do
  def find_team(player_id) do
    NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Map.get(:teamId)
  end

  def find_game(team_id, date) do
    result = date
    |> NbaEx.scoreboard_for()
    |> Map.get(:games)
    |> Enum.find(fn(game) -> game.vTeam.teamId == team_id || game.hTeam.teamId == team_id end)

    case result do
      nil -> {:error, "Game for player not found"}
      _   -> Map.get(result, :gameId)
    end
  end

  def retrieve_stats_for_player({:error, "Game for player not found"}, _player_id, _date), do: {:error, "Game for player not found"}
  def retrieve_stats_for_player(game_id, player_id, date) do
    result = date
    |> NbaEx.boxscore(game_id)

    Map.get(result, :player_stats)
    |> Kernel.length
    |> has_stats?(result, player_id)
  end

  defp has_stats?(1, result, _player_id), do: result
  defp has_stats?(_length, result, player_id) do
    result
    |> Map.get(:player_stats)
    |> Enum.find(fn(player) -> player.personId == player_id end)
  end

  def current_date do
    Timex.now("America/Los_Angeles")
    |> DateTime.to_date()
    |> Date.to_iso8601(:basic)
  end

  def filter_out_non_franchise_players(players) do
    players
    |> Enum.filter(fn(player) -> player.yearsPro != "" end)
  end

  def add_team_colors(players) do
    colors =
      [
        %NbaEx.TeamConfig{
          primaryColor: "#e21a37",
          secondaryColor: "#e21a37",
          teamId: "1610612737",
          tricode: "ATL",
          ttsName: "Atlanta Hawks"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "1610612751",
          tricode: "BKN",
          ttsName: "Brooklyn Nets"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#00611b",
          secondaryColor: "#00611b",
          teamId: "1610612738",
          tricode: "BOS",
          ttsName: "Boston Celtics"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#00848e",
          secondaryColor: "#00848e",
          teamId: "1610612766",
          tricode: "CHA",
          ttsName: "Charlotte Hornets"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#b00203",
          secondaryColor: "#b00203",
          teamId: "1610612741",
          tricode: "CHI",
          ttsName: "Chicago Bulls"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#860038",
          secondaryColor: "#860038",
          teamId: "1610612739",
          tricode: "CLE",
          ttsName: "Cleveland Cavaliers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#006bb6",
          secondaryColor: "#006bb6",
          teamId: "1610612742",
          tricode: "DAL",
          ttsName: "Dallas Mavericks"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#feb927",
          secondaryColor: "#feb927",
          teamId: "1610612743",
          tricode: "DEN",
          ttsName: "Denver Nuggets"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#fa002c",
          secondaryColor: "#fa002c",
          teamId: "1610612765",
          tricode: "DET",
          ttsName: "Detroit Pistons"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#B2BBC1",
          secondaryColor: "#B2BBC1",
          teamId: "1610616833",
          tricode: "LBN",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "12304",
          tricode: "FCB",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#003399",
          secondaryColor: "#003399",
          teamId: "1610612744",
          tricode: "GSW",
          ttsName: "Golden State Warriors"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#cd212b",
          secondaryColor: "#cd212b",
          teamId: "1610612745",
          tricode: "HOU",
          ttsName: "Houston Rockets"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#ffb517",
          secondaryColor: "#ffb517",
          teamId: "1610612754",
          tricode: "IND",
          ttsName: "Indiana Pacers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#ed174b",
          secondaryColor: "#ed174b",
          teamId: "1610612746",
          tricode: "LAC",
          ttsName: "L.A. Clippers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#fdba33",
          secondaryColor: "#fdba33",
          teamId: "1610612747",
          tricode: "LAL",
          ttsName: "L.A. Lakers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "93",
          tricode: "MAC",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#5d76a9",
          secondaryColor: "#5d76a9",
          teamId: "1610612763",
          tricode: "MEM",
          ttsName: "Memphis Grizzlies"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#98002e",
          secondaryColor: "#98002e",
          teamId: "1610612748",
          tricode: "MIA",
          ttsName: "Miami Heat"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#00471b",
          secondaryColor: "#00471b",
          teamId: "1610612749",
          tricode: "MIL",
          ttsName: "Milwaukee Bucks"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#2b6291",
          secondaryColor: "#2b6291",
          teamId: "1610612750",
          tricode: "MIN",
          ttsName: "Minnesota Timberwolves"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#0c2340",
          secondaryColor: "#0c2340",
          teamId: "1610612740",
          tricode: "NOP",
          ttsName: "New Orleans Pelicans"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#f58426",
          secondaryColor: "#f58426",
          teamId: "1610612752",
          tricode: "NYK",
          ttsName: "New York Knicks"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#002d62",
          secondaryColor: "#002d62",
          teamId: "1610612760",
          tricode: "OKC",
          ttsName: "Oklahoma City Thunder"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#0077c0",
          secondaryColor: "#0077c0",
          teamId: "1610612753",
          tricode: "ORL",
          ttsName: "Orlando Magic"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#ef0022",
          secondaryColor: "#ef0022",
          teamId: "1610612755",
          tricode: "PHI",
          ttsName: "Philadelphia 76ers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#e76221",
          secondaryColor: "#e76221",
          teamId: "1610612756",
          tricode: "PHX",
          ttsName: "Phoenix Suns"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#cc0000",
          secondaryColor: "#cc0000",
          teamId: "1610612757",
          tricode: "POR",
          ttsName: "Portland Trail Blazers"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "12315",
          tricode: "RMD",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#51388a",
          secondaryColor: "#51388a",
          teamId: "1610612758",
          tricode: "SAC",
          ttsName: "Sacramento Kings"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#959191",
          secondaryColor: "#959191",
          teamId: "1610612759",
          tricode: "SAS",
          ttsName: "San Antonio Spurs"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "12329",
          tricode: "SDS",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "12330",
          tricode: "SLA",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#bd1b21",
          secondaryColor: "#bd1b21",
          teamId: "1610612761",
          tricode: "TOR",
          ttsName: "Toronto Raptors"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#679FD6",
          secondaryColor: "#679FD6",
          teamId: "1610616843",
          tricode: "USA",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#f9a11e",
          secondaryColor: "#f9a11e",
          teamId: "1610612762",
          tricode: "UTA",
          ttsName: "Utah Jazz"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#cf142b",
          secondaryColor: "#cf142b",
          teamId: "1610612764",
          tricode: "WAS",
          ttsName: "Washington Wizards"
        },
        %NbaEx.TeamConfig{
          primaryColor: "#F26926",
          secondaryColor: "#F26926",
          teamId: "1610616844",
          tricode: "WLD",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#ffffff",
          secondaryColor: nil,
          teamId: "000000",
          tricode: "LKR",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#ffffff",
          secondaryColor: nil,
          teamId: "000000",
          tricode: "CLP",
          ttsName: nil
        },
        %NbaEx.TeamConfig{
          primaryColor: "#000000",
          secondaryColor: "#000000",
          teamId: "1610616834",
          tricode: "STP",
          ttsName: nil
        }
      ]

    Enum.map(players, fn(player) -> add_color(player, colors) end)
  end

  defp add_color(player, colors) do
    team_color_for_player = Enum.find(colors, fn(color) -> color.teamId == player.teamId end)
    Map.put(player, :teamColor, team_color_for_player.primaryColor)
  end
end
