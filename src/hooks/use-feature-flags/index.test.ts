import { createElement, ReactNode } from "react";
import { renderHook } from "@testing-library/react-native";

import { FeatureFlagsContext } from "./context";
import { useFeatureFlags } from "./index";

function wrapper() {
  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(
      FeatureFlagsContext.Provider,
      {
        value: { flags: { storybook: true }, setFlag: () => {} },
      },
      children,
    );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
}

describe("useFeatureFlags", () => {
  it("returns flags and setter from context", () => {
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: wrapper(),
    });

    expect(result.current.flags).toEqual({ storybook: true });
    expect(typeof result.current.setFlag).toBe("function");
  });
});
