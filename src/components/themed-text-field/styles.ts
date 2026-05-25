import { StyleSheet } from "react-native";

import { FontSizes, LineHeights, Spacing } from "@/constants/theme";

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
  input: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    paddingHorizontal: Spacing.small,
    borderWidth: 1,
    borderRadius: Spacing.extraSmall,
    height: INPUT_HEIGHT,
  },
  disabled: {
    opacity: 0.4,
  },
});
