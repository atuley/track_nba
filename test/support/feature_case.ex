defmodule TrackNbaWeb.FeatureCase do
  use ExUnit.CaseTemplate

  using do
    quote do
      use Hound.Helpers
      @moduletag :feature
      alias TrackNbaWeb.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query
      # import TrackNbaWeb.Factories
      import TrackNbaWeb.Router.Helpers
      import TrackNbaWeb.AsyncHelpers

      # The default endpoint for testing
      @endpoint TrackNbaWeb.Endpoint
    end
  end

  setup tags do
    # :ok = Ecto.Adapters.SQL.Sandbox.checkout(TrackNbaWeb.Repo)
    metadata = Phoenix.Ecto.SQL.Sandbox.metadata_for(TrackNbaWeb.Repo, self())
    Hound.start_session(metadata: metadata)
    # unless tags[:async] do
    #   Ecto.Adapters.SQL.Sandbox.mode(TrackNbaWeb.Repo, {:shared, self()})
    # end
    :ok
  end
end
