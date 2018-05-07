defmodule TrackNbaWeb.Page do
  defmacro __using__(_) do
    quote do
      use Hound.Helpers

      def has_content?(content) do
        String.contains?(page_source(), content)
      end

      def has_css?(css) do
        case search_element(:css, css) do
          {:ok, _} -> true
          {:error, _} -> false
        end
      end

      def has_no_css?(css) do
        case search_element(:css, css) do
          {:ok, _} -> false
          {:error, _} -> true
        end
      end

      def has_css?(css, %{text: text}) do
        visible_text({:css, css}) == text
      end

      def has_text?(element, %{text: text}) do
        String.contains?(inner_html(element), text)
      end
    end
  end
end
