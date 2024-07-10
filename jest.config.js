module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'enums/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'services/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
    'interfaces/**/*.{ts,tsx}',
    'constants/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/next/**',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/testSetup.js'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    // General
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/test/__mocks__/file-mock.js',

    // Alias
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/enums(.*)$': '<rootDir>/enums$1',
    '^@/hooks(.*)$': '<rootDir>/hooks$1',
    '^@/services(.*)$': '<rootDir>/services$1',
    '^@/utils(.*)$': '<rootDir>/utils$1',
    '^@/interfaces(.*)$': '<rootDir>/interfaces$1',
    '^@/constants(.*)$': '<rootDir>/constants$1',
    '^@/app(.*)$': '<rootDir>/app$1',
  },
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 71,
      branches: 50,
      functions: 64,
      lines: 71,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/styles',
    '<rootDir>/.next',
  ],
}
