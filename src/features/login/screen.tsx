import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

import { FormModule } from "./modules/form";
import { LogoModule } from "./modules/logo";
import { SocialModule } from "./modules/social";
import { styles } from "./styles";
import { LoginScreenProps } from "./types";
import { useLoginScreen } from "./use-screen";

/**
 * Pure UI component for the login screen.
 * @param props - Component props.
 * @returns React element.
 */
export function LoginScreenView({
  logoProps,
  formProps,
  socialProps,
}: LoginScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ThemedView themeColor="surface" style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bottomOffset={Spacing.large}
        >
          <LogoModule {...logoProps} />
          <FormModule {...formProps} />
          <SocialModule {...socialProps} />
        </KeyboardAwareScrollView>
      </ThemedView>
      <KeyboardToolbar>
        <KeyboardToolbar.Prev />
        <KeyboardToolbar.Next />
        <KeyboardToolbar.Done onPress={formProps.submitButton.onPress} />
      </KeyboardToolbar>
    </SafeAreaView>
  );
}

/**
 * Renders the login screen with logo, form, and social modules.
 * @returns React element.
 */
export function LoginScreen() {
  const props = useLoginScreen();
  return <LoginScreenView {...props} />;
}
