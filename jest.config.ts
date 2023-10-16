process.env.TZ = "GMT";

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(tsx|ts|js)?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },

  // Setup Enzyme
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupEnzyme.ts'],

  // collectCoverageFrom: ['<rootDir>/**/*.tsx', '<rootDir>/**/*.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**/*.tsx', '<rootDir>/**/*.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/components',
    '<rootDir>/src/App.tsx',
    '<rootDir>/src/apis',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export {};