export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
  extensionsToTreatAsEsm: ['.jsx'],
  testMatch: ['**/__tests__/**/*.jsx', '**/?(*.)+(spec|test).jsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$)'
  ]
};
