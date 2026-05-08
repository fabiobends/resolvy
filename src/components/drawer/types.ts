import { ReactNode } from "react";

/** Props for the Drawer component. */
export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
