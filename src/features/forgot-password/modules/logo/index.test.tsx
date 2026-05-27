import { render, screen } from "@testing-library/react-native";

import { LogoModule } from "./index";

describe("LogoModule", () => {
  it("renders title and subtitle", () => {
    render(<LogoModule title="Resolvy" subtitle="Reset your password" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.getByText("Reset your password")).toBeTruthy();
  });

  it("renders title only when no subtitle", () => {
    const { queryByText } = render(<LogoModule title="Resolvy" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(queryByText("Reset your password")).toBeNull();
  });
});
