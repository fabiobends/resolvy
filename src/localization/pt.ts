import { Translations } from "./en";

export const pt = {
  common: {
    email: "E-mail",
    password: "Senha",
    firstName: "Nome",
    lastName: "Sobrenome",
  },
  placeholders: {
    email: "Digite seu e-mail",
    password: "Digite sua senha",
    firstName: "Digite seu nome",
    lastName: "Digite seu sobrenome",
  },
  accessibility: {
    closeDrawer: "Fechar gaveta",
    openDevMenu: "Abrir menu de desenvolvimento",
    switchToLightMode: "Mudar para modo claro",
    switchToDarkMode: "Mudar para modo escuro",
  },
  login: {
    title: "Resolvy",
    subtitle: "Resolva o que importa",
    submit: "Entrar",
    forgotPassword: "Esqueceu a senha?",
    createAccount: "Criar conta",
    socialDivider: "ou continue com",
  },
  signup: {
    title: "Resolvy",
    submit: "Cadastrar",
  },
  forgotPassword: {
    title: "Resolvy",
    submit: "Enviar link de redefinição",
    success: "Link de redefinição enviado. Verifique sua caixa de e-mail.",
    infoBanner:
      "Verifique sua pasta de spam ou lixo eletrônico. O link de redefinição expira após 24 horas e só pode ser usado uma vez.",
  },
  home: {
    welcomeTitle: "Bem-vindo",
    welcomeSubtitle: "Resolvy",
    themeLabel: "Tema: {{theme}}",
  },
  devMenu: {
    title: "Menu de Dev",
    storybook: "Storybook",
    theme: "Tema",
    language: "Idioma",
    languageEnglish: "Inglês",
    languagePortuguese: "Português",
  },
  validation: {
    email: "Digite um endereço de e-mail válido",
    passwordRequired: "Senha é obrigatória",
    passwordMinLength: "Senha deve ter pelo menos 6 caracteres",
    firstNameRequired: "Nome é obrigatório",
    firstNameMinLength: "Nome deve ter pelo menos 2 caracteres",
    lastNameRequired: "Sobrenome é obrigatório",
    lastNameMinLength: "Sobrenome deve ter pelo menos 2 caracteres",
  },
} satisfies Translations;
