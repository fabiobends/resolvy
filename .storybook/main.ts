import { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/stories.?(ts|tsx|js|jsx)",
    "../src/features/**/stories.?(ts|tsx|js|jsx)",
  ],
  deviceAddons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-ondevice-backgrounds",
  ],
};

export default config;
