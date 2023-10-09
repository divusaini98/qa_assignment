const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //for html reports
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); //for html reports
    },
    specPattern: 'cypress/integration/e2e/*.js'
  },
  env: {
    url: 'http://localhost:4200/'
  },
});
