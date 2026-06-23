import { fireEvent, render, screen } from "@testing-library/react-native";

import { SocialModule } from "./index";

describe("SocialModule", () => {
  it("renders divider text and both buttons when Apple is available", () => {
    render(
      <SocialModule
        onGooglePress={jest.fn()}
        onApplePress={jest.fn()}
        isAppleAvailable
      />,
    );
    expect(screen.getByText("or continue with")).toBeTruthy();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("hides the Apple button when unavailable", () => {
    render(
      <SocialModule
        onGooglePress={jest.fn()}
        onApplePress={jest.fn()}
        isAppleAvailable={false}
      />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("calls handlers on press", () => {
    const onGoogle = jest.fn();
    const onApple = jest.fn();
    render(
      <SocialModule
        onGooglePress={onGoogle}
        onApplePress={onApple}
        isAppleAvailable
      />,
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.press(buttons[0]);
    expect(onGoogle).toHaveBeenCalledTimes(1);
    fireEvent.press(buttons[1]);
    expect(onApple).toHaveBeenCalledTimes(1);
  });
});
