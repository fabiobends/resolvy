import { SafeAreaView } from "react-native-safe-area-context";

import { KeyboardScrollView } from "@/components/keyboard-scroll-view";
import { KeyboardToolbarView } from "@/components/keyboard-toolbar-view";
import { FormModule } from "./modules/form";
import { LoginLinksRow } from "./modules/login-links";
import { BrandBlock } from "./modules/brand-block";
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
  brandBlockProps,
  formProps,
  linksProps,
  socialProps,
}: LoginScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollView
        contentContainerStyle={styles.scrollContent}
        themeColor="surface"
      >
        <BrandBlock {...brandBlockProps} />
        <FormModule {...formProps} />
        <LoginLinksRow {...linksProps} />
        <SocialModule {...socialProps} />
      </KeyboardScrollView>
      <KeyboardToolbarView onDonePress={formProps.submitButton.onPress} />
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
