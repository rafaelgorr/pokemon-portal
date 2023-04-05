module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '\\.[jt]sx?$': ['babel-jest', { configFile: './.babelrc.jest.json' }],
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@pokemon-portal/src/(.*)$': '<rootDir>/src/$1',
    '^@pokemon-portal/config$': '<rootDir>/src/config',
    '@mui/material': require.resolve('@mui/material'),
  },
  moduleDirectories: ['node_modules', __dirname],
}
