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

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

function Wrapper({ children }: { children: React.ReactNode }) {
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

    expect(result.current.logoProps).toBeDefined();
    expect(result.current.logoProps.title).toBe("Resolvy");

    expect(result.current.formProps).toBeDefined();
    expect(result.current.formProps.emailField.name).toBe("email");
    expect(result.current.formProps.submitButton.title).toBe("Log in");

    expect(result.current.socialProps).toBeDefined();
    expect(typeof result.current.socialProps.onGooglePress).toBe("function");
  });
});
