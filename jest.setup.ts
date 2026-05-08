// @ts-nocheck
// Global test setup

jest.mock("react-native-reanimated", () => {
  const View = require("react-native/Libraries/Components/View/View");
  const { useEffect, useRef } = require("react");

  return {
    __esModule: true,
    default: {
      View: View.default ?? View,
    },
    View: View.default ?? View,
    useSharedValue: (initial) => ({ value: initial }),
    useAnimatedStyle: (fn) => {
      const [style, setStyle] = require("react").useState(fn);
      useEffect(() => {
        setStyle(fn());
      }, []);
      return style;
    },
    withSpring: (value) => value,
    withTiming: (value, _config) => value,
    runOnJS: (fn) => fn,
    createAnimatedPropAdapter: () => ({}),
    processColor: (color) => color,
  };
});
