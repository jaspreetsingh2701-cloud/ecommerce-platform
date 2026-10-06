import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Shop Now</Button>);

    expect(
      screen.getByRole("button", { name: "Shop Now" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Shop Now</Button>);

    await user.click(
      screen.getByRole("button", { name: "Shop Now" })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});