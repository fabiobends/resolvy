import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ThemedView type="surface" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView type="surfaceDim" style={styles.card}>
          <ThemedText type="title" themeColor="onSurface" style={styles.title}>
            Welcome
          </ThemedText>
          <ThemedText type="bodySmall" themeColor="onSurfaceDim">
            Resolvy
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.medium,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    padding: Spacing.large,
    borderRadius: Spacing.medium,
    alignItems: "center",
    gap: Spacing.small,
    maxWidth: 400,
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
});
