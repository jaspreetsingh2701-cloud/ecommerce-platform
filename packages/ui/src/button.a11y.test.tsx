import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./button";

expect.extend(toHaveNoViolations);

describe("Button accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Button appName="Customer">
        Add to Cart
      </Button>
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});