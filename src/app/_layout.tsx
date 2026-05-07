import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import { ThemeProvider } from "@/hooks/use-theme/provider";
import { useThemeContext } from "@/hooks/use-theme/context";

function NavigationTheme() {
  const { activeTheme } = useThemeContext();

  return (
    <NavigationThemeProvider
      value={activeTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

/**
 * Provides root navigation stack for app.
 * @returns React element.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <NavigationTheme />
    </ThemeProvider>
  );
}
