defmodule WebWeaver.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WebWeaverWeb.Telemetry,
      WebWeaver.Repo,
      {DNSCluster, query: Application.get_env(:web_weaver, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: WebWeaver.PubSub},
      # Start a worker by calling: WebWeaver.Worker.start_link(arg)
      # {WebWeaver.Worker, arg},
      # Start to serve requests, typically the last entry
      WebWeaverWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: WebWeaver.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    WebWeaverWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
