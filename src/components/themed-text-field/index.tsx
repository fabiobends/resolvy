import { forwardRef, useState } from "react";
import { Pressable, TextInput } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { ThemedIcon } from "@/components/themed-icon";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

import { styles } from "./styles";
import { ThemedTextFieldProps } from "./types";

/**
 * Renders a text input with a themed label and disabled state.
 * variantColor selects a semantic action variant (primary, secondary, success, warning, error).
 * This is different from themeColor which is any palette token (primary, onPrimary, surface, etc.).
 * @param props - Component props.
 * @param ref - Forwarded ref to the inner TextInput.
 * @returns React element.
 */
export const ThemedTextField = forwardRef<TextInput, ThemedTextFieldProps>(
  (props, ref) => {
    const {
      label,
      variantColor,
      disabled,
      errorText,
      helperText,
      secureTextEntry,
      style,
      ...rest
    } = props;
    const theme = useTheme();
    const hasError = !!errorText;
    const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);
    const showToggle = secureTextEntry != null;

    return (
      <ThemedView style={[styles.container, disabled && styles.disabled]}>
        <ThemedText type="label" themeColor={hasError ? "error" : variantColor}>
          {label}
        </ThemedText>
        <ThemedView style={styles.inputWrapper}>
          <TextInput
            ref={ref}
            editable={!disabled}
            placeholderTextColor={theme.onSurfaceDim}
            secureTextEntry={isSecure}
            style={[
              styles.input,
              showToggle && styles.inputWithIcon,
              {
                color: theme.onSurface,
                borderColor: hasError ? theme.error : theme[variantColor],
              },
              style,
            ]}
            {...rest}
          />
          {showToggle && (
            <Pressable
              onPress={() => setIsSecure((prev) => !prev)}
              style={styles.icon}
            >
              <ThemedIcon
                name={isSecure ? "eye-off-outline" : "eye-outline"}
                themeColor="onSurfaceDim"
                size="small"
              />
            </Pressable>
          )}
        </ThemedView>
        <ThemedText
          type="label"
          themeColor={hasError ? "error" : "onSurfaceDim"}
        >
          {errorText ?? helperText ?? " "}
        </ThemedText>
      </ThemedView>
    );
  },
);

ThemedTextField.displayName = "ThemedTextField";
