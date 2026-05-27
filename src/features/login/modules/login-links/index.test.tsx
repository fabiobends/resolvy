import { fireEvent, render, screen } from "@testing-library/react-native";

import { LoginLinksRow } from "./index";

describe("LoginLinksRow", () => {
  it("renders both links", () => {
    render(
      <LoginLinksRow
        onForgotPasswordPress={() => {}}
        onCreateAccountPress={() => {}}
      />,
    );
    expect(screen.getByText("Forgot password?")).toBeTruthy();
    expect(screen.getByText("Create account")).toBeTruthy();
  });

  it("calls onForgotPasswordPress when forgot password is pressed", () => {
    const onForgotPasswordPress = jest.fn();
    render(
      <LoginLinksRow
        onForgotPasswordPress={onForgotPasswordPress}
        onCreateAccountPress={() => {}}
      />,
    );
    fireEvent.press(screen.getByText("Forgot password?"));
    expect(onForgotPasswordPress).toHaveBeenCalledTimes(1);
  });

  it("calls onCreateAccountPress when create account is pressed", () => {
    const onCreateAccountPress = jest.fn();
    render(
      <LoginLinksRow
        onForgotPasswordPress={() => {}}
        onCreateAccountPress={onCreateAccountPress}
      />,
    );
    fireEvent.press(screen.getByText("Create account"));
    expect(onCreateAccountPress).toHaveBeenCalledTimes(1);
  });
});
