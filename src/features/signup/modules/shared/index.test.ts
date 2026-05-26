import { renderHook } from "@testing-library/react-native";

import { useShared } from ".";

describe("useShared", () => {
  it("provides form with default values", () => {
    const { result } = renderHook(() => useShared());

    expect(result.current.form).toBeDefined();
    expect(result.current.form.control).toBeDefined();
    expect(result.current.form.getValues()).toEqual({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  });
});
