import { createElement, useContext } from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { FeatureFlagsContext } from "./context";

function Consumer() {
  const { flags, setFlag } = useContext(FeatureFlagsContext);
  return createElement(
    Text,
    { testID: "consumer" },
    JSON.stringify({ flags, setFlag: typeof setFlag }),
  );
}

describe("FeatureFlagsContext", () => {
  it("provides empty flags and no-op setter by default", () => {
    const { getByTestId } = render(createElement(Consumer));

    expect(JSON.parse(getByTestId("consumer").props.children)).toEqual({
      flags: {},
      setFlag: "function",
    });
  });
});
