import type { Preview } from "@storybook/react-native";
import { I18nextProvider } from "react-i18next";

import { Colors } from "@/constants/theme";
import i18n from "@/localization/i18n";
import { ThemeProvider } from "@/hooks/use-theme/provider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </I18nextProvider>
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
