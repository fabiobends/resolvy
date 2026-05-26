import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemeProvider } from "@/hooks/use-theme/provider";

import { signupSchema, SignupFormData } from "../../schema";
import { useFormModule } from "./use-module";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false, gcTime: 0 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

function useTestForm() {
  return useForm<SignupFormData>({
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });
}

describe("useFormModule", () => {
  it("returns field configs and a submit handler", () => {
    const { result } = renderHook(
      () => {
        const form = useTestForm();
        return useFormModule(form);
      },
      { wrapper: Wrapper },
    );

    expect(result.current.firstNameField.name).toBe("firstName");
    expect(result.current.lastNameField.name).toBe("lastName");
    expect(result.current.emailField.name).toBe("email");
    expect(result.current.passwordField.name).toBe("password");
    expect(typeof result.current.submitButton.onPress).toBe("function");
    expect(result.current.submitButton.title).toBe("Sign Up");
    expect(result.current.error).toBeUndefined();
  });
});
