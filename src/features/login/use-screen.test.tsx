import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";

import { ThemeProvider } from "@/hooks/use-theme/provider";

import { useLoginScreen } from "./use-screen";

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

describe("useLoginScreen", () => {
  it("composes all module props", () => {
    const { result } = renderHook(() => useLoginScreen(), {
      wrapper: Wrapper,
    });

    expect(result.current.brandBlockProps).toBeDefined();
    expect(result.current.brandBlockProps.title).toBe("Resolvy");

    expect(result.current.formProps).toBeDefined();
    expect(result.current.formProps.emailField.name).toBe("email");
    expect(result.current.formProps.submitButton.title).toBe("Log in");

    expect(result.current.socialProps).toBeDefined();
    expect(typeof result.current.socialProps.onGooglePress).toBe("function");
  });
});
