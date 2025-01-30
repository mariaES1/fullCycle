/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  },
  clearMocks: true,
  coverageProvider: "v8",
};

export default config;
