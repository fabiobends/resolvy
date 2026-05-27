import { render, screen } from "@testing-library/react-native";

import { BrandBlock } from "./index";

describe("BrandBlock", () => {
  it("renders title", () => {
    render(<BrandBlock title="Resolvy" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
  });
});
