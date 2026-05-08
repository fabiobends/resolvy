import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
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
    gap: Spacing.large,
  },
});
