import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { Spacing } from "@/constants/theme";

import { ThemedView } from "@/components/themed-view";
import { ThemedTextField } from "./index";

const styles = StyleSheet.create({
  decoratorPadding: {
    padding: Spacing.medium,
  },
});

const meta: Meta<typeof ThemedTextField> = {
  title: "ThemedTextField",
  component: ThemedTextField,
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.decoratorPadding}>
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
    variantColor: "primary",
    placeholder: "Enter your email",
  },
};

export const Secondary: Story = {
  args: {
    label: "Username",
    variantColor: "secondary",
    placeholder: "Enter username",
  },
};

export const Success: Story = {
  args: {
    label: "Verification Code",
    variantColor: "success",
    placeholder: "123456",
  },
};

export const Warning: Story = {
  args: {
    label: "Password",
    variantColor: "warning",
    placeholder: "Minimum 8 characters",
    secureTextEntry: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Read Only",
    variantColor: "primary",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: "Full Name",
    variantColor: "primary",
    value: "Jane Doe",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    variantColor: "primary",
    placeholder: "Enter email",
    helperText: "We will never share your email.",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    variantColor: "primary",
    placeholder: "Enter email",
    errorText: "Invalid email address",
  },
};

export const ErrorOverridesHelperText: Story = {
  args: {
    label: "Email",
    variantColor: "primary",
    placeholder: "Enter email",
    helperText: "We will never share your email.",
    errorText: "Invalid email address",
  },
};
