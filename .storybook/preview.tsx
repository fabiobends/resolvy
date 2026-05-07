import type { Preview } from "@storybook/react-native";

import { Colors } from "@/constants/theme";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: Colors.light.surface },
        { name: "dark", value: Colors.dark.surface },
      ],
    },
  },
};

export default preview;
