import type { Preview } from "@storybook/react-native";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#FEFDFB" },
        { name: "dark", value: "#1E1E1E" },
      ],
    },
  },
};

export default preview;
