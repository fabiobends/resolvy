import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { variantColorKeys } from "@/types/colors";

import { ThemedLink } from "./index";

const meta: Meta<typeof ThemedLink> = {
  title: "ThemedLink",
  component: ThemedLink,
  argTypes: {
    color: { control: "select", options: variantColorKeys },
    children: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ThemedView color="surface" style={{ padding: Spacing.medium }}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedLink>;

export const Default: Story = {
  args: {
    title: "Open Storybook",
    color: "primary",
  },
};

export const Disabled: Story = {
  args: {
    title: "Open Storybook",
    color: "primary",
    disabled: true,
  },
};
