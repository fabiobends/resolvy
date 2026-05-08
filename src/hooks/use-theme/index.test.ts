import { createElement, ReactNode } from "react";
import { renderHook } from "@testing-library/react-native";

import { Colors } from "@/constants/theme";

import { ThemeContext, ThemeContextValue } from "./context";
import { useTheme } from "./index";

function wrapper(theme: ThemeContextValue["activeTheme"]) {
  const value: ThemeContextValue = {
    theme: theme === "dark" ? "dark" : "light",
    setTheme: () => {},
    activeTheme: theme,
  };

  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(ThemeContext.Provider, { value }, children);
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
}

describe("useTheme", () => {
  it("returns dark palette when active theme is dark", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper("dark"),
    });
    expect(result.current).toEqual(Colors.dark);
  });

  it("returns light palette when active theme is light", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: wrapper("light"),
    });
    expect(result.current).toEqual(Colors.light);
  });
});
