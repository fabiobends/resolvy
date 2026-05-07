import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedButton } from "./index";
import { ThemedView } from "@/components/themed-view";

const meta: Meta<typeof ThemedButton> = {
  title: "ThemedButton",
  component: ThemedButton,
  decorators: [
    (Story) => (
      <ThemedView color="surface" style={{ padding: 16 }}>
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
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    color: "secondary",
  },
};

export const Success: Story = {
  args: {
    title: "Success Button",
    color: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning Button",
    color: "warning",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading...",
    color: "primary",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled Button",
    color: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <ThemedView color="surface" style={{ gap: 12 }}>
      <ThemedButton title="Primary" color="primary" />
      <ThemedButton title="Secondary" color="secondary" />
      <ThemedButton title="Success" color="success" />
      <ThemedButton title="Warning" color="warning" />
    </ThemedView>
  ),
};

export const AllStates: Story = {
  render: () => (
    <ThemedView color="surface" style={{ gap: 12 }}>
      <ThemedButton title="Default" color="primary" />
      <ThemedButton title="Loading" color="primary" loading />
      <ThemedButton title="Disabled" color="primary" disabled />
    </ThemedView>
  ),
};
