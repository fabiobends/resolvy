import { StyleSheet } from "react-native";

import { Sizes, Spacing } from "@/constants/theme";

/** Diameter of the floating action button. */
export const BUTTON_SIZE = Sizes.large;

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: Spacing.tiny },
    shadowOpacity: 0.25,
    shadowRadius: Spacing.small,
    elevation: 5,
  },
  pressable: {
    padding: Spacing.small,
  },
});
