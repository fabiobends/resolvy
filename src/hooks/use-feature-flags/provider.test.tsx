import { useContext } from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { FeatureFlagsProvider } from "./provider";
import { FeatureFlagsContext } from "./context";

function Consumer() {
  const { flags } = useContext(FeatureFlagsContext);
  return <Text testID="consumer">{JSON.stringify(flags)}</Text>;
}

describe("FeatureFlagsProvider", () => {
  it("provides default feature flags", () => {
    const { getByTestId } = render(
      <FeatureFlagsProvider>
        <Consumer />
      </FeatureFlagsProvider>,
    );

    expect(JSON.parse(getByTestId("consumer").props.children)).toEqual({
      storybook: true,
    });
  });
});
