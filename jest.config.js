module.exports = {
  modulePaths: [
    'src',
    'test'
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/index.js',
    '!**/index.jsx'
  ],
  coverageDirectory: '__coverage__',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary'
  ]
}
