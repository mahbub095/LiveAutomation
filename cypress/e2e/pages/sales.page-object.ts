import { SalesKeys } from "../../support/keys/sales-keys";
import { ModalPartiesKeys } from "../../support/keys/modal-parties-keys";
import { ModalProductsKeys } from "../../support/keys/modal-products-keys";

let sales;

before(() => {
  cy.fixture('sales/sales.json').then((data) => {
    sales = data;
  });
})

export class SalesPage {

  addCustomer() {
    cy.get(SalesKeys.salesLink).click({ force: true });
    cy.get(SalesKeys.newSalesLink).click({ force: true });

    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.newPartyBtn).click();

    cy.get(ModalPartiesKeys.partyNameModalInput).should('contain', '');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ModalPartiesKeys.partyNameModalInput).type(sales.party_name);
    cy.get(ModalPartiesKeys.partyNameModalInput).should('have.value', sales.party_name);

    cy.get(ModalPartiesKeys.partyPhoneModalInput).type('Name');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).should('have.value', '');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).type('123456');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'ফোন নম্বরটি সঠিক নয়');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).clear();
    cy.get(ModalPartiesKeys.partyPhoneModalInput).type(sales.party_phone);
    cy.get(ModalPartiesKeys.partyPhoneModalInput).should('have.value', sales.party_phone);

    cy.get(ModalPartiesKeys.partyEmailModalInput).should('contain', '');
    cy.get(ModalPartiesKeys.partyEmailModalInput).type('testemail');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'ইমেইল সঠিক নয়');
    cy.get(ModalPartiesKeys.partyEmailModalInput).clear();
    cy.get(ModalPartiesKeys.partyEmailModalInput).type(sales.party_email);
    cy.get(ModalPartiesKeys.partyEmailModalInput).should('have.value', sales.party_email);

    cy.get(ModalPartiesKeys.partyBalanceModalInput).should('have.value', 0);
    cy.get(ModalPartiesKeys.partyBalanceModalInput).type('abc');
    cy.get(ModalPartiesKeys.partyBalanceModalInput).type(sales.party_balance);
    cy.get(ModalPartiesKeys.partyBalanceModalInput).should('have.value', sales.party_balance);

    cy.get(ModalPartiesKeys.partyAddressModalInput).type(sales.party_address);
    cy.get(ModalPartiesKeys.partyAddressModalInput).should('have.value', sales.party_address);

    cy.get(ModalPartiesKeys.partyModalSaveBtn).should('be.enabled');
    cy.get(ModalPartiesKeys.partyModalSaveBtn).click();
    cy.get(ModalPartiesKeys.toastMessage).should('contain', 'Party saved');
  }

  searchCustomer() {
    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.partyInput).type(sales.party_name);
    cy.get(ModalPartiesKeys.wordbreak).click();
  }

  addProducts() {
    cy.get(ModalProductsKeys.productInput).click();
    cy.get(ModalProductsKeys.productAddBtn).click();

    cy.get(ModalProductsKeys.productModalNameInput).should('contain', '');
    cy.get(ModalProductsKeys.productModalNameRequireMsg).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ModalProductsKeys.productModalNameInput).type(sales.product_name);
    cy.get(ModalProductsKeys.productModalNameInput).should('have.value', sales.product_name);
    
    cy.get(ModalProductsKeys.productModalCodeInput).should('contain', '');
    cy.get(ModalProductsKeys.productModalCodeInput).type(sales.product_code);
    cy.get(ModalProductsKeys.productModalCodeInput).should('have.value', sales.product_code);

    cy.get(ModalProductsKeys.productModalPurchasePriceInput).type(sales.product_purchase_price);
    cy.get(ModalProductsKeys.productModalPurchasePriceInput).should('have.value', sales.product_purchase_price);

    cy.get(ModalProductsKeys.productModalSalesPriceInput).type(sales.product_sales_price);
    cy.get(ModalProductsKeys.productModalSalesPriceInput).should('have.value', sales.product_sales_price);

    cy.get(ModalProductsKeys.productModalInitialStockInput).type(sales.product_initial_stock);
    cy.get(ModalProductsKeys.productModalInitialStockInput).should('have.value', sales.product_initial_stock);

    cy.get(ModalProductsKeys.productSaveBtn).should('be.enabled');
    cy.get(ModalProductsKeys.productSaveBtn).click();
  }

  addSales() {
    cy.get(SalesKeys.salesQuantity).should('have.value', 1);
    cy.get(SalesKeys.salesQuantity).clear();

    cy.get(SalesKeys.salesQuantity).type('2');
    cy.get(SalesKeys.salesQuantity).should('have.value', 2);

    cy.get(SalesKeys.salesQuantity).clear();
    
    cy.get(SalesKeys.salesQuantity).type('{selectAll}1.5');
    cy.get(SalesKeys.salesQuantity).should('have.value', 1.5);
    
    cy.get(SalesKeys.discount).type('5');
    cy.get(SalesKeys.discount).should('have.value', 5);

    cy.get(SalesKeys.discount).clear();

    cy.get(SalesKeys.discount).type('{selectAll}5.6',);
    cy.get(SalesKeys.discount).should('have.value', '5.6');
   
    cy.get(SalesKeys.salesSaveBtn).click();
  }

  editSales() {
    cy.get(SalesKeys.salesEditBtn).click({ force: true });
    cy.get(SalesKeys.salesReturnQuantity).clear;
    cy.get(SalesKeys.salesReturnQuantity).type('4');
    cy.get(SalesKeys.salesReturnQuantity).should('have.value', 4);

    cy.get(SalesKeys.paidAmount).should('contain', '');
    cy.get(SalesKeys.paidAmount).type('390');
    cy.get(SalesKeys.paidAmount).should('have.value', 390);

    cy.get(SalesKeys.salesEditSaveBtn).click();
  }

  addSalesReturn() {
    cy.get(SalesKeys.salesLink).click();
    cy.get(SalesKeys.salesReturnLink).click();
    cy.get(SalesKeys.newSalesReturnBtn).click();

    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.partyInput).type(sales.party_name);
    cy.get(ModalPartiesKeys.wordbreak).click();

    cy.get(ModalProductsKeys.productInput).click();
    cy.get(ModalPartiesKeys.wordbreak).click();

    cy.get(SalesKeys.salesReturnSaveBtn).click();
  }

  editSalesReturn() {
    cy.get(SalesKeys.SalesReturnEditBtn).click({ force: true });
    cy.get(SalesKeys.salesReturnQuantity).clear();
    cy.get(SalesKeys.salesReturnQuantity).type('2');
    cy.get(SalesKeys.salesReturnQuantity).should('have.value', 2);

    cy.get(SalesKeys.salesReturnAmount).type(sales.sales_return_amount);;
    cy.get(SalesKeys.salesReturnAmount).should('have.value', sales.sales_return_amount);

    cy.contains('সেভ করুন').click({ force: true });
  }

  checkBalanceSheetReport() {
    cy.wait(1000);
    cy.get(SalesKeys.reportsLink).click({ force: true });
    cy.get(SalesKeys.balanceSheetReportLink).click();

    //Total Asset
    cy.get('[data-cy="total-assets"]').then(function ($assets) {
      const totalAssets = $assets
        .toArray()
        .map(function (el) {
          return el.innerText
        })

      const assets = Cypress._.sum(totalAssets)
      cy.contains(assets);

      // Total Liabilities
      cy.get('[data-cy="total-liabilities"]').then(function ($liabilities) {
        const totalLiabilities = $liabilities
          .toArray()
          .map(function (el) {
            return el.innerText
          })

        const liabilities = Cypress._.sum(totalLiabilities)
        cy.contains(liabilities);

        if (assets == liabilities) {
          cy.log('Assets and liabilities are same');
          expect(assets).to.contains('2,341.6');
        } else {
          cy.log('Assets and liabilities are not same ,its should be fixed');
          expect(assets).to.contains(liabilities);
        }
      });
    });
  }
}