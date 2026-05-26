import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: Spacing.small,
  },
});
