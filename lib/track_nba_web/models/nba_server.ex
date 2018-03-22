defmodule TrackNbaWeb.NbaServer do
  use GenServer
  alias TrackNbaWeb.Endpoint

  # To start run these two commands
  # {:ok,pid} = GenServer.start_link(HelloServer,1,[])
  # send pid,:work

  def start_link(args) do
    GenServer.start_link(__MODULE__, args, name: __MODULE__)
  end

  def init(initial_value) do   # initiating the state with the value 1 passed
    send(self(), :work)
    {:ok,initial_value}
  end

  def handle_info(:work,state) do
    score = NbaEx.boxscore("20180320", "0021701062")
    val = score.home_team_stats.totals.points
    # IO.puts " Current score: #{val}"
    Endpoint.broadcast!("rooms:lobby", "score_update", %{score: val})
    schedule_work()
    {:noreply,state}
  end

  def handle_info(_msg, state) do
    IO.puts "unknown message"
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 10 * 1000) # In 2 seconds
  end
end
