# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :track_nba,
  ecto_repos: [TrackNba.Repo]

# Configures the endpoint
config :track_nba, TrackNbaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: System.get_env("TRACK_NBA_KEY"),
  render_errors: [view: TrackNbaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TrackNba.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
