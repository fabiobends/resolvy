import { useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { LoginFormData } from "../../schema";
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
  const form = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });

  return (
    <FormModule
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
        title: "Log in",
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
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Password")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("displays mutation error", () => {
    render(<TestFormModule error="Bad credentials" />);
    expect(screen.getByText("Bad credentials")).toBeTruthy();
  });

  it("calls onPress when submit button is pressed", () => {
    const onPress = jest.fn();
    render(<TestFormModule onPress={onPress} />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
