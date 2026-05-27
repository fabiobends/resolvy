import { render, screen } from "@testing-library/react-native";

import { Logo } from "./index";

describe("Logo", () => {
  it("renders with title and subtitle", () => {
    render(<Logo title="Resolvy" subtitle="Resolve what matters" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.getByText("Resolve what matters")).toBeTruthy();
  });

  it("renders without title", () => {
    render(<Logo />);
    expect(screen.queryByText("Resolvy")).toBeNull();
  });

  it("renders without subtitle", () => {
    render(<Logo title="Resolvy" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.queryByText("Resolve what matters")).toBeNull();
  });

  it("renders with small size", () => {
    const { getByTestId } = render(
      <Logo size="small" title="Resolvy" testID="logo" />,
    );
    expect(getByTestId("logo")).toBeTruthy();
  });
});
