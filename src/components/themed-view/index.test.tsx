import { render } from "@testing-library/react-native";

import { ThemedView } from "./index";

describe("ThemedView", () => {
  it("renders children correctly", () => {
    const { getByTestId } = render(
      <ThemedView themeColor="surface" testID="themed-view">
        <></>
      </ThemedView>,
    );
    expect(getByTestId("themed-view")).toBeTruthy();
  });
});
