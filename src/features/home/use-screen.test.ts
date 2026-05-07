import { renderHook } from "@testing-library/react-native";

import { ThemeProvider } from "@/hooks/use-theme/provider";

import { useHomeScreen } from "./use-screen";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

describe("useHomeScreen", () => {
  it("composes welcome and theme switcher props", () => {
    const { result } = renderHook(() => useHomeScreen(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.welcomeProps).toBeDefined();
    expect(result.current.welcomeProps.title).toBe("Welcome");
    expect(result.current.welcomeProps.subtitle).toBe("Resolvy");
    expect(result.current.themeSwitcherProps).toBeDefined();
    expect(typeof result.current.themeSwitcherProps.onToggle).toBe("function");
  });
});
