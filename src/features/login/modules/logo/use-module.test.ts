import { renderHook } from "@testing-library/react-native";

import { useLogoModule } from "./use-module";

describe("useLogoModule", () => {
  it("returns branding text", () => {
    const { result } = renderHook(() => useLogoModule());
    expect(result.current.title).toBe("Resolvy");
    expect(result.current.subtitle).toBe("Resolve what matters");
  });
});
