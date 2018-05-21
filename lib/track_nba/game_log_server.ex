defmodule TrackNba.GameLogServer do
  use GenServer
  alias TrackNbaWeb.{Endpoint, Utils}

  def start_link do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_) do
    send(self(), :work)
    {:ok, %{}}
  end

  #### CLIENT FUNCTIONS ####
  def log_for(player_id) when is_binary(player_id) do
    GenServer.call(__MODULE__, {:log_for, player_id})
  end

  def update_log(player_id, updated_log) do
    GenServer.call(__MODULE__, {:update_log, player_id, updated_log})
  end

  def server_state do
    GenServer.call(__MODULE__, :state)
  end

  #### CALLBACKS ####
  def handle_call({:log_for, player_id}, _from, state) do
    stats = player_id
    |> Utils.find_team()
    |> Utils.find_game(Utils.current_date())
    |> Utils.retrieve_stats_for_player(player_id, Utils.current_date())

    player = NbaEx.players()
    |> Enum.find(fn(player) -> player.personId == player_id end)
    |> Utils.add_color()

    new_player = case stats do
      {:error, "Game for player not found"} -> Map.put_new(player, :stats, %NbaEx.PlayerStat{})
      _ -> Map.put_new(player, :stats, stats)
    end

    new_stat = case new_player.stats.teamId do
      nil -> Map.put_new(new_player.stats, :gameActive, false)
      _ -> Map.put_new(new_player.stats, :gameActive, true)
    end

    new_new = Map.put(new_player, :stats, new_stat)

    state = Map.put(state, player_id, new_new)
    Endpoint.broadcast("rooms:" <> player_id, "player_stat_update", %{"player" => state})
    {:reply, state[player_id], state}
  end

  def handle_call({:update_log, player_id, updated_log}, _from, state) do
    Endpoint.broadcast("rooms:" <> player_id, "player_stat_update", %{"player" => updated_log})
    {:reply, state[player_id], Map.put(state, player_id, updated_log)}
  end

  def handle_call(:state, _from, state), do: {:reply, state, state}

  def handle_info(:work, state) do
    for id <- Map.keys(state) do
      Task.start_link(fn ->
        stats = id
        |> Utils.find_team()
        |> Utils.find_game(Utils.current_date())
        |> Utils.retrieve_stats_for_player(id, Utils.current_date())

        player = NbaEx.players()
        |> Enum.find(fn(player) -> player.personId == id end)
        |> Utils.add_color()

        new_player = case stats do
          {:error, "Game for player not found"} -> Map.put_new(player, :stats, %NbaEx.PlayerStat{})
          _ -> Map.put_new(player, :stats, stats)
        end

        new_stat = case new_player.stats.teamId do
          nil -> Map.put_new(new_player.stats, :gameActive, false)
          _ -> Map.put_new(new_player.stats, :gameActive, true)
        end

        new_new = Map.put(new_player, :stats, new_stat)

        update_log(id, new_new)
      end)
    end
    schedule_work()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 5 * 1000) # In 5 seconds
  end
end
