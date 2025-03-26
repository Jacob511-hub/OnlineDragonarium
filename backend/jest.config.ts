import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',  // Add this line
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Add this line for TypeScript files
  },
};

export default config;