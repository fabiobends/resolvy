import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-native";

import { SignupFormData } from "../../schema";
import { FormModule } from "./index";

const meta: Meta<typeof FormModule> = {
  title: "Signup/Form",
  component: FormModule,
};

export default meta;
type Story = StoryObj<typeof FormModule>;

function FormStory(
  props: Omit<
    React.ComponentProps<typeof FormModule>,
    "firstNameField" | "lastNameField" | "emailField" | "passwordField"
  >,
) {
  const { control } = useForm<SignupFormData>();

  return (
    <FormModule
      {...props}
      firstNameField={{
        control,
        name: "firstName",
        label: "First name",
        placeholder: "Enter your first name",
        autoCapitalize: "words",
      }}
      lastNameField={{
        control,
        name: "lastName",
        label: "Last name",
        placeholder: "Enter your last name",
        autoCapitalize: "words",
      }}
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
        title: "Sign Up",
        onPress: () => {},
        loading: false,
      }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Sign Up",
        onPress: () => {},
        loading: true,
      }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FormStory
      submitButton={{
        title: "Sign Up",
        onPress: () => {},
        loading: false,
      }}
      error="An account with this email already exists"
    />
  ),
};
