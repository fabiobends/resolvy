import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.medium,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  line: {
    flex: 1,
    height: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.medium,
  },
});
