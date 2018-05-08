defmodule TrackNbaWeb.RoomChannel do
  use TrackNbaWeb, :channel
  alias TrackNba.GameLogServer, as: LogServer
  require Logger

  def join("rooms:" <> player_id, _params, socket) do
    Logger.debug "Following #{inspect player_id}"
    send(self(), {:assign_player_id, player_id})
    {:ok, %{paylod: LogServer.log_for(player_id)}, socket}
  end

  def handle_info({:assign_player_id, player_id}, socket) do
    socket = assign(socket, :player_id, player_id)
    {:noreply, socket}
  end
end
