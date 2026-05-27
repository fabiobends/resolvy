import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardScrollView } from "@/components/keyboard-scroll-view";
import { KeyboardToolbarView } from "@/components/keyboard-toolbar-view";

import { FormModule } from "./modules/form";
import { BrandBlock } from "./modules/brand-block";
import { styles } from "./styles";
import { SignupScreenProps } from "./types";
import { useSignupScreen } from "./use-screen";

/**
 * Pure UI component for the signup screen.
 * @param props - Component props.
 * @returns React element.
 */
export function SignupScreenView({
  brandBlockProps,
  formProps,
}: SignupScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollView
        contentContainerStyle={styles.scrollContent}
        themeColor="surface"
      >
        <BrandBlock {...brandBlockProps} />
        <FormModule {...formProps} />
      </KeyboardScrollView>
      <KeyboardToolbarView onDonePress={formProps.submitButton.onPress} />
    </SafeAreaView>
  );
}

/**
 * Renders the signup screen with logo and form modules.
 * @returns React element.
 */
export function SignupScreen() {
  const props = useSignupScreen();
  return <SignupScreenView {...props} />;
}
