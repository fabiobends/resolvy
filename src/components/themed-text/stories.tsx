import { StyleSheet } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";

import { Spacing } from "@/constants/theme";

import { ThemedText } from "./index";
import { ThemedView } from "@/components/themed-view";

const styles = StyleSheet.create({
  decoratorPadding: {
    padding: Spacing.medium,
  },
  gap: {
    gap: Spacing.small,
  },
});

const meta: Meta<typeof ThemedText> = {
  title: "ThemedText",
  component: ThemedText,
  decorators: [
    (Story) => (
      <ThemedView themeColor="surface" style={styles.decoratorPadding}>
        <Story />
      </ThemedView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemedText>;

export const Display: Story = {
  args: {
    type: "display",
    themeColor: "primary",
    children: "Display Text",
  },
};

export const Title: Story = {
  args: {
    type: "title",
    themeColor: "onSurface",
    children: "Title Text",
  },
};

export const Subtitle: Story = {
  args: {
    type: "subtitle",
    themeColor: "onSurface",
    children: "Subtitle Text",
  },
};

export const Body: Story = {
  args: {
    type: "body",
    themeColor: "onSurface",
    children: "Body text content goes here.",
  },
};

export const BodySmall: Story = {
  args: {
    type: "bodySmall",
    themeColor: "onSurfaceDim",
    children: "Small body text for secondary content.",
  },
};

export const Label: Story = {
  args: {
    type: "label",
    themeColor: "secondary",
    children: "Label Text",
  },
};

export const Caption: Story = {
  args: {
    type: "caption",
    themeColor: "onSurfaceDim",
    children: "Caption text.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <ThemedView themeColor="surface" style={styles.gap}>
      <ThemedText type="display" themeColor="primary">
        Display
      </ThemedText>
      <ThemedText type="title" themeColor="onSurface">
        Title
      </ThemedText>
      <ThemedText type="subtitle" themeColor="onSurface">
        Subtitle
      </ThemedText>
      <ThemedText type="body" themeColor="onSurface">
        Body
      </ThemedText>
      <ThemedText type="bodySmall" themeColor="onSurfaceDim">
        Body Small
      </ThemedText>
      <ThemedText type="label" themeColor="secondary">
        Label
      </ThemedText>
      <ThemedText type="caption" themeColor="onSurfaceDim">
        Caption
      </ThemedText>
    </ThemedView>
  ),
};
