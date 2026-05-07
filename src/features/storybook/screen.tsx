import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

import { view } from "@/storybook/storybook.requires";

import { styles } from "./styles";

const StorybookUIRoot = view.getStorybookUI({});

/**
 * Renders the on-device Storybook UI.
 * @returns React element.
 */
export function StorybookScreen() {
  return (
    <SafeAreaView
      style={[styles.container, { paddingTop: Constants.statusBarHeight }]}
    >
      <StorybookUIRoot />
    </SafeAreaView>
  );
}
