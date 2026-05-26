// @ts-nocheck
// Global test setup

import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const mockReact = React;
const mockView = View;
const mockScrollView = ScrollView;
const mockPressable = Pressable;
const mockText = Text;

jest.mock("@expo/vector-icons", () => ({
  Ionicons: function MockIonicons(props) {
    const name = props.name ?? "";
    return mockReact.createElement(
      mockText,
      { testID: props.testID },
      `icon:${name}`,
    );
  },
}));

jest.mock(
  "@expo/vector-icons/Ionicons",
  () =>
    function MockIonicons(props) {
      return mockReact.createElement(
        mockText,
        { testID: props.testID },
        `icon:${props.name}`,
      );
    },
);

jest.mock("react-native-safe-area-context", () => ({
  __esModule: true,
  SafeAreaProvider: function SafeAreaProvider({ children }) {
    return mockReact.createElement(mockReact.Fragment, null, children);
  },
  SafeAreaView: function SafeAreaView(props) {
    return mockReact.createElement(mockView, props, props.children);
  },
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

jest.mock("react-native-keyboard-controller", () => {
  const KeyboardToolbar = (props) =>
    mockReact.createElement(
      mockView,
      { role: "toolbar", accessible: true },
      props.children,
    );
  KeyboardToolbar.Prev = function KeyboardToolbarPrev() {
    return null;
  };
  KeyboardToolbar.Next = function KeyboardToolbarNext() {
    return null;
  };
  KeyboardToolbar.Done = function KeyboardToolbarDone(props) {
    return mockReact.createElement(
      mockPressable,
      { onPress: props.onPress },
      mockReact.createElement(mockText, null, props.text ?? "Done"),
    );
  };

  return {
    KeyboardAwareScrollView: function KeyboardAwareScrollView(props) {
      return mockReact.createElement(mockScrollView, props, props.children);
    },
    KeyboardToolbar,
  };
});

jest.mock("react-native-reanimated", () => ({
  __esModule: true,
  default: {
    View: mockView,
  },
  View: mockView,
  useSharedValue: (initial) => ({ value: initial }),
  useAnimatedStyle: (fn) => fn(),
  withSpring: (value) => value,
  withTiming: (value) => value,
  runOnJS: (fn) => fn,
  createAnimatedPropAdapter: () => ({}),
  processColor: (color) => color,
}));
