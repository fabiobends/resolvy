import { renderHook } from "@testing-library/react-native";

import { useWelcomeModule } from "./use-module";

describe("useWelcomeModule", () => {
  it("returns title and subtitle", () => {
    const { result } = renderHook(() => useWelcomeModule());

    expect(result.current.title).toBe("Welcome");
    expect(result.current.subtitle).toBe("Resolvy");
  });
});
