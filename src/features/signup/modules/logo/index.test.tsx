import { render, screen } from "@testing-library/react-native";

import { LogoModule } from "./index";

describe("LogoModule", () => {
  it("renders title when no subtitle provided", () => {
    render(<LogoModule title="Resolvy" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
  });

  it("renders title and subtitle", () => {
    render(<LogoModule title="Resolvy" subtitle="Create your account" />);
    expect(screen.getByText("Resolvy")).toBeTruthy();
    expect(screen.getByText("Create your account")).toBeTruthy();
  });

  it("does not render subtitle when omitted", () => {
    const { queryByText } = render(<LogoModule title="Resolvy" />);
    expect(queryByText("Create your account")).toBeNull();
  });
});
