import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Screen-level styles for the login layout. */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.large,
    gap: Spacing.large,
  },
});
