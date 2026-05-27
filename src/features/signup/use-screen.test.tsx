import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";

import { ThemeProvider } from "@/hooks/use-theme/provider";

import { useSignupScreen } from "./use-screen";

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

describe("useSignupScreen", () => {
  it("composes all module props", () => {
    const { result } = renderHook(() => useSignupScreen(), {
      wrapper: Wrapper,
    });

    expect(result.current.brandBlockProps).toBeDefined();
    expect(result.current.brandBlockProps.title).toBe("Resolvy");
    expect(result.current.brandBlockProps.subtitle).toBeUndefined();

    expect(result.current.formProps).toBeDefined();
    expect(result.current.formProps.firstNameField.name).toBe("firstName");
    expect(result.current.formProps.submitButton.title).toBe("Sign Up");
    expect(result.current.formProps.error).toBeUndefined();
  });
});
