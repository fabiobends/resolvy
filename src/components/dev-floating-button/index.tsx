import { useCallback, useRef } from "react";
import { Animated, Dimensions, PanResponder, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { ThemedIcon } from "@/components/themed-icon";
import { useTheme } from "@/hooks/use-theme";

import {
  EDGE_MARGIN,
  PAN_ACTIVATION_THRESHOLD,
  SNAP_FRICTION,
} from "./constants";
import { BUTTON_SIZE, styles } from "./styles";
import { DevFloatingButtonProps } from "./types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Renders a draggable circular floating dev button.
 * @param props - Component props.
 * @returns React element.
 */
export function DevFloatingButton({ onPress }: DevFloatingButtonProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const initialX = screenWidth - insets.right - BUTTON_SIZE - EDGE_MARGIN * 2;
  const initialY = screenHeight - insets.bottom - BUTTON_SIZE - EDGE_MARGIN * 2;

  const currentPos = useRef({ x: initialX, y: initialY }).current;
  const dragOffset = useRef({ x: 0, y: 0 }).current;
  const anim = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY }),
  ).current;

  const updatePosition = useCallback(
    (dx: number, dy: number) => {
      anim.setValue({
        x: currentPos.x + dx,
        y: currentPos.y + dy,
      });
    },
    [anim, currentPos],
  );

  const snapToBounds = useCallback(() => {
    const minX = insets.left + EDGE_MARGIN;
    const maxX = screenWidth - insets.right - BUTTON_SIZE - EDGE_MARGIN;
    const minY = insets.top + EDGE_MARGIN;
    const maxY = screenHeight - insets.bottom - BUTTON_SIZE - EDGE_MARGIN;

    currentPos.x = clamp(currentPos.x + dragOffset.x, minX, maxX);
    currentPos.y = clamp(currentPos.y + dragOffset.y, minY, maxY);

    Animated.spring(anim, {
      toValue: { x: currentPos.x, y: currentPos.y },
      useNativeDriver: false,
      friction: SNAP_FRICTION,
    }).start();
  }, [anim, currentPos, dragOffset, insets]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > PAN_ACTIVATION_THRESHOLD ||
        Math.abs(gestureState.dy) > PAN_ACTIVATION_THRESHOLD,
      onPanResponderGrant: () => {
        dragOffset.x = 0;
        dragOffset.y = 0;
      },
      onPanResponderMove: (_, gestureState) => {
        dragOffset.x = gestureState.dx;
        dragOffset.y = gestureState.dy;
        updatePosition(gestureState.dx, gestureState.dy);
      },
      onPanResponderRelease: () => {
        snapToBounds();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.error,
          transform: anim.getTranslateTransform(),
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("accessibility.openDevMenu")}
        onPress={onPress}
        style={styles.pressable}
      >
        <ThemedIcon name="bug" themeColor="onError" size="medium" />
      </Pressable>
    </Animated.View>
  );
}
