import { useContext } from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

import { ThemeProvider } from "./provider";
import { ThemeContext } from "./context";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
}));

function Consumer() {
  const { theme, activeTheme, setTheme } = useContext(ThemeContext);
  return (
    <Text testID="consumer">
      {JSON.stringify({ theme, activeTheme, setTheme: typeof setTheme })}
    </Text>
  );
}

describe("ThemeProvider", () => {
  it("provides system theme and setter by default", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );

    expect(JSON.parse(getByTestId("consumer").props.children)).toEqual({
      theme: "system",
      activeTheme: "light",
      setTheme: "function",
    });
  });
});
