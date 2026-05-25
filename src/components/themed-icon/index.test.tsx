import { render, screen, waitFor } from "@testing-library/react-native";

import { ThemeContext, ThemeContextValue } from "@/hooks/use-theme/context";

import { ThemedIcon } from "./index";

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

describe("ThemedIcon", () => {
  it("renders with given name", async () => {
    render(
      <ThemedIcon
        name="sunny-outline"
        themeColor="primary"
        size="medium"
        testID="icon"
      />,
      {
        wrapper: wrapper("light"),
      },
    );

    await waitFor(() => {
      expect(screen.getByTestId("icon")).toBeTruthy();
    });
  });
});
