module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(react-router|@remix-run))'
  ],
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/index.ts',
    '!**/index.tsx',
    '!**/index.js',
    '!**/index.jsx'
  ],
  coverageDirectory: '__coverage__',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary'
  ]
}
