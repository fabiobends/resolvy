// @ts-nocheck
// Global test setup

import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const mockReact = React;
const mockView = View;
const mockScrollView = ScrollView;
const mockPressable = Pressable;
const mockText = Text;

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  },
}));

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

jest.mock("react-i18next", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { en } = require("./src/localization/en");

  const flatten = (obj, prefix = "", res = {}) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          flatten(obj[key], path, res);
        } else {
          res[path] = obj[key];
        }
      }
    }
    return res;
  };
  const flat = flatten(en);

  return {
    useTranslation: () => ({
      t: (key, options) => {
        let val = flat[key] ?? key;
        if (typeof val === "string" && options) {
          Object.entries(options).forEach(([k, v]) => {
            val = val.replace(new RegExp(`{{${k}}}`, "g"), String(v));
          });
        }
        return val;
      },
      i18n: { changeLanguage: jest.fn(), language: "en" },
    }),
    I18nextProvider: function I18nextProvider({ children }) {
      return mockReact.createElement(mockReact.Fragment, null, children);
    },
    initReactI18next: { type: "3rdParty", init: jest.fn() },
  };
});

// Native auth modules — stubbed so src/services/auth can be imported in tests.
jest.mock("@react-native-firebase/app", () => ({
  __esModule: true,
  default: {},
}));

jest.mock("@react-native-firebase/auth", () => {
  const makeUser = () => ({
    uid: "mock-uid",
    email: "mock@example.com",
    displayName: null,
    photoURL: null,
    providerData: [{ providerId: "password" }],
    updateProfile: jest.fn(),
    updateEmail: jest.fn(),
    reload: jest.fn(),
  });
  const authInstance = {
    signInWithEmailAndPassword: jest.fn(async () => ({ user: makeUser() })),
    createUserWithEmailAndPassword: jest.fn(async () => ({ user: makeUser() })),
    sendPasswordResetEmail: jest.fn(async () => {}),
    signOut: jest.fn(async () => {}),
    onAuthStateChanged: jest.fn((cb: (u: unknown) => void) => {
      cb(null);
      return () => {};
    }),
    signInWithCredential: jest.fn(async () => ({ user: makeUser() })),
    currentUser: null,
  };
  const authFn = () => authInstance;
  (authFn as { GoogleAuthProvider: unknown }).GoogleAuthProvider = {
    credential: jest.fn(() => ({})),
  };
  (authFn as { AppleAuthProvider: unknown }).AppleAuthProvider = {
    credential: jest.fn(() => ({})),
  };
  return { __esModule: true, default: authFn };
});

jest.mock("@react-native-google-signin/google-signin", () => ({
  __esModule: true,
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn(async () => ({ idToken: "mock-id-token" })),
    getTokens: jest.fn(async () => ({
      idToken: "mock-id-token",
      accessToken: "mock-access-token",
    })),
  },
}));

jest.mock("@invertase/react-native-apple-authentication", () => ({
  __esModule: true,
  appleAuth: {
    Operation: { LOGIN: "LOGIN" },
    Scope: { FULL_NAME: "FULL_NAME", EMAIL: "EMAIL" },
    performRequest: jest.fn(async () => ({
      identityToken: "mock-identity-token",
      nonce: "mock-nonce",
      fullName: null,
      email: null,
    })),
  },
}));
