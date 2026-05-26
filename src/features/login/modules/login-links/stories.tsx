import type { Meta, StoryObj } from "@storybook/react-native";

import { LoginLinksRow } from "./index";

const meta: Meta<typeof LoginLinksRow> = {
  title: "Login/Links",
  component: LoginLinksRow,
};

export default meta;
type Story = StoryObj<typeof LoginLinksRow>;

export const Default: Story = {
  render: () => <LoginLinksRow />,
};
