import { StyleSheet } from "react-native";

import { Sizes, Spacing } from "@/constants/theme";

/** Component styles. */
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.small,
  },
  linksRow: {
    alignItems: "center",
    paddingTop: Spacing.small,
  },
  infoBannerBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
    padding: Spacing.small,
    borderRadius: Sizes.tiny,
    marginTop: Spacing.small,
  },
  infoBannerText: {
    flex: 1,
  },
});
