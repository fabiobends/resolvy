import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
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
