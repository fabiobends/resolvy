import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-native";
import React from "react";

import { useSocialModule } from "./use-module";

jest.mock("@/services/auth", () => ({
  signInWithGoogle: jest.fn(),
  signInWithApple: jest.fn(),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false, gcTime: 0 } },
  });

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children,
  );
}

describe("useSocialModule", () => {
  it("returns press handlers", () => {
    const { result } = renderHook(() => useSocialModule(), {
      wrapper: Wrapper,
    });
    expect(typeof result.current.onGooglePress).toBe("function");
    expect(typeof result.current.onApplePress).toBe("function");
  });
});
