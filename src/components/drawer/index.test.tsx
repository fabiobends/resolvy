import { fireEvent, render, screen } from "@testing-library/react-native";
import { ThemedText } from "@/components/themed-text";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Drawer } from "./index";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
        frame: { x: 0, y: 0, width: 390, height: 844 },
      }}
    >
      {children}
    </SafeAreaProvider>
  );
}

describe("Drawer", () => {
  it("renders title and children when visible", () => {
    render(
      <Drawer visible title="Test Drawer" onClose={jest.fn()}>
        <ThemedText type="body" themeColor="onSurface">
          Drawer content
        </ThemedText>
      </Drawer>,
      { wrapper: Wrapper },
    );

    expect(screen.getByText("Test Drawer")).toBeTruthy();
    expect(screen.getByText("Drawer content")).toBeTruthy();
  });

  it("calls onClose when backdrop is pressed", () => {
    const onClose = jest.fn();
    render(
      <Drawer visible title="Test" onClose={onClose}>
        <ThemedText type="body" themeColor="onSurface">
          Content
        </ThemedText>
      </Drawer>,
      { wrapper: Wrapper },
    );

    const buttons = screen.getAllByLabelText("Close drawer");
    fireEvent.press(buttons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is pressed", () => {
    const onClose = jest.fn();
    render(
      <Drawer visible title="Test" onClose={onClose}>
        <ThemedText type="body" themeColor="onSurface">
          Content
        </ThemedText>
      </Drawer>,
      { wrapper: Wrapper },
    );

    const buttons = screen.getAllByLabelText("Close drawer");
    fireEvent.press(buttons[1]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when not visible", () => {
    const { queryByText } = render(
      <Drawer visible={false} title="Hidden" onClose={jest.fn()}>
        <ThemedText type="body" themeColor="onSurface">
          Content
        </ThemedText>
      </Drawer>,
      { wrapper: Wrapper },
    );

    expect(queryByText("Hidden")).toBeTruthy();
  });
});
