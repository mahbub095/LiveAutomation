import { SettingsPage } from "../pages/settings.page-object";
import { ProductPage } from "../pages/product.page-object";

const settingsPage = new SettingsPage();
const productPage = new ProductPage();

describe('product/edit', () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.loadingTime();
  });

  it('should enable item settings, add product and edit product', () => {
    cy.wait(5000);

    settingsPage.enableItemSetttings();
    productPage.addProduct();
    productPage.editProduct();
  });

  it('should delete product', () => {
    productPage.deleteProduct();
  });
})