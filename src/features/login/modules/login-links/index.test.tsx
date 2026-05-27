import { render } from "@testing-library/react-native";

import { LoginLinksRow } from "./index";

describe("LoginLinksRow", () => {
  it("renders both links", () => {
    const { getByText } = render(
      <LoginLinksRow
        onForgotPasswordPress={() => {}}
        onCreateAccountPress={() => {}}
      />,
    );

    expect(getByText("Forgot password?")).toBeTruthy();
    expect(getByText("Create account")).toBeTruthy();
  });
});
