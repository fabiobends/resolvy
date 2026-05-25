import { fireEvent, render, screen } from "@testing-library/react-native";

import { SocialModule } from "./index";

describe("SocialModule", () => {
  it("renders divider text and buttons", () => {
    render(<SocialModule onGooglePress={jest.fn()} onApplePress={jest.fn()} />);
    expect(screen.getByText("or continue with")).toBeTruthy();
    expect(screen.getByText("Google")).toBeTruthy();
    expect(screen.getByText("Apple")).toBeTruthy();
  });

  it("calls handlers on press", () => {
    const onGoogle = jest.fn();
    const onApple = jest.fn();
    render(<SocialModule onGooglePress={onGoogle} onApplePress={onApple} />);
    fireEvent.press(screen.getByText("Google"));
    expect(onGoogle).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByText("Apple"));
    expect(onApple).toHaveBeenCalledTimes(1);
  });
});
