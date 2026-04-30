/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((react-native.*|@react-native.*|@react-navigation.*|@expo.*|expo.*)/))",
  ],
};
