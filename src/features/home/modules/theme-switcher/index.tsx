import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemeSwitcherProps } from "./types";

/**
 * Renders a theme toggle button with current theme label.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemeSwitcher(props: ThemeSwitcherProps) {
  const { activeTheme, onToggle } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ThemedView themeColor="surfaceDim" style={styles.container}>
      <ThemedText type="body" themeColor="onSurface">
        {t("home.themeLabel", { theme: activeTheme })}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          activeTheme === "dark"
            ? t("accessibility.switchToLightMode")
            : t("accessibility.switchToDarkMode")
        }
        onPress={onToggle}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <ThemedIcon
          name={activeTheme === "dark" ? "sunny-outline" : "moon-outline"}
          themeColor="onPrimary"
          size="medium"
          testID="theme-icon"
        />
      </Pressable>
    </ThemedView>
  );
}
