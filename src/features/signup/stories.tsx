import type { Meta, StoryObj } from "@storybook/react-native";
import { useForm } from "react-hook-form";

import { SignupFormData } from "./schema";
import { SignupScreenView } from "./screen";
import { SignupScreenProps } from "./types";

const meta: Meta<typeof SignupScreenView> = {
  title: "Signup/Screen",
  component: SignupScreenView,
};

export default meta;
type Story = StoryObj<typeof SignupScreenView>;

function ScreenStory(
  props: Omit<SignupScreenProps, "formProps"> & {
    formProps: Omit<
      SignupScreenProps["formProps"],
      "firstNameField" | "lastNameField" | "emailField" | "passwordField"
    >;
  },
) {
  const { control } = useForm<SignupFormData>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  return (
    <SignupScreenView
      {...props}
      formProps={{
        ...props.formProps,
        firstNameField: {
          control,
          name: "firstName",
          label: "First name",
          placeholder: "Enter your first name",
          autoCapitalize: "words",
        },
        lastNameField: {
          control,
          name: "lastName",
          label: "Last name",
          placeholder: "Enter your last name",
          autoCapitalize: "words",
        },
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
      brandBlockProps={{ title: "Resolvy" }}
      formProps={{
        submitButton: {
          title: "Sign Up",
          onPress: () => {},
          loading: false,
        },
      }}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy" }}
      formProps={{
        submitButton: {
          title: "Sign Up",
          onPress: () => {},
          loading: true,
        },
      }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <ScreenStory
      brandBlockProps={{ title: "Resolvy" }}
      formProps={{
        submitButton: {
          title: "Sign Up",
          onPress: () => {},
          loading: false,
        },
        error: "An account with this email already exists",
      }}
    />
  ),
};
