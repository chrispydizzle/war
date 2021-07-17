require('dotenv').config()

const { pathsToModuleNameMapper } = require('ts-jest/utils')

const { compilerOptions } = require('./tsconfig')
const tsJest = require('ts-jest/jest-preset')

module.exports = {
  // You can use multiple presets by merging them (they are just objects)
  ...tsJest,
  testEnvironment: 'node',
  modulePaths: ['.'],
  moduleNameMapper: {
    // tsconfig paths
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^lodash-es$': 'lodash'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}
