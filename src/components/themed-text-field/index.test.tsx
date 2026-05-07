import { render } from "@testing-library/react-native";

import { ThemedTextField } from "./index";

describe("ThemedTextField", () => {
  it("renders with label", () => {
    const { getByText } = render(
      <ThemedTextField label="Email" color="primary" />,
    );
    expect(getByText("Email")).toBeTruthy();
  });

  it("is editable by default", () => {
    const { getByPlaceholderText } = render(
      <ThemedTextField
        label="Email"
        color="primary"
        placeholder="Enter email"
      />,
    );
    expect(getByPlaceholderText("Enter email").props.editable).toBe(true);
  });

  it("is not editable when disabled", () => {
    const { getByPlaceholderText } = render(
      <ThemedTextField
        label="Email"
        color="primary"
        placeholder="Enter email"
        disabled
      />,
    );
    expect(getByPlaceholderText("Enter email").props.editable).toBe(false);
  });
});
