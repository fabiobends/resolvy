import type { Meta, StoryObj } from "@storybook/react-native";
import { useForm } from "react-hook-form";

import { LoginFormData } from "./schema";
import { LoginScreenView } from "./screen";
import { LoginScreenProps } from "./types";

const meta: Meta<typeof LoginScreenView> = {
  title: "Login/Screen",
  component: LoginScreenView,
};

export default meta;
type Story = StoryObj<typeof LoginScreenView>;

function ScreenStory(
  props: Omit<LoginScreenProps, "formProps"> & {
    formProps: Omit<
      LoginScreenProps["formProps"],
      "emailField" | "passwordField"
    >;
  },
) {
  const { control } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });

  return (
    <LoginScreenView
      {...props}
      formProps={{
        ...props.formProps,
        emailField: {
          control,
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          keyboardType: "email-address",
          autoCapitalize: "none",
        },
        passwordField: {
          control,
          name: "password",
          label: "Password",
          placeholder: "Enter your password",
          secureTextEntry: true,
        },
      }}
    />
  );
}

export const Default: Story = {
  render: () => (
    <ScreenStory
      logoProps={{ title: "Resolvy", subtitle: "Resolve what matters" }}
      formProps={{
        submitButton: {
          title: "Log in",
          onPress: () => {},
          loading: false,
        },
      }}
      socialProps={{ onGooglePress: () => {}, onApplePress: () => {} }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ScreenStory
      logoProps={{ title: "Resolvy", subtitle: "Resolve what matters" }}
      formProps={{
        submitButton: {
          title: "Log in",
          onPress: () => {},
          loading: true,
        },
      }}
      socialProps={{ onGooglePress: () => {}, onApplePress: () => {} }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ScreenStory
      logoProps={{ title: "Resolvy", subtitle: "Resolve what matters" }}
      formProps={{
        submitButton: {
          title: "Log in",
          onPress: () => {},
          loading: false,
        },
        error: "Invalid credentials",
      }}
      socialProps={{ onGooglePress: () => {}, onApplePress: () => {} }}
    />
  ),
};
