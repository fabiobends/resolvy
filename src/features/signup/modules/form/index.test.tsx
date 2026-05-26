import { useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { SignupFormData } from "../../schema";
import { FormModule } from "./index";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

function TestFormModule(props: { error?: string; onPress?: () => void }) {
  const { error, onPress = jest.fn() } = props;
  const form = useForm<SignupFormData>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  return (
    <FormModule
      firstNameField={{
        control: form.control,
        name: "firstName",
        label: "First name",
        placeholder: "First name",
        autoCapitalize: "words",
      }}
      lastNameField={{
        control: form.control,
        name: "lastName",
        label: "Last name",
        placeholder: "Last name",
        autoCapitalize: "words",
      }}
      emailField={{
        control: form.control,
        name: "email",
        label: "Email",
        placeholder: "Email",
        keyboardType: "email-address",
        autoCapitalize: "none",
      }}
      passwordField={{
        control: form.control,
        name: "password",
        label: "Password",
        placeholder: "Password",
        secureTextEntry: true,
      }}
      submitButton={{
        title: "Sign Up",
        onPress,
        loading: false,
      }}
      error={error}
    />
  );
}

describe("FormModule", () => {
  it("renders fields and button", () => {
    render(<TestFormModule />);
    expect(screen.getByText("First name")).toBeTruthy();
    expect(screen.getByText("Last name")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("displays mutation error", () => {
    render(
      <TestFormModule error="An account with this email already exists" />,
    );
    expect(
      screen.getByText("An account with this email already exists"),
    ).toBeTruthy();
  });

  it("calls onPress when submit button is pressed", () => {
    const onPress = jest.fn();
    render(<TestFormModule onPress={onPress} />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders back link to login", () => {
    render(<TestFormModule />);
    expect(screen.getByText("Already have an account? Log in")).toBeTruthy();
  });
});
