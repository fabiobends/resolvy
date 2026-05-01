import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";

import { Welcome } from "./modules/welcome";
import { styles } from "./styles";
import { useHomeScreen } from "./use-screen";

/**
 * Renders the home screen composed of the welcome module.
 * @returns React element.
 */
export function HomeScreen() {
  const { welcomeProps } = useHomeScreen();

  return (
    <ThemedView color="surface" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Welcome {...welcomeProps} />
      </SafeAreaView>
    </ThemedView>
  );
}
