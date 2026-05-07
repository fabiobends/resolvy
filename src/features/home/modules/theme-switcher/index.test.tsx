import { fireEvent, render, screen } from "@testing-library/react-native";

import { ThemeContext, ThemeContextValue } from "@/hooks/use-theme/context";

import { ThemeSwitcher } from ".";

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

describe("ThemeSwitcher", () => {
  it("renders light theme label", () => {
    render(<ThemeSwitcher activeTheme="light" onToggle={jest.fn()} />, {
      wrapper: wrapper("light"),
    });

    expect(screen.getByText("Theme: light")).toBeTruthy();
  });

  it("renders dark theme label", () => {
    render(<ThemeSwitcher activeTheme="dark" onToggle={jest.fn()} />, {
      wrapper: wrapper("dark"),
    });

    expect(screen.getByText("Theme: dark")).toBeTruthy();
  });

  it("calls onToggle when pressed", () => {
    const onToggle = jest.fn();
    render(<ThemeSwitcher activeTheme="light" onToggle={onToggle} />, {
      wrapper: wrapper("light"),
    });

    fireEvent.press(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
