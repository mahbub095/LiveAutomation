import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFolder: 'cypress/support',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    baseUrl: 'http://localhost:5200',
    retries: {
      runMode: 5,
      openMode: 5,
    },
    video: false,
    screenshotOnRunFailure: true,
  },
  video: false,
  screenshotOnRunFailure: true,
});
