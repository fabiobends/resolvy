import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-native";

import { LoginFormData } from "../../schema";
import { FormModule } from "./index";

const meta: Meta<typeof FormModule> = {
  title: "Login/Form",
  component: FormModule,
};

export default meta;
type Story = StoryObj<typeof FormModule>;

function FormStory(
  props: Omit<
    React.ComponentProps<typeof FormModule>,
    "emailField" | "passwordField"
  >,
) {
  const { control } = useForm<LoginFormData>();

  return (
    <FormModule
      {...props}
      emailField={{
        control,
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        keyboardType: "email-address",
        autoCapitalize: "none",
      }}
      passwordField={{
        control,
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        secureTextEntry: true,
      }}
    />
  );
}

export const Default: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Log in",
        onPress: () => {},
        loading: false,
        disabled: false,
      }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Log in",
        onPress: () => {},
        loading: true,
        disabled: true,
      }}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Log in",
        onPress: () => {},
        loading: false,
        disabled: true,
      }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Log in",
        onPress: () => {},
        loading: false,
        disabled: false,
      }}
      error="Invalid credentials"
    />
  ),
};
