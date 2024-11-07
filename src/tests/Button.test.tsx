import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../components/Button";

test("renders button with text content", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
});

test("calls handleClick function when clicked", () => {
  const handleClick = jest.fn();
  render(<Button handleClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
