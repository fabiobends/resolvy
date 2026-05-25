import type { Meta, StoryObj } from "@storybook/react-native";

import { Spacing } from "@/constants/theme";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "./index";

const meta: Meta<typeof ThemedView> = {
  title: "ThemedView",
  component: ThemedView,
};

export default meta;

type Story = StoryObj<typeof ThemedView>;

export const Surface: Story = {
  args: {
    themeColor: "surface",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onSurface">
        Surface background
      </ThemedText>
    </ThemedView>
  ),
};

export const SurfaceDim: Story = {
  args: {
    themeColor: "surfaceDim",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onSurface">
        Surface Dim background
      </ThemedText>
    </ThemedView>
  ),
};

export const SurfaceBright: Story = {
  args: {
    themeColor: "surfaceBright",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onSurface">
        Surface Bright background
      </ThemedText>
    </ThemedView>
  ),
};

export const Primary: Story = {
  args: {
    themeColor: "primary",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onPrimary">
        Primary background
      </ThemedText>
    </ThemedView>
  ),
};

export const Secondary: Story = {
  args: {
    themeColor: "secondary",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onSecondary">
        Secondary background
      </ThemedText>
    </ThemedView>
  ),
};

export const Success: Story = {
  args: {
    themeColor: "success",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onSuccess">
        Success background
      </ThemedText>
    </ThemedView>
  ),
};

export const Warning: Story = {
  args: {
    themeColor: "warning",
    style: { padding: Spacing.medium, borderRadius: Spacing.small },
  },
  render: (args) => (
    <ThemedView {...args}>
      <ThemedText type="body" themeColor="onWarning">
        Warning background
      </ThemedText>
    </ThemedView>
  ),
};
