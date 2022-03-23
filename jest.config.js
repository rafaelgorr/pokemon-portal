module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
  // moduleNameMapper: {},
}
