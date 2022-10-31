import { SettingsPage } from "../pages/settings.page-object";
import { ProductPage } from "../pages/product.page-object";

const settingsPage = new SettingsPage();
const productPage = new ProductPage();

describe('product/add', () => {

  before(() => {
    cy.login();
  })

  beforeEach(() => {
    cy.loadingTime();
  });

  it('should enable item settings and should add product', () => {
    cy.wait(5000);
    
    settingsPage.enableItemSetttings();
    productPage.addProduct();
  });

  it('should check product name', () => {
    productPage.checkNameRequired();
  });

  it('should check duplicate product', () => {
    productPage.checkDuplicateProduct();
  });
})