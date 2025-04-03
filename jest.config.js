export default {
  testEnvironment: "node",
  transform: {},
  // Remove extensionsToTreatAsEsm since .js is already handled
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
};