import { SalesPage } from "../pages/sales.page-object";
import { SettingsPage } from "../pages/settings.page-object";

const salesPage = new SalesPage();
const settingsPage = new SettingsPage();

describe('Scenario for sales menu', () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.loadingTime();
  });

  it('should enable discount and disable preview invoice then add customer add product add sales and edit sales', () => {
    cy.wait(5000);

    settingsPage.enableTransactionSettings();
    salesPage.addCustomer();
    salesPage.searchCustomer();
    salesPage.addProducts();
    salesPage.addSales();
    salesPage.editSales();
  });

  it('should check add sales return', () => {
    cy.wait(1000);
    salesPage.addSalesReturn();
  });

  it('should check edit sales return', () => {
    salesPage.editSalesReturn();
  });

  it('should verify balance sheet', () => {
    salesPage.checkBalanceSheetReport();
  });
});