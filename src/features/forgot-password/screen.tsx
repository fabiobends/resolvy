import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardScrollView } from "@/components/keyboard-scroll-view";
import { KeyboardToolbarView } from "@/components/keyboard-toolbar-view";

import { FormModule } from "./modules/form";
import { LogoModule } from "./modules/logo";
import { styles } from "./styles";
import { ForgotPasswordScreenProps } from "./types";
import { useForgotPasswordScreen } from "./use-screen";

/**
 * Pure UI component for the forgot-password screen.
 * @param props - Component props.
 * @returns React element.
 */
export function ForgotPasswordScreenView({
  logoProps,
  formProps,
}: ForgotPasswordScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollView
        contentContainerStyle={styles.scrollContent}
        themeColor="surface"
      >
        <LogoModule {...logoProps} />
        <FormModule {...formProps} />
      </KeyboardScrollView>
      <KeyboardToolbarView onDonePress={formProps.submitButton.onPress} />
    </SafeAreaView>
  );
}

/**
 * Renders the forgot-password screen with logo and form modules.
 * @returns React element.
 */
export function ForgotPasswordScreen() {
  const props = useForgotPasswordScreen();
  return <ForgotPasswordScreenView {...props} />;
}
