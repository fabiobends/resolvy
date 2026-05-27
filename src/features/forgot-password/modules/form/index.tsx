import { useRouter } from "expo-router";
import { Controller } from "react-hook-form";

import { ThemedButton } from "@/components/themed-button";
import { ThemedIcon } from "@/components/themed-icon";
import { ThemedLink } from "@/components/themed-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextField } from "@/components/themed-text-field";
import { ThemedView } from "@/components/themed-view";

import { styles } from "./styles";
import { FormModuleProps } from "./types";

/** Renders email field, submit button, success message, and back link. */
export function FormModule(props: FormModuleProps) {
  const { emailField, submitButton, error, infoBanner } = props;

  const hasSuccess = emailField.successText != null;

  const router = useRouter();

  return (
    <ThemedView themeColor="surface" style={styles.container}>
      <Controller
        control={emailField.control}
        name={emailField.name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <ThemedTextField
            label={emailField.label}
            variantColor="primary"
            placeholder={emailField.placeholder}
            keyboardType={emailField.keyboardType}
            autoCapitalize={emailField.autoCapitalize}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorText={fieldState.error?.message || error}
            successText={emailField.successText}
            returnKeyType="done"
            onSubmitEditing={submitButton.onPress}
          />
        )}
      />

      <ThemedButton
        title={submitButton.title}
        variantColor="primary"
        loading={submitButton.loading}
        onPress={submitButton.onPress}
        disabled={hasSuccess}
      />

      <InfoBanner text={infoBanner} />

      <ThemedView themeColor="surface" style={styles.linksRow}>
        <ThemedLink
          title="Back to log in"
          color="primary"
          onPress={() => router.back()}
        />
      </ThemedView>
    </ThemedView>
  );
}

function InfoBanner({ text }: { text: string }) {
  return (
    <ThemedView themeColor="surfaceBright" style={styles.infoBannerBox}>
      <ThemedIcon
        name="information-circle-outline"
        themeColor="warning"
        size="small"
      />
      <ThemedText
        type="bodySmall"
        themeColor="onSurfaceBright"
        style={styles.infoBannerText}
      >
        {text}
      </ThemedText>
    </ThemedView>
  );
}
