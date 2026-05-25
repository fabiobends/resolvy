import { render } from "@testing-library/react-native";

import { ThemedTextField } from "./index";

describe("ThemedTextField", () => {
  it("renders with label", () => {
    const { getByText } = render(
      <ThemedTextField label="Email" variantColor="primary" />,
    );
    expect(getByText("Email")).toBeTruthy();
  });

  it("is editable by default", () => {
    const { getByPlaceholderText } = render(
      <ThemedTextField
        label="Email"
        variantColor="primary"
        placeholder="Enter email"
      />,
    );
    expect(getByPlaceholderText("Enter email").props.editable).toBe(true);
  });

  it("is not editable when disabled", () => {
    const { getByPlaceholderText } = render(
      <ThemedTextField
        label="Email"
        variantColor="primary"
        placeholder="Enter email"
        disabled
      />,
    );
    expect(getByPlaceholderText("Enter email").props.editable).toBe(false);
  });

  it("renders helper text when provided and no error", () => {
    const { getByText } = render(
      <ThemedTextField
        label="Email"
        variantColor="primary"
        helperText="Must be a valid email"
      />,
    );
    expect(getByText("Must be a valid email")).toBeTruthy();
  });

  it("renders error text when provided", () => {
    const { getByText } = render(
      <ThemedTextField
        label="Email"
        variantColor="primary"
        errorText="Invalid email"
      />,
    );
    expect(getByText("Invalid email")).toBeTruthy();
  });

  it("does not render helper text when error is also provided", () => {
    const { getByText, queryByText } = render(
      <ThemedTextField
        label="Email"
        variantColor="primary"
        helperText="Must be a valid email"
        errorText="Invalid email"
      />,
    );
    expect(getByText("Invalid email")).toBeTruthy();
    expect(queryByText("Must be a valid email")).toBeNull();
  });
});
