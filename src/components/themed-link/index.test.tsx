import { fireEvent, render } from "@testing-library/react-native";

import { ThemedLink } from "./index";

describe("ThemedLink", () => {
  it("renders with given title", () => {
    const { getByText } = render(
      <ThemedLink title="Open Storybook" color="primary" />,
    );

    expect(getByText("Open Storybook")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ThemedLink title="Open Storybook" color="primary" onPress={onPress} />,
    );

    fireEvent.press(getByText("Open Storybook"));
    expect(onPress).toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ThemedLink
        title="Open Storybook"
        color="primary"
        disabled
        onPress={onPress}
      />,
    );

    fireEvent.press(getByText("Open Storybook"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
