import { render, screen } from "@testing-library/react-native";

import { Welcome } from ".";

describe("Welcome", () => {
  it("renders title and subtitle", () => {
    render(<Welcome title="Hello" subtitle="World" />);

    expect(screen.getByText("Hello")).toBeTruthy();
    expect(screen.getByText("World")).toBeTruthy();
  });
});
