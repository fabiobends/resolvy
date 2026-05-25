/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((react-native.*|@react-native.*|@react-navigation.*|@expo.*|expo.*)/))",
  ],
  testPathIgnorePatterns: ["node_modules", "\\.claude"],
};
