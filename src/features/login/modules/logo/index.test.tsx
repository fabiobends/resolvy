import { render, screen } from "@testing-library/react-native";

import { LogoModule } from "./index";

describe("LogoModule", () => {
  it("renders title and subtitle", () => {
    render(<LogoModule title="Resolvy" subtitle="Hello" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.getByText("Hello")).toBeTruthy();
  });
});
