import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-fixed-jsdom",

  transform: {
    "^.+\\.[jt]sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
        module: {
          type: "es6",
        },
      },
    ],
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],

  testMatch: [
    "<rootDir>/src/**/*.test.ts",
    "<rootDir>/src/**/*.test.tsx",
  ],
};

export default config;