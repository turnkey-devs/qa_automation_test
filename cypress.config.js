const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zkrw8r',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
