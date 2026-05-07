import { render } from "@testing-library/react-native";

import { ThemedButton } from "./index";

describe("ThemedButton", () => {
  it("renders with title", () => {
    const { getByText } = render(
      <ThemedButton title="Submit" color="primary" />,
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("is disabled when loading", () => {
    const { getByRole } = render(
      <ThemedButton title="Submit" color="primary" loading />,
    );
    expect(getByRole("button").props.accessibilityState.disabled).toBe(true);
  });

  it("is disabled when disabled prop is true", () => {
    const { getByRole } = render(
      <ThemedButton title="Submit" color="primary" disabled />,
    );
    expect(getByRole("button").props.accessibilityState.disabled).toBe(true);
  });
});
