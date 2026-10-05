import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button appName="Customer">Shop Now</Button>);

    expect(
      screen.getByRole("button", { name: "Shop Now" })
    ).toBeInTheDocument();
  });

  it("shows an alert when clicked", async () => {
    const user = userEvent.setup();

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(<Button appName="Customer">Shop Now</Button>);

    await user.click(
      screen.getByRole("button", { name: "Shop Now" })
    );

    expect(alertMock).toHaveBeenCalledWith(
      "Hello from your Customer app!"
    );

    alertMock.mockRestore();
  });
});