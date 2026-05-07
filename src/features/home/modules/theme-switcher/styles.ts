import { StyleSheet } from "react-native";

import { Sizes, Spacing } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  button: {
    width: Sizes.large,
    height: Sizes.large,
    borderRadius: Sizes.large / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
