import { useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { ForgotPasswordFormData } from "../../schema";
import { FormModule } from "./index";

function TestFormModule(props: {
  error?: string;
  infoBanner: string;
  successText?: string;
  onPress?: () => void;
}) {
  const {
    error: errorProp,
    infoBanner,
    successText,
    onPress = jest.fn(),
  } = props;
  const error = errorProp || undefined;
  const form = useForm<ForgotPasswordFormData>({
    defaultValues: { email: "" },
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
        successText,
      }}
      submitButton={{
        title: "Send reset link",
        onPress,
        loading: false,
      }}
      error={error}
      infoBanner={infoBanner}
    />
  );
}

describe("FormModule", () => {
  it("renders field and button", () => {
    render(<TestFormModule infoBanner="Banner" />);
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("displays mutation error", () => {
    render(<TestFormModule error="No account found" infoBanner="Banner" />);
    expect(screen.getByText("No account found")).toBeTruthy();
  });

  it("calls onPress when submit button is pressed", () => {
    const onPress = jest.fn();
    render(<TestFormModule onPress={onPress} infoBanner="Banner" />);
    fireEvent.press(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders back link", () => {
    render(<TestFormModule infoBanner="Banner" />);
    expect(screen.getByText("Back to log in")).toBeTruthy();
  });

  it("renders success text in field and green button", () => {
    render(
      <TestFormModule successText="Reset link sent." infoBanner="Banner" />,
    );
    expect(screen.getByText("Reset link sent.")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("renders info banner", () => {
    render(<TestFormModule infoBanner="Check spam folder." />);
    expect(screen.getByText("Check spam folder.")).toBeTruthy();
  });
});
