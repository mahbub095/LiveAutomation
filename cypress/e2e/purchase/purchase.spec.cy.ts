
import { PurchasePage } from "../pages/purchase.page-object";

const purchasePage = new PurchasePage();

describe('Scenario for purchase menu', () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.loadingTime();
  });

  it('should add supplier', () => {
    cy.wait(5000);

    purchasePage.addSupplier();
    purchasePage.searchSuplier();
  });

  it('should add product and add purchase item', () => {
    purchasePage.addPurchase();
  });

  it('should edit purchase and paid your purchased item', () => {
    purchasePage.editPurchase();
  });

  it('should add purchase return', () => {
    cy.wait(1000);
    purchasePage.addPurchaseReturn();
  });

  it('should edit purchase return and paid your purchased return item', () => {
    purchasePage.checkEditPurchaseReturn();
  });

  it('should verify purchase report', () => {
    purchasePage.checkPuchaseReport();
    cy.go('back');
  });

  it('should verify balance sheet', () => {
    purchasePage.checkBalanceSheetReport();
  });
})