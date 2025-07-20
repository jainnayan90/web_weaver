defmodule WebWeaverWeb.InitAssigns do
  @moduledoc """
  Ensures common `assigns` are applied to all LiveViews attaching this hook.
  """
  # import Phoenix.LiveView
  use WebWeaverWeb, :live_view

  def on_mount(:default, _params, _session, socket) do
    {:cont, socket, layout: {WebWeaverWeb.Layouts, :app}}
  end
end
