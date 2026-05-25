import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedIcon } from "@/components/themed-icon";
import { ThemedText } from "@/components/themed-text";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

import {
  HIDE_DURATION_MS,
  SHOW_DURATION_MS,
  SLIDE_DISTANCE,
} from "./constants";
import { styles } from "./styles";
import { DrawerProps } from "./types";

/**
 * Renders a slide-up animated drawer with title and close button.
 * @param props - Component props.
 * @returns React element.
 */
export function Drawer({ visible, onClose, title, children }: DrawerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(SLIDE_DISTANCE);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: SHOW_DURATION_MS });
      translateY.value = withTiming(0, { duration: SHOW_DURATION_MS });
    } else {
      opacity.value = withTiming(0, { duration: HIDE_DURATION_MS });
      translateY.value = withTiming(SLIDE_DISTANCE, {
        duration: HIDE_DURATION_MS,
      });
    }
  }, [visible, opacity, translateY]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      <Animated.View
        style={[
          styles.backdrop,
          { backgroundColor: theme.overlay },
          backdropStyle,
        ]}
        pointerEvents={visible ? "auto" : "none"}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close drawer"
          style={styles.backdropPressable}
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          {
            backgroundColor: theme.surface,
            paddingBottom: insets.bottom + Spacing.medium,
          },
          panelStyle,
        ]}
      >
        <Animated.View style={styles.header}>
          <ThemedText type="title" themeColor="onSurface">
            {title}
          </ThemedText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
            onPress={onClose}
            style={styles.closeButton}
          >
            <ThemedIcon name="close" themeColor="primary" size="medium" />
          </Pressable>
        </Animated.View>

        {children}
      </Animated.View>
    </>
  );
}
