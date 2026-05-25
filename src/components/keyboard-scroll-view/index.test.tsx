import { render, screen } from "@testing-library/react-native";

import { Text } from "react-native";

import { KeyboardScrollView } from "./index";

describe("KeyboardScrollView", () => {
  it("renders children", () => {
    render(
      <KeyboardScrollView testID="scroll">
        <Text testID="child">Hello</Text>
      </KeyboardScrollView>,
    );
    expect(screen.getByTestId("child")).toBeTruthy();
  });
});
