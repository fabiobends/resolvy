import { fireEvent, render, screen } from "@testing-library/react-native";

import { ThemeContext, ThemeContextValue } from "@/hooks/use-theme/context";

import { ThemedIconButton } from "./index";

function wrapper(activeTheme: "light" | "dark") {
  const value: ThemeContextValue = {
    theme: activeTheme,
    setTheme: () => {},
    activeTheme,
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
  Wrapper.displayName = "TestWrapper";
  return Wrapper;
}

describe("ThemedIconButton", () => {
  it("renders with given icon name", () => {
    render(
      <ThemedIconButton
        name="sunny-outline"
        foregroundThemeColor="primary"
        testID="btn"
      />,
      { wrapper: wrapper("light") },
    );
    expect(screen.getByTestId("btn")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(
      <ThemedIconButton
        name="close"
        foregroundThemeColor="secondary"
        onPress={onPress}
        testID="btn"
      />,
      { wrapper: wrapper("light") },
    );
    fireEvent.press(screen.getByTestId("btn"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when loading", () => {
    const onPress = jest.fn();
    render(
      <ThemedIconButton
        name="close"
        foregroundThemeColor="secondary"
        onPress={onPress}
        loading
        testID="btn"
      />,
      { wrapper: wrapper("light") },
    );
    fireEvent.press(screen.getByTestId("btn"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(
      <ThemedIconButton
        name="close"
        foregroundThemeColor="secondary"
        onPress={onPress}
        disabled
        testID="btn"
      />,
      { wrapper: wrapper("light") },
    );
    fireEvent.press(screen.getByTestId("btn"));
    expect(onPress).not.toHaveBeenCalled();
  });
});
