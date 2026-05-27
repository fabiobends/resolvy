import { StyleSheet } from "react-native";

import { Spacing, Sizes } from "@/constants/theme";

const baseContainer = {
  alignItems: "center",
  gap: Spacing.small,
} as const;

/** Component styles keyed by size. */
export const styles = {
  small: StyleSheet.create({
    container: {
      ...baseContainer,
      marginBottom: Spacing.small,
    },
    icon: {
      width: Sizes.small,
      height: Sizes.small,
    },
  }),
  medium: StyleSheet.create({
    container: {
      ...baseContainer,
      marginBottom: Spacing.medium,
    },
    icon: {
      width: Sizes.medium,
      height: Sizes.medium,
    },
  }),
  large: StyleSheet.create({
    container: {
      ...baseContainer,
      marginBottom: Spacing.large,
    },
    icon: {
      width: Sizes.large,
      height: Sizes.large,
    },
  }),
  extraLarge: StyleSheet.create({
    container: {
      ...baseContainer,
      marginBottom: Spacing.large,
    },
    icon: {
      width: Sizes.extraLarge,
      height: Sizes.extraLarge,
    },
  }),
} as const;
