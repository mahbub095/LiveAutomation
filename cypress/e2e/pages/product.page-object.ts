import { ProductsKeys } from "../../support/keys/products-keys";

let product;
let productEdit;

const productEditBtn = '[data-cy="product-edit-btn"]';
const productDeleteBtn = '[data-cy="product-delete-btn"]';
const productDeleteConfirmBtn = '[data-cy="delete-confirm-btn"]';

before(() => {
  cy.fixture('product/product-add/new-product.json').then((data) => {
    product = data;
  });
  cy.fixture('product/product-add/edit-product.json').then((data) => {
    productEdit = data;
  });
})

export class ProductPage {

  addProduct() {
    cy.get(ProductsKeys.productsLink).click();
    cy.get(ProductsKeys.productAddBtn).click();
    cy.get(ProductsKeys.isActiveToggleBtn).should('be.checked');

    cy.get(ProductsKeys.productNameInput).should('contain', '');
    cy.get(ProductsKeys.productNameRequireMsg).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ProductsKeys.productNameInput).type(product.name);

    cy.get(ProductsKeys.productCodeInput).should('contain', '');
    cy.get(ProductsKeys.productCodeInput).type(product.code);

    // cy.get(ProductsKeys.productUnitDropdown).should('contain', '');
    // cy.get(ProductsKeys.productUnitDropdown).click({ multiple: true });
    // cy.get(ProductsKeys.productUnitDropdown).select('Box');

    cy.get(ProductsKeys.productSerialNoInput).should('contain', '');
    cy.get(ProductsKeys.productSerialNoInput).type(product.serial_no);
    cy.get(ProductsKeys.productSerialNoInput).should('have.value', product.serial_no);

    cy.get(ProductsKeys.productPurchasePriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productPurchasePriceInput).type('  abc');
    cy.get(ProductsKeys.productPurchasePriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productPurchasePriceInput).type(product.purchase_price);
    cy.get(ProductsKeys.productPurchasePriceInput).should('have.value', product.purchase_price);

