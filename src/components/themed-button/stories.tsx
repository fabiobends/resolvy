import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { Sizes, Spacing } from "@/constants/theme";

import { ThemedView } from "@/components/themed-view";
import { ThemedButton } from "./index";

const styles = StyleSheet.create({
  decoratorPadding: {
    padding: Spacing.medium,
  },
  gap: {
    gap: Sizes.extraSmall,
  },
});

const meta: Meta<typeof ThemedButton> = {
  title: "ThemedButton",
  component: ThemedButton,
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.decoratorPadding}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedButton>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    variantColor: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variantColor: "secondary",
  },
};

export const Success: Story = {
  args: {
    title: "Success Button",
    variantColor: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning Button",
    variantColor: "warning",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading...",
    variantColor: "primary",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    variantColor: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <ThemedView themeColor="surface" style={styles.gap}>
      <ThemedButton title="Primary" variantColor="primary" />
      <ThemedButton title="Secondary" variantColor="secondary" />
      <ThemedButton title="Success" variantColor="success" />
      <ThemedButton title="Warning" variantColor="warning" />
    </ThemedView>
  ),
};

export const AllStates: Story = {
  render: () => (
    <ThemedView themeColor="surface" style={styles.gap}>
      <ThemedButton title="Default" variantColor="primary" />
      <ThemedButton title="Loading" variantColor="primary" loading />
      <ThemedButton title="Disabled" variantColor="primary" disabled />
    </ThemedView>
  ),
};
