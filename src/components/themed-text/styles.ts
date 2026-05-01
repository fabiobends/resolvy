import { StyleSheet } from "react-native";

import { FontSizes, LineHeights } from "@/constants/theme";

/** Typography style presets for each text variant. */
export const textStyles = StyleSheet.create({
  caption: {
    fontSize: FontSizes.tiny,
    lineHeight: LineHeights.tiny,
    fontWeight: 400,
  },
  label: {
    fontSize: FontSizes.extraSmall,
    lineHeight: LineHeights.extraSmall,
    fontWeight: 500,
  },
  bodySmall: {
    fontSize: FontSizes.small,
    lineHeight: LineHeights.small,
    fontWeight: 400,
  },
  body: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    fontWeight: 400,
  },
  subtitle: {
    fontSize: FontSizes.large,
    lineHeight: LineHeights.large,
    fontWeight: 500,
  },
  title: {
    fontSize: FontSizes.extraLarge,
    lineHeight: LineHeights.extraLarge,
    fontWeight: 600,
  },
  display: {
    fontSize: FontSizes.huge,
    lineHeight: LineHeights.huge,
    fontWeight: 700,
  },
});
