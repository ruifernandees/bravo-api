module.exports = {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testMatch: [
    '**/__test__/**/*.test.js?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  transform: { '^.+\\.[jt]sx?$': '@sucrase/jest-plugin' },
  verbose: false,
};
