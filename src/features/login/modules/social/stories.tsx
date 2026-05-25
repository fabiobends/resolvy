import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

import { SocialModule } from "./index";

const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
  },
});

const meta: Meta<typeof SocialModule> = {
  title: "Login/Social",
  component: SocialModule,
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.container}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SocialModule>;

export const Default: Story = {
  args: {
    onGooglePress: () => {},
    onApplePress: () => {},
  },
};

export const GoogleLoading: Story = {
  args: {
    onGooglePress: () => {},
    onApplePress: () => {},
    googleLoading: true,
  },
};

export const AppleLoading: Story = {
  args: {
    onGooglePress: () => {},
    onApplePress: () => {},
    appleLoading: true,
  },
};
