defmodule TrackNba.GameLogServer do
  use GenServer
  alias TrackNbaWeb.Endpoint

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
    state = Map.put(state, player_id, NbaEx.player_game_log(player_id) |> List.first)
    Endpoint.broadcast("rooms:" <> player_id, "player_stat_update", %{"log" => state})
    {:reply, state[player_id], state}
  end

  def handle_call({:update_log, player_id, updated_log}, _from, state) do
    Endpoint.broadcast("rooms:" <> player_id, "player_stat_update", %{"log" => updated_log})
    {:reply, state[player_id], Map.put(state, player_id, updated_log)}
  end

  def handle_call(:state, _from, state), do: {:reply, state, state}

  def handle_info(:work, state) do
    tasks = for id <- Map.keys(state) do
      Task.start_link(fn ->
        updated_log = NbaEx.player_game_log(id) |> List.first
        update_log(id, updated_log)
      end)
    end
    schedule_work()
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 5 * 1000) # In 5 seconds
  end
end
