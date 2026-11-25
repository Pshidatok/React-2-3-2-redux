import { MantineProvider } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStore } from "../store/store";
import Home from "./Home";

const catalogue = [
  {
    id: 1,
    name: "Brocolli - 1 Kg",
    price: 120,
    image: "https://example.com/broccoli.jpg",
    category: "vegetables" as const,
  },
  {
    id: 2,
    name: "Cauliflower - 1 Kg",
    price: 60,
    image: "https://example.com/cauliflower.jpg",
    category: "vegetables" as const,
  },
];

function renderHome() {
  return render(
    <Provider store={createStore()}>
      <MantineProvider>
        <Home />
      </MantineProvider>
    </Provider>
  );
}

describe("Vegetable catalog", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("shows a loader while the product catalogue is loading", async () => {
    let resolveRequest: (value: Response) => void = () => undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise<Response>(resolve => {
            resolveRequest = resolve;
          })
      )
    );
    renderHome();
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
    resolveRequest(new Response(JSON.stringify(catalogue), { status: 200 }));
    await waitFor(() =>
      expect(screen.getByText("Brocolli")).toBeInTheDocument()
    );
  });

  it("changes the quantity and adds that quantity to the cart", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify(catalogue), { status: 200 })
        )
    );
    const user = userEvent.setup();
    renderHome();
    await screen.findByText("Brocolli");
    await user.click(
      screen.getAllByRole("button", { name: "Increase quantity" })[0]
    );
    expect(screen.getAllByRole("spinbutton")[0]).toHaveValue(2);
    await user.click(screen.getAllByRole("button", { name: "Add to cart" })[0]);
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Open shopping cart" })
      ).toHaveTextContent("2")
    );
  });

  it("opens the cart popup with the selected product", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(JSON.stringify(catalogue), { status: 200 })
        )
    );
    const user = userEvent.setup();
    renderHome();
    await screen.findByText("Brocolli");
    await user.click(screen.getAllByRole("button", { name: "Add to cart" })[0]);
    await user.click(
      screen.getByRole("button", { name: "Open shopping cart" })
    );
    expect(
      screen.getByRole("button", { name: "Open shopping cart" })
    ).toHaveAttribute("aria-expanded", "true");
  });
});
