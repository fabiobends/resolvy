import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";

import { Drawer } from "@/components/drawer";
import { DevFloatingButton } from "@/components/dev-floating-button";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { FeatureFlagsProvider } from "@/hooks/use-feature-flags/provider";
import { useFeatureFlags } from "@/hooks/use-feature-flags";
import { ThemeProvider } from "@/hooks/use-theme/provider";
import { useThemeContext } from "@/hooks/use-theme/context";

/**
 * True when running in Expo Go, a development build, or local bare build.
 * Standalone production builds are excluded.
 */
const isDevBuild =
  Constants.executionEnvironment !== ExecutionEnvironment.Standalone;

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
          <ThemedIcon name="book" color="primary" size="medium" />
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
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <DevFloatingButton onPress={() => setMenuVisible(true)} />
      <Drawer
        visible={menuVisible}
        title="Dev Menu"
        onClose={() => setMenuVisible(false)}
      >
        <DevMenuContent onNavigateToStorybook={navigateToStorybook} />
      </Drawer>
    </View>
  );
}

/**
 * Provides root navigation stack for app.
 * @returns React element.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <FeatureFlagsProvider>
        <NavigationTheme />
        {isDevBuild && <DevTools />}
      </FeatureFlagsProvider>
    </ThemeProvider>
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
