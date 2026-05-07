/** Props for the ThemeSwitcher module component. */
export interface ThemeSwitcherProps {
  activeTheme: "light" | "dark";
  onToggle: () => void;
}
