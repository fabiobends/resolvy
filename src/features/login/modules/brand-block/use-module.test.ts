import { renderHook } from "@testing-library/react-native";

import { useBrandBlockModule } from "./use-module";

describe("useBrandBlockModule", () => {
  it("returns title and subtitle", () => {
    const { result } = renderHook(() => useBrandBlockModule());
    expect(result.current.title).toBe("Resolvy");
    expect(result.current.subtitle).toBe("Resolve what matters");
  });
});