    cy.get(ProductsKeys.productSalesPriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productSalesPriceInput).type('abc');
    cy.get(ProductsKeys.productSalesPriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productSalesPriceInput).type(product.sales_price);
    cy.get(ProductsKeys.productSalesPriceInput).should('have.value', product.sales_price);

    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productMrpPriceInput).type('***r');
    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', 0);
    cy.get(ProductsKeys.productMrpPriceInput).type('ac6r');
    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', 6);

    cy.get(ProductsKeys.productMrpPriceInput).clear();
    cy.get(ProductsKeys.productMrpPriceInput).type(product.mrp_price);
    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', product.mrp_price);

    cy.get(ProductsKeys.productDiscountInput).should('have.value', 0);
    cy.get(ProductsKeys.productDiscountInput).type('jr@');
    cy.get(ProductsKeys.productDiscountInput).should('have.value', 0);
    cy.get(ProductsKeys.productDiscountInput).type('t1r');
    cy.get(ProductsKeys.productDiscountInput).should('have.value', 1);

    cy.get(ProductsKeys.productDiscountInput).clear();
    cy.get(ProductsKeys.productDiscountInput).type(`{selectAll}${product.discount}`);
    cy.get(ProductsKeys.productDiscountInput).should('have.value', product.discount);

    cy.get(ProductsKeys.productVatInput).should('have.value', 0);
    cy.get(ProductsKeys.productVatInput).type('jr@');
    cy.get(ProductsKeys.productVatInput).should('have.value', 0);
    cy.get(ProductsKeys.productVatInput).type('t1r');
    cy.get(ProductsKeys.productVatInput).should('have.value', 1);

    cy.get(ProductsKeys.productVatInput).clear();
    cy.get(ProductsKeys.productVatInput).type(product.vat);
    cy.get(ProductsKeys.productVatInput).should('have.value', product.vat);

    cy.get(ProductsKeys.productInitialStockInput).should('have.value', 0);
    cy.get(ProductsKeys.productInitialStockInput).type('___%%');
    cy.get(ProductsKeys.productInitialStockInput).should('have.value', 0);
    cy.get(ProductsKeys.productInitialStockInput).type('2rrtt');
    cy.get(ProductsKeys.productInitialStockInput).should('have.value', 2);

    cy.get(ProductsKeys.productInitialStockInput).clear();
    cy.get(ProductsKeys.productInitialStockInput).type(product.initial_stock);
    cy.get(ProductsKeys.productInitialStockInput).should('have.value', product.initial_stock);

    cy.get(ProductsKeys.productBatchNoInput).should('contain', '');
    cy.get(ProductsKeys.productBatchNoInput).type(product.batch_no);
    cy.get(ProductsKeys.productBatchNoInput).should('have.value', product.batch_no);

    cy.get(ProductsKeys.productMfgDate).should('contain', '');
    cy.get(ProductsKeys.productMfgDate).type(product.mfgdate);
    cy.get(ProductsKeys.productMfgDate).should('have.value', product.mfgdate);

    cy.get(ProductsKeys.productExpDate).should('contain', '');
    cy.get(ProductsKeys.productExpDate).type(product.expdate);
    cy.get(ProductsKeys.productExpDate).should('have.value', product.expdate);

    cy.get(ProductsKeys.productDescriptionTextarea).should('contain', '');
    cy.get(ProductsKeys.productDescriptionTextarea).type(product.description);
    cy.get(ProductsKeys.productDescriptionTextarea).should('have.value', product.description);

    cy.get(ProductsKeys.productSaveBtn).should('be.enabled');
    cy.get(ProductsKeys.productSaveNewBtn).should('be.enabled');

    cy.get(ProductsKeys.productSaveBtn).click();
    return this;
  }

  checkNameRequired() {
    cy.get(ProductsKeys.productAddBtn).click();

    cy.get(ProductsKeys.productNameInput).should('contain', '');
    cy.get(ProductsKeys.productNameRequireMsg).should('contain', 'নাম অবশ্যই দিতে হবে');
    return this;
  }

  checkDuplicateProduct() {
    cy.get(ProductsKeys.productNameInput).type(product.name);
    cy.get(ProductsKeys.productNameExistMsg).should('contain', 'ইতিমধ্যে আছে');

    cy.get(ProductsKeys.productCodeInput).type(product.code);
    cy.get(ProductsKeys.productCodeExistMsg).should('contain', 'ইতিমধ্যে আছে');

    cy.get(ProductsKeys.productSaveBtn).should('be.disabled');
    cy.get(ProductsKeys.productSaveNewBtn).should('be.disabled');

    return this;
  }

  editProduct() {
    cy.get(productEditBtn).click();
    cy.get(ProductsKeys.isActiveToggleBtn).should('be.checked');

    cy.get(ProductsKeys.productNameInput).should('have.value', product.name);
    cy.get(ProductsKeys.productNameInput).clear();
    cy.get(ProductsKeys.productNameRequireMsg).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ProductsKeys.productNameInput).type(productEdit.name);

    cy.get(ProductsKeys.productCodeInput).should('have.value', product.code);
    cy.get(ProductsKeys.productCodeInput).clear();
    cy.get(ProductsKeys.productCodeInput).type(productEdit.code);

    // cy.get(ProductsKeys.productUnitDropdown).should('have.value', 3);
    // cy.get(ProductsKeys.productUnitDropdown).select('Cans').should('have.value', '5');

    cy.get(ProductsKeys.productSerialNoInput).should('have.value', product.serial_no);
    cy.get(ProductsKeys.productSerialNoInput).clear();
    cy.get(ProductsKeys.productSerialNoInput).type(productEdit.serial_no);

    cy.get(ProductsKeys.productPurchasePriceInput).should('have.value', product.purchase_price);
    cy.get(ProductsKeys.productPurchasePriceInput).clear();
    cy.get(ProductsKeys.productPurchasePriceInput).type('  abc');
    cy.get(ProductsKeys.productPurchasePriceInput).should('have.value', '');
    cy.get(ProductsKeys.productPurchasePriceInput).type(productEdit.purchase_price);

    cy.get(ProductsKeys.productSalesPriceInput).should('have.value', product.sales_price);
    cy.get(ProductsKeys.productSalesPriceInput).clear();
    cy.get(ProductsKeys.productSalesPriceInput).type('abc');
    cy.get(ProductsKeys.productSalesPriceInput).should('have.value', '');
    cy.get(ProductsKeys.productSalesPriceInput).type(productEdit.sales_price);

    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', product.mrp_price);
    cy.get(ProductsKeys.productMrpPriceInput).clear();
    cy.get(ProductsKeys.productMrpPriceInput).type('***r');
    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', '');
    cy.get(ProductsKeys.productMrpPriceInput).type('ac6r');
    cy.get(ProductsKeys.productMrpPriceInput).should('have.value', 6);
    cy.get(ProductsKeys.productMrpPriceInput).clear();
    cy.get(ProductsKeys.productMrpPriceInput).type(productEdit.mrp_price);

    cy.get(ProductsKeys.productDiscountInput).should('have.value', 0);
    cy.get(ProductsKeys.productDiscountInput).clear();
    cy.get(ProductsKeys.productDiscountInput).type('jr@');
    cy.get(ProductsKeys.productDiscountInput).should('have.value', '');
    cy.get(ProductsKeys.productDiscountInput).type('t1r');
    cy.get(ProductsKeys.productDiscountInput).should('have.value', 1);
    cy.get(ProductsKeys.productDiscountInput).clear();
    cy.get(ProductsKeys.productDiscountInput).type(`{selectAll}${productEdit.discount}`);

    cy.get(ProductsKeys.productVatInput).should('have.value', product.vat);
    cy.get(ProductsKeys.productVatInput).clear();
    cy.get(ProductsKeys.productVatInput).type('jr@');
    cy.get(ProductsKeys.productVatInput).should('have.value', '');
    cy.get(ProductsKeys.productVatInput).type('t1r');
    cy.get(ProductsKeys.productVatInput).should('have.value', 1);
    cy.get(ProductsKeys.productVatInput).clear();
    cy.get(ProductsKeys.productVatInput).type(productEdit.vat);

    cy.get(ProductsKeys.productInitialStockInput).should('be.disabled');

    cy.get(ProductsKeys.productBatchNoInput).should('have.value', product.batch_no);
    cy.get(ProductsKeys.productBatchNoInput).clear();
    cy.get(ProductsKeys.productBatchNoInput).type(productEdit.batch_no);

    cy.get(ProductsKeys.productMfgDate).should('have.value', product.mfgdate);

    cy.get(ProductsKeys.productExpDate).should('have.value', product.expdate);

    cy.get(ProductsKeys.productDescriptionTextarea).should('have.value', product.description);
    cy.get(ProductsKeys.productDescriptionTextarea).clear();
    cy.get(ProductsKeys.productDescriptionTextarea).type(productEdit.description);

    cy.get(ProductsKeys.productSaveBtn).should('be.enabled');

    cy.get(ProductsKeys.productSaveBtn).click();
    cy.get(ProductsKeys.toastMessage).should('contain', 'পণ্য সেভ হয়েছে');
    return this;
  }

  deleteProduct() {
    cy.url().should('include', '/product');
    cy.get(productDeleteBtn).click();
    cy.get(productDeleteConfirmBtn).click();
    return this;
  }
}