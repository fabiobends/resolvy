import type { Meta, StoryObj } from "@storybook/react-native";

import { LogoModule } from "./index";

const meta: Meta<typeof LogoModule> = {
  title: "Login/Logo",
  component: LogoModule,
};

export default meta;
type Story = StoryObj<typeof LogoModule>;

export const Default: Story = {
  args: {
    title: "Resolvy",
    subtitle: "Resolve what matters",
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: "Resolvy",
  },
};
