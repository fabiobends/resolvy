import { render, screen } from "@testing-library/react-native";

import { KeyboardToolbarView } from "./index";

describe("KeyboardToolbarView", () => {
  it("renders", () => {
    render(<KeyboardToolbarView onDonePress={jest.fn()} />);
    expect(screen.getByRole("toolbar")).toBeTruthy();
  });
});
