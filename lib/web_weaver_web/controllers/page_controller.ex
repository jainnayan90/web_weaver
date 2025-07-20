defmodule WebWeaverWeb.PageController do
  use WebWeaverWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
