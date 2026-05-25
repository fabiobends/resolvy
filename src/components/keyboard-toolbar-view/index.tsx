import { Platform, View } from "react-native";
import { KeyboardToolbar } from "react-native-keyboard-controller";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardToolbarViewProps } from "./types";

/** Additional downward offset (points) for the toolbar on iOS. */
const IOS_OFFSET = 12;

/**
 * Keyboard toolbar with Prev / Next / Done buttons.
 * Adds a bottom padding on iOS to move the toolbar slightly down.
 * @param props - Component props.
 * @returns React element.
 */
export function KeyboardToolbarView(props: KeyboardToolbarViewProps) {
  const { onDonePress } = props;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        top: insets.bottom + (Platform.OS === "ios" ? IOS_OFFSET : 0),
      }}
    >
      <KeyboardToolbar>
        <KeyboardToolbar.Prev />
        <KeyboardToolbar.Next />
        <KeyboardToolbar.Done onPress={onDonePress} />
      </KeyboardToolbar>
    </View>
  );
}
