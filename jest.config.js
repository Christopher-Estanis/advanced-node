/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/tests/(.+)': '<roootDir>/src/$1',
    '@/(.+)': '<roootDir>/src/$1'
  },
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}
