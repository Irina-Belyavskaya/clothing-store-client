module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx|js|jsx)?$': ['ts-jest']
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };