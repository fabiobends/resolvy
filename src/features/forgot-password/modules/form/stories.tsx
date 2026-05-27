import type { Meta, StoryObj } from "@storybook/react-native";
import { useForm } from "react-hook-form";

import { ForgotPasswordFormData } from "../../schema";
import { FormModule } from "./index";

const meta: Meta<typeof FormModule> = {
  title: "ForgotPassword/Form",
  component: FormModule,
};

export default meta;
type Story = StoryObj<typeof FormModule>;

const BANNER =
  "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.";

function FormStory(
  props: Omit<React.ComponentProps<typeof FormModule>, "emailField"> & {
    successText?: string;
  },
) {
  const { successText, ...otherProps } = props;
  const { control } = useForm<ForgotPasswordFormData>();

  return (
    <FormModule
      {...otherProps}
      emailField={{
        control,
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        keyboardType: "email-address",
        autoCapitalize: "none",
        successText,
      }}
    />
  );
}

export const Default: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Send reset link",
        onPress: () => {},
        loading: false,
      }}
      infoBanner={BANNER}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Send reset link",
        onPress: () => {},
        loading: true,
      }}
      infoBanner={BANNER}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Send reset link",
        onPress: () => {},
        loading: false,
      }}
      error="No account found with this email"
      infoBanner={BANNER}
    />
  ),
};

export const Success: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Send reset link",
        onPress: () => {},
        loading: false,
      }}
      infoBanner={BANNER}
      successText="Reset link sent. Check your email inbox."
    />
  ),
};
