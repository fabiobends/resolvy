import type { Meta, StoryObj } from "@storybook/react-native";
import { useForm } from "react-hook-form";

import { ForgotPasswordFormData } from "./schema";
import { ForgotPasswordScreenView } from "./screen";
import { ForgotPasswordScreenProps } from "./types";

const meta: Meta<typeof ForgotPasswordScreenView> = {
  title: "ForgotPassword/Screen",
  component: ForgotPasswordScreenView,
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordScreenView>;

function ScreenStory(
  props: Omit<ForgotPasswordScreenProps, "formProps"> & {
    formProps: Omit<ForgotPasswordScreenProps["formProps"], "emailField"> &
      Pick<ForgotPasswordScreenProps["formProps"]["emailField"], "successText">;
  },
) {
  const { successText, ...formPropsRest } = props.formProps;
  const { control } = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
  });

  return (
    <ForgotPasswordScreenView
      {...props}
      formProps={{
        ...formPropsRest,
        emailField: {
          control,
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          keyboardType: "email-address",
          autoCapitalize: "none",
          successText,
        },
      }}
    />
  );
}

export const Default: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy", subtitle: "Forgot password" }}
      formProps={{
        submitButton: {
          title: "Send reset link",
          onPress: () => {},
          loading: false,
        },
        infoBanner:
          "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
      }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy", subtitle: "Forgot password" }}
      formProps={{
        submitButton: {
          title: "Send reset link",
          onPress: () => {},
          loading: true,
        },
        infoBanner:
          "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
      }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy", subtitle: "Forgot password" }}
      formProps={{
        submitButton: {
          title: "Send reset link",
          onPress: () => {},
          loading: false,
        },
        error: "No account found with this email",
        infoBanner:
          "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
      }}
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy", subtitle: "Forgot password" }}
      formProps={{
        submitButton: {
          title: "Send reset link",
          onPress: () => {},
          loading: false,
        },
        infoBanner:
          "Make sure to check your spam or junk folder. The reset link expires after 24 hours and can only be used once.",
        successText: "Reset link sent. Check your email inbox.",
      }}
    />
  ),
};
