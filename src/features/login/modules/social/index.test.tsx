import { fireEvent, render, screen } from "@testing-library/react-native";

import { SocialModule } from "./index";

describe("SocialModule", () => {
  it("renders divider text and buttons", () => {
    render(<SocialModule onGooglePress={jest.fn()} onApplePress={jest.fn()} />);
    expect(screen.getByText("or continue with")).toBeTruthy();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("calls handlers on press", () => {
    const onGoogle = jest.fn();
    const onApple = jest.fn();
    render(<SocialModule onGooglePress={onGoogle} onApplePress={onApple} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.press(buttons[0]);
    expect(onGoogle).toHaveBeenCalledTimes(1);
    fireEvent.press(buttons[1]);
    expect(onApple).toHaveBeenCalledTimes(1);
  });
});
