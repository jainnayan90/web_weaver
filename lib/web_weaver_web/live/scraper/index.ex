defmodule WebWeaverWeb.Scraper.Index do
  use WebWeaverWeb, :live_view

  # alias WebWeaver.Scraper

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:scraped_data, [])
      |> assign(:page_title, "Web Scraper")

    {:ok, socket}
  end

  # def handle_event("scrape", %{"url" => url}, socket) do
  #   case Scraper.scrape(url) do
  #     {:ok, data} ->
  #       {:noreply, assign(socket, :scraped_data, data)}

  #     {:error, reason} ->
  #       {:noreply, put_flash(socket, :error, reason)}
  #   end
  # end
end
