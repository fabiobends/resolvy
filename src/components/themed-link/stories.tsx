import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { ThemedView } from "@/components/themed-view";
import { Spacing, variantColorKeys } from "@/constants/theme";

import { ThemedLink } from "./index";

const styles = StyleSheet.create({
  decoratorPadding: {
    padding: Spacing.medium,
  },
});

const meta: Meta<typeof ThemedLink> = {
  title: "ThemedLink",
  component: ThemedLink,
  argTypes: {
    color: { control: "select", options: variantColorKeys },
    children: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.decoratorPadding}>
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
