import { renderHook } from "@testing-library/react-native";

import { useHomeScreen } from "./use-screen";

describe("useHomeScreen", () => {
  it("composes welcome props", () => {
    const { result } = renderHook(() => useHomeScreen());

    expect(result.current.welcomeProps).toBeDefined();
    expect(result.current.welcomeProps.title).toBe("Welcome");
    expect(result.current.welcomeProps.subtitle).toBe("Resolvy");
  });
});
