import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.small,
    borderRadius: Spacing.medium,
  },
  small: {
    padding: Spacing.small,
  },
  medium: {
    padding: Spacing.medium,
  },
  large: {
    padding: Spacing.medium,
  },
  disabled: {
    opacity: 0.5,
  },
});
