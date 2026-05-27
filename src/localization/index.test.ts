import { i18n } from "./index";

describe("localization", () => {
  afterEach(() => {
    i18n.changeLanguage("en");
  });

  it("defaults to english", () => {
    expect(i18n.language).toBe("en");
    expect(i18n.t("login.title")).toBe("Resolvy");
    expect(i18n.t("login.submit")).toBe("Log in");
    expect(i18n.t("common.email")).toBe("Email");
    expect(i18n.t("devMenu.title")).toBe("Dev Menu");
  });

  it("has portuguese translations", () => {
    i18n.changeLanguage("pt");
    expect(i18n.t("login.submit")).toBe("Entrar");
    expect(i18n.t("home.welcomeTitle")).toBe("Bem-vindo");
    expect(i18n.t("devMenu.title")).toBe("Menu de Dev");
  });

  it("supports interpolation", () => {
    expect(i18n.t("home.themeLabel", { theme: "dark" })).toBe("Theme: dark");
  });
});
