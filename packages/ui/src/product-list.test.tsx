import { render, screen } from "@testing-library/react";
import { ProductList } from "./product-list";

describe("ProductList", () => {
  it("displays products returned by the API", async () => {
    render(<ProductList />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();

    expect(await screen.findByText(/iPhone - ₹79999/)).toBeInTheDocument();
    expect(
      await screen.findByText(/MacBook - ₹129999/)
    ).toBeInTheDocument();
  });
});