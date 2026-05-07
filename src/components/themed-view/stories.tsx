import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedView } from "./index";
import { ThemedText } from "@/components/themed-text";

const meta: Meta<typeof ThemedView> = {
  title: "ThemedView",
  component: ThemedView,
};

export default meta;

type Story = StoryObj<typeof ThemedView>;

export const Surface: Story = {
  args: {
    color: "surface",
    children: (
      <ThemedText type="body" themeColor="onSurface">
        Surface background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const SurfaceDim: Story = {
  args: {
    color: "surfaceDim",
    children: (
      <ThemedText type="body" themeColor="onSurface">
        Surface Dim background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const SurfaceBright: Story = {
  args: {
    color: "surfaceBright",
    children: (
      <ThemedText type="body" themeColor="onSurface">
        Surface Bright background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
    children: (
      <ThemedText type="body" themeColor="onPrimary">
        Primary background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    children: (
      <ThemedText type="body" themeColor="onSecondary">
        Secondary background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const Success: Story = {
  args: {
    color: "success",
    children: (
      <ThemedText type="body" themeColor="onSuccess">
        Success background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    children: (
      <ThemedText type="body" themeColor="onWarning">
        Warning background
      </ThemedText>
    ),
    style: { padding: 16, borderRadius: 8 },
  },
};
