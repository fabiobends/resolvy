import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

import { view } from "../../.storybook/storybook.requires";

const StorybookUIRoot = view.getStorybookUI({});

export default function StorybookScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StorybookUIRoot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
