defmodule WebWeaver.Repo do
  use Ecto.Repo,
    otp_app: :web_weaver,
    adapter: Ecto.Adapters.Postgres
end
