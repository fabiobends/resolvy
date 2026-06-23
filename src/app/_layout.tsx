import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { I18nextProvider, useTranslation } from "react-i18next";

import { DevFloatingButton } from "@/components/dev-floating-button";
import { Drawer } from "@/components/drawer";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { AuthProvider } from "@/hooks/use-auth/provider";
import { useFeatureFlags } from "@/hooks/use-feature-flags";
import { FeatureFlagsProvider } from "@/hooks/use-feature-flags/provider";
import { ThemePreference, useThemeContext } from "@/hooks/use-theme/context";
import { ThemeProvider } from "@/hooks/use-theme/provider";
import i18n from "@/localization/i18n";
import { configureGoogleSignIn } from "@/services/auth";

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
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
  const { theme, setTheme } = useThemeContext();
  const { t, i18n } = useTranslation();

  const cycleTheme = () => {
    const order: ThemePreference[] = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const toggleLanguage = () => {
    const next = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(next);
  };

  const currentLanguageLabel =
    i18n.language === "pt"
      ? t("devMenu.languagePortuguese")
      : t("devMenu.languageEnglish");

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
            {t("devMenu.storybook")}
          </ThemedText>
        </Pressable>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={cycleTheme}
        style={styles.row}
      >
        <ThemedIcon
          name={
            theme === "dark" ? "moon" : theme === "light" ? "sunny" : "contrast"
          }
          themeColor="primary"
          size="medium"
        />
        <ThemedText type="subtitle" themeColor="onSurface">
          {t("devMenu.theme")}: {theme}
        </ThemedText>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={toggleLanguage}
        style={styles.row}
      >
        <ThemedIcon name="language" themeColor="primary" size="medium" />
        <ThemedText type="subtitle" themeColor="onSurface">
          {t("devMenu.language")}: {currentLanguageLabel}
        </ThemedText>
      </Pressable>
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
  const { t } = useTranslation();

  const navigateToStorybook = () => {
    setMenuVisible(false);
    router.push("/storybook");
  };

  return (
    <>
      <DevFloatingButton onPress={() => setMenuVisible(true)} />
      <Drawer
        visible={menuVisible}
        title={t("devMenu.title")}
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
  // Configure native Google Sign-In once at boot before any Google tap,
  // else the first tap throws DEVELOPER_ERROR.
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <KeyboardProvider>
      <I18nextProvider i18n={i18n}>
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
      </I18nextProvider>
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
