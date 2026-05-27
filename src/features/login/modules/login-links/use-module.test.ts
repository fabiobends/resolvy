import { renderHook } from "@testing-library/react-native";

import { useLoginLinksModule } from "./use-module";

describe("useLoginLinksModule", () => {
  it("returns link press handlers", () => {
    const { result } = renderHook(() => useLoginLinksModule());

    expect(typeof result.current.onForgotPasswordPress).toBe("function");
    expect(typeof result.current.onCreateAccountPress).toBe("function");
  });
});
