import { renderHook } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/hooks/use-theme/provider";

import { useFormModule } from "./use-module";

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

describe("useFormModule", () => {
  it("returns field configs and a submit handler", () => {
    const { result } = renderHook(() => useFormModule(), {
      wrapper: Wrapper,
    });

    expect(result.current.firstNameField.name).toBe("firstName");
    expect(result.current.lastNameField.name).toBe("lastName");
    expect(result.current.emailField.name).toBe("email");
    expect(result.current.passwordField.name).toBe("password");
    expect(typeof result.current.submitButton.onPress).toBe("function");
    expect(result.current.submitButton.title).toBe("Sign Up");
    expect(result.current.error).toBeUndefined();
  });
});
