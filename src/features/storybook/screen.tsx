import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  darkTheme,
  theme as lightTheme,
} from "@storybook/react-native-theming";
import { useMemo } from "react";
import { View } from "react-native";

import { view } from "@/storybook/storybook.requires";
import { useThemeContext } from "@/hooks/use-theme/context";

import { styles } from "./styles";

function createStorybookUI(isDark: boolean) {
  return view.getStorybookUI({
    theme: isDark ? darkTheme : lightTheme,
    storage: {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
    },
  });
}

/**
 * Renders the on-device Storybook UI.
 * @returns React element.
 */
export function StorybookScreen() {
  const { activeTheme } = useThemeContext();
  const isDark = activeTheme === "dark";

  const StorybookUIRoot = useMemo(() => createStorybookUI(isDark), [isDark]);

  return (
    <View style={styles.container}>
      <StorybookUIRoot />
    </View>
  );
}
