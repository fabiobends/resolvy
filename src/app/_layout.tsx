import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { DevFloatingButton } from "@/components/dev-floating-button";
import { Drawer } from "@/components/drawer";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { AuthProvider } from "@/hooks/use-auth/provider";
import { useFeatureFlags } from "@/hooks/use-feature-flags";
import { FeatureFlagsProvider } from "@/hooks/use-feature-flags/provider";
import { useThemeContext } from "@/hooks/use-theme/context";
import { ThemeProvider } from "@/hooks/use-theme/provider";

/**
 * True when running in Expo Go, a development build, or local bare build.
 * Standalone production builds are excluded.
 */
const isDevBuild =
  Constants.executionEnvironment !== ExecutionEnvironment.Standalone;

const queryClient = new QueryClient();

function NavigationTheme() {
  const { activeTheme } = useThemeContext();

  return (
    <NavigationThemeProvider
      value={activeTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/forgot-password"
          options={{ headerShown: false }}
        />
      </Stack>
    </NavigationThemeProvider>
  );
}

interface DevMenuContentProps {
  onNavigateToStorybook: () => void;
}

/**
 * Renders the dev menu content inside the drawer.
 * @param props - Component props.
 * @returns React element.
 */
function DevMenuContent({ onNavigateToStorybook }: DevMenuContentProps) {
  const { flags } = useFeatureFlags();

  return (
    <>
      {flags.storybook && (
        <Pressable
          accessibilityRole="button"
          onPress={onNavigateToStorybook}
          style={styles.row}
        >
          <ThemedIcon name="book" themeColor="primary" size="medium" />
          <ThemedText type="subtitle" themeColor="onSurface">
            Storybook
          </ThemedText>
        </Pressable>
      )}
    </>
  );
}

/**
 * Renders the floating dev button and drawer menu.
 * @returns React element.
 */
function DevTools() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const navigateToStorybook = () => {
    setMenuVisible(false);
    router.push("/storybook");
  };

  return (
    <>
      <DevFloatingButton onPress={() => setMenuVisible(true)} />
      <Drawer
        visible={menuVisible}
        title="Dev Menu"
        onClose={() => setMenuVisible(false)}
      >
        <DevMenuContent onNavigateToStorybook={navigateToStorybook} />
      </Drawer>
    </>
  );
}

/**
 * Provides root navigation stack for app.
 * @returns React element.
 */
export default function RootLayout() {
  return (
    <KeyboardProvider>
      <ThemeProvider>
        <FeatureFlagsProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <NavigationTheme />
              {isDevBuild && <DevTools />}
            </AuthProvider>
          </QueryClientProvider>
        </FeatureFlagsProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
});
