import { render } from "@testing-library/react-native";
import React from "react";
import { ThemedText } from "../themed-text";

describe("ThemedText", () => {
  it("renders with correct text", () => {
    const { getByText } = render(
      <ThemedText type="body" themeColor="primary">
        Hello world
      </ThemedText>,
    );
    expect(getByText("Hello world")).toBeTruthy();
  });
});
