import { renderHook } from "@testing-library/react-native";

import { useBrandBlockModule } from "./use-module";

describe("useBrandBlockModule", () => {
  it("returns title", () => {
    const { result } = renderHook(() => useBrandBlockModule());
    expect(result.current.title).toBe("Resolvy");
    expect(result.current.subtitle).toBeUndefined();
  });
});
