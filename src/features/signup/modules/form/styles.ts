import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.small,
  },
  linksRow: {
    alignItems: "center",
    paddingTop: Spacing.small,
  },
});
