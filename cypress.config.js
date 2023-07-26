const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'zkrw8r',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  videoCompression: 15,
});
