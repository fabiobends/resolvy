import { render, screen } from "@testing-library/react-native";

import { BrandBlock } from "./index";

describe("BrandBlock", () => {
  it("renders title and subtitle", () => {
    render(<BrandBlock title="Resolvy" subtitle="Resolve what matters" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.getByText("Resolve what matters")).toBeTruthy();
  });

  it("renders without subtitle", () => {
    render(<BrandBlock title="Resolvy" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.queryByText("Resolve what matters")).toBeNull();
  });
});
