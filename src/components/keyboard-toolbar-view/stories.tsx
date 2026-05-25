import type { Meta, StoryObj } from "@storybook/react-native";

import { KeyboardToolbarView } from "./index";

const meta: Meta<typeof KeyboardToolbarView> = {
  title: "KeyboardToolbarView",
  component: KeyboardToolbarView,
};

export default meta;

type Story = StoryObj<typeof KeyboardToolbarView>;

export const Default: Story = {
  args: {
    onDonePress: () => {},
  },
};
