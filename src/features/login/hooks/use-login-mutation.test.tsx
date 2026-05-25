import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { useLoginMutation } from "./use-login-mutation";

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
    defaultOptions: { mutations: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useLoginMutation", () => {
  it("mutates successfully", async () => {
    const { result } = renderHook(() => useLoginMutation(), {
      wrapper: Wrapper,
    });

    result.current.mutate({
      email: "test@example.com",
      password: "password",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true), {
      timeout: 3000,
    });
    expect(result.current.data?.email).toBe("test@example.com");
  });
});
