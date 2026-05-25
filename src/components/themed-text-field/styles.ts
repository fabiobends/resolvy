import { StyleSheet } from "react-native";

import { FontSizes, LineHeights, Sizes, Spacing } from "@/constants/theme";

/**
 * Fixed input height prevents layout jumps while typing.
 * Computed as: lineHeight + verticalPadding + verticalBorders.
 */
const INPUT_HEIGHT = LineHeights.medium + Spacing.small * 2 + 2;

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    gap: Spacing.tiny,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    fontSize: FontSizes.medium,
    paddingHorizontal: Spacing.small,
    borderWidth: 1,
    borderRadius: Spacing.extraSmall,
    height: INPUT_HEIGHT,
  },
  /** Prevents text from overlapping the floating icon: right gap + icon width + text gap. */
  inputWithIcon: {
    paddingRight: Spacing.small + Sizes.small + Spacing.small,
  },
  icon: {
    position: "absolute",
    right: Spacing.small,
  },
  disabled: {
    opacity: 0.4,
  },
});
