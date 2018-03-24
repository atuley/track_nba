defmodule TrackNbaWeb.RoomChannel do
  use TrackNbaWeb, :channel
  require Logger

  def join("rooms:lobby", _params, socket) do
    Logger.debug("Joined channel...")
    # Start up genserver here
    {:ok, %{}, socket}
  end
end
