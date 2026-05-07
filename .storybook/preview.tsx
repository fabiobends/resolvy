import type { Preview } from "@storybook/react-native";

import { Colors } from "@/constants/theme";
import { ThemeProvider } from "@/hooks/use-theme/provider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
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
