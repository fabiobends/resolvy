import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedText } from "@/components/themed-text";

import { KeyboardScrollView } from "./index";

const meta: Meta<typeof KeyboardScrollView> = {
  title: "KeyboardScrollView",
  component: KeyboardScrollView,
};

export default meta;

type Story = StoryObj<typeof KeyboardScrollView>;

export const Default: Story = {
  args: {
    themeColor: "surface",
  },
  render: (args) => (
    <KeyboardScrollView {...args}>
      <ThemedText type="body" themeColor="onSurface">
        Scrollable content with keyboard awareness
      </ThemedText>
    </KeyboardScrollView>
  ),
};
