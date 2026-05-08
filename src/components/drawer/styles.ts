import { StyleSheet } from "react-native";

import { Sizes, Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backdropPressable: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: Sizes.small,
    borderTopRightRadius: Sizes.small,
    padding: Spacing.medium,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.medium,
  },
  closeButton: {
    padding: Spacing.small,
  },
});
