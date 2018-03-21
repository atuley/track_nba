defmodule TrackNbaWeb.RoomChannel do
  use TrackNbaWeb, :channel
  require Logger

  def join("rooms:lobby", params, socket) do
    Logger.debug("Joined channel...")
    {:ok, %{}, socket}
  end
end
