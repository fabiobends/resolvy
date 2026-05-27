import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";

import { ThemeProvider } from "@/hooks/use-theme/provider";

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

describe("useFormModule", () => {
  it("returns email field config and submit handler", () => {
    const { result } = renderHook(() => useFormModule(), {
      wrapper: Wrapper,
    });

    expect(result.current.emailField.name).toBe("email");
    expect(typeof result.current.submitButton.onPress).toBe("function");
    expect(result.current.submitButton.title).toBe("Send reset link");
    expect(result.current.emailField.successText).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });
});
