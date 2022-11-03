import { screen, render } from "@testing-library/react";
import { COLORS } from "..";

import Alert from "../Alert";

test("should render alert component", async () => {
  render(<Alert text="Alert component" state="success" />);

  const alert = screen.getByRole("alert");

  expect(alert).toBeInTheDocument();
});

test("should render correctly text", async () => {
  render(<Alert text="Alert component" state="success" />);

  const alert = screen.getByText("Alert component");

  expect(alert).toBeInTheDocument();
});

test("should render success alert", async () => {
  render(<Alert text="Alert component" state="success" />);

  const alert = screen.getByRole("alert");
  const checkIcon = screen.getByTestId("check-circle");
  const errorIcon = screen.queryByTestId("error-circle");

  expect(alert).toHaveStyle(`background: ${COLORS.GREEN_300}`);
  expect(checkIcon).toBeInTheDocument();
  expect(errorIcon).toBeNull();
});

test("should render danger alert", async () => {
  render(<Alert text="Alert component" state="danger" />);

  const alert = screen.getByRole("alert");
  const errorIcon = screen.getByTestId("error-circle");
  const checkIcon = screen.queryByTestId("check-circle");

  expect(alert).toHaveStyle(`background: ${COLORS.RED_300}`);
  expect(errorIcon).toBeInTheDocument();
  expect(checkIcon).toBeNull();
});
