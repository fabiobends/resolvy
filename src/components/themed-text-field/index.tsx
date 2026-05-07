import { Text, TextInput, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemedTextFieldProps } from "./types";

/**
 * Renders a text input with a themed label and disabled state.
 * @param props - Component props.
 * @returns React element.
 */
export function ThemedTextField(props: ThemedTextFieldProps) {
  const { label, color, disabled, style, ...rest } = props;
  const theme = useTheme();

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      <Text style={[styles.label, { color: theme[color] }]}>{label}</Text>
      <TextInput
        editable={!disabled}
        placeholderTextColor={theme.onSurfaceDim}
        style={[
          styles.input,
          {
            color: theme.onSurface,
            borderColor: theme[color],
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}
