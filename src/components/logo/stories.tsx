import type { Meta, StoryObj } from "@storybook/react-native";

import { Logo } from "./index";

const meta: Meta<typeof Logo> = {
  title: "Logo",
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Large: Story = {
  args: {
    size: "large",
    title: "Resolvy",
    subtitle: "Resolve what matters",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    title: "Resolvy",
    subtitle: "Resolve what matters",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    title: "Resolvy",
  },
};

export const IconOnly: Story = {
  args: {
    size: "large",
  },
};
