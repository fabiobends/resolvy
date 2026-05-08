import { createElement, ReactNode } from "react";
import { renderHook } from "@testing-library/react-native";

import { ThemeContext, ThemeContextValue } from "@/hooks/use-theme/context";

import { useThemeSwitcherModule } from "./use-module";

function wrapper(activeTheme: "light" | "dark") {
  const value: ThemeContextValue = {
    theme: activeTheme,
    setTheme: jest.fn(),
    activeTheme,
  };

  const Wrapper = ({ children }: { children: ReactNode }) =>
    createElement(ThemeContext.Provider, { value }, children);
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
}

describe("useThemeSwitcherModule", () => {
  it("returns active theme and toggle handler", () => {
    const { result } = renderHook(() => useThemeSwitcherModule(), {
      wrapper: wrapper("light"),
    });

    expect(result.current.activeTheme).toBe("light");
    expect(typeof result.current.onToggle).toBe("function");
  });

  it("toggles from dark to light", () => {
    const setTheme = jest.fn();
    const value: ThemeContextValue = {
      theme: "dark",
      setTheme,
      activeTheme: "dark",
    };

    const CustomWrapper = ({ children }: { children: ReactNode }) =>
      createElement(ThemeContext.Provider, { value }, children);

    const { result } = renderHook(() => useThemeSwitcherModule(), {
      wrapper: CustomWrapper,
    });

    result.current.onToggle();
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
