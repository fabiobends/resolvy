import { renderHook } from "@testing-library/react-native";

import { useSocialModule } from "./use-module";

describe("useSocialModule", () => {
  it("returns press handlers", () => {
    const { result } = renderHook(() => useSocialModule());
    expect(typeof result.current.onGooglePress).toBe("function");
    expect(typeof result.current.onApplePress).toBe("function");
  });
});
