import type { Meta, StoryObj } from "@storybook/react-native";

import { LogoModule } from "./index";

const meta: Meta<typeof LogoModule> = {
  title: "Signup/Logo",
  component: LogoModule,
};

export default meta;
type Story = StoryObj<typeof LogoModule>;

export const WithSubtitle: Story = {
  args: {
    title: "Resolvy",
    subtitle: "Create your account",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Resolvy",
  },
};
