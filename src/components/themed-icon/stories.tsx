import type { Meta, StoryObj } from "@storybook/react-native";
import { StyleSheet } from "react-native";

import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";

import { ThemedIcon } from "./index";

const styles = StyleSheet.create({
  container: {
    padding: Spacing.medium,
  },
});

const meta: Meta<typeof ThemedIcon> = {
  title: "ThemedIcon",
  component: ThemedIcon,
};

export default meta;

type Story = StoryObj<typeof ThemedIcon>;

export const PrimarySmall: Story = {
  args: {
    name: "sunny-outline",
    color: "primary",
    size: "small",
  },
  render: (args) => (
    <ThemedView color="surface" style={styles.container}>
      <ThemedIcon {...args} />
    </ThemedView>
  ),
};

export const SecondaryMedium: Story = {
  args: {
    name: "moon-outline",
    color: "secondary",
    size: "medium",
  },
  render: (args) => (
    <ThemedView color="surface" style={styles.container}>
      <ThemedIcon {...args} />
    </ThemedView>
  ),
};

export const SuccessLarge: Story = {
  args: {
    name: "checkmark-circle-outline",
    color: "success",
    size: "large",
  },
  render: (args) => (
    <ThemedView color="surface" style={styles.container}>
      <ThemedIcon {...args} />
    </ThemedView>
  ),
};
