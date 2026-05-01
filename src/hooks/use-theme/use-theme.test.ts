import { renderHook } from "@testing-library/react-native";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

import { useTheme } from "./index";

describe("useTheme", () => {
  it("returns dark palette when scheme is dark", () => {
    jest.mocked(useColorScheme).mockReturnValue("dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.dark);
  });

  it("returns light palette when scheme is light", () => {
    jest.mocked(useColorScheme).mockReturnValue("light");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.light);
  });

  it("returns dark palette when scheme is unspecified", () => {
    jest.mocked(useColorScheme).mockReturnValue("unspecified");
    const { result } = renderHook(() => useTheme());
    expect(result.current).toEqual(Colors.dark);
  });
});
