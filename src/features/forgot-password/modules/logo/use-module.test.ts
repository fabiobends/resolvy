import { renderHook } from "@testing-library/react-native";

import { useLogoModule } from "./use-module";

describe("useLogoModule", () => {
  it("returns branding text with subtitle", () => {
    const { result } = renderHook(() => useLogoModule());
    expect(result.current.title).toBe("Resolvy");
  });
});
