/// <reference types="cypress" />

import { SettingsPage } from "../pages/settings.page-object";

const settingsPage = new SettingsPage();

describe.only('settings', () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.loadingTime();
  });

  it.skip('should enable items settings', () => {
    settingsPage.enableItemSetttings();
  });
})