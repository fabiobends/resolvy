import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedLink } from "@/components/themed-link";
import { ThemedView } from "@/components/themed-view";

import { ThemeSwitcher } from "./modules/theme-switcher";
import { Welcome } from "./modules/welcome";
import { styles } from "./styles";
import { useHomeScreen } from "./use-screen";

/**
 * Renders the home screen composed of the welcome and theme switcher modules.
 * @returns React element.
 */
export function HomeScreen() {
  const { themeSwitcherProps, welcomeProps } = useHomeScreen();
  const router = useRouter();

  return (
    <ThemedView color="surface" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Welcome {...welcomeProps} />
        <ThemeSwitcher {...themeSwitcherProps} />
        <ThemedLink
          title="Open Storybook"
          color="primary"
          onPress={() => router.push("/storybook")}
        />
      </SafeAreaView>
    </ThemedView>
  );
}
