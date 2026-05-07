import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedTextField } from "./index";
import { ThemedView } from "@/components/themed-view";

const meta: Meta<typeof ThemedTextField> = {
  title: "ThemedTextField",
  component: ThemedTextField,
  decorators: [
    (Story) => (
      <ThemedView color="surface" style={{ padding: 16 }}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedTextField>;

export const Primary: Story = {
  args: {
    label: "Email Address",
    color: "primary",
    placeholder: "Enter your email",
  },
};

export const Secondary: Story = {
  args: {
    label: "Username",
    color: "secondary",
    placeholder: "Enter username",
  },
};

export const Success: Story = {
  args: {
    label: "Verification Code",
    color: "success",
    placeholder: "123456",
  },
};

export const Warning: Story = {
  args: {
    label: "Password",
    color: "warning",
    placeholder: "Minimum 8 characters",
    secureTextEntry: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Read Only",
    color: "primary",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: "Full Name",
    color: "primary",
    value: "Jane Doe",
  },
};
