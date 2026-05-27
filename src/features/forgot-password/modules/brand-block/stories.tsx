import type { Meta, StoryObj } from "@storybook/react-native";

import { BrandBlock } from "./index";

const meta: Meta<typeof BrandBlock> = {
  title: "ForgotPassword/BrandBlock",
  component: BrandBlock,
};

export default meta;
type Story = StoryObj<typeof BrandBlock>;

export const Default: Story = {
  args: {
    title: "Resolvy",
  },
};
