import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { Spacing } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";

import { ThemedIconButton } from "./index";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.medium,
  },
  decoratorPadding: {
    padding: Spacing.medium,
  },
});

const meta: Meta<typeof ThemedIconButton> = {
  title: "ThemedIconButton",
  component: ThemedIconButton,
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.decoratorPadding}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedIconButton>;

export const Primary: Story = {
  args: {
    name: "sunny-outline",
    foregroundThemeColor: "primary",
    size: "medium",
  },
};

export const Secondary: Story = {
  args: {
    name: "moon-outline",
    foregroundThemeColor: "secondary",
    size: "medium",
  },
};

export const Success: Story = {
  args: {
    name: "checkmark-circle-outline",
    foregroundThemeColor: "success",
    size: "medium",
  },
};

export const Sizes: Story = {
  render: () => (
    <ThemedView themeColor="surface" style={styles.row}>
      <ThemedIconButton
        name="sunny-outline"
        foregroundThemeColor="primary"
        size="small"
      />
      <ThemedIconButton
        name="sunny-outline"
        foregroundThemeColor="primary"
        size="medium"
      />
      <ThemedIconButton
        name="sunny-outline"
        foregroundThemeColor="primary"
        size="large"
      />
    </ThemedView>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <ThemedView themeColor="surface" style={styles.row}>
      <ThemedIconButton
        name="sunny-outline"
        foregroundThemeColor="onPrimary"
        backgroundThemeColor="primary"
        size="medium"
      />
      <ThemedIconButton
        name="moon-outline"
        foregroundThemeColor="onSecondary"
        backgroundThemeColor="secondary"
        size="medium"
      />
      <ThemedIconButton
        name="checkmark-circle-outline"
        foregroundThemeColor="onSuccess"
        backgroundThemeColor="success"
        size="medium"
      />
    </ThemedView>
  ),
};

export const Loading: Story = {
  args: {
    name: "sunny-outline",
    foregroundThemeColor: "primary",
    backgroundThemeColor: "primary",
    loading: true,
    size: "medium",
  },
};
