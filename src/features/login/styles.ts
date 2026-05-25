import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Screen-level styles for the login layout. */
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.large,
  },
});
