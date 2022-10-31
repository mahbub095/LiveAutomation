import { PurchaseKeys } from "../../support/keys/purchase-keys";
import { ModalPartiesKeys } from "../../support/keys/modal-parties-keys";
import { ModalProductsKeys } from "../../support/keys/modal-products-keys";

let purchase;

before(() => {
  cy.fixture('purchase/purchase.json').then((data) => {
    purchase = data;
  });
})

export class PurchasePage {

  addSupplier() {
    cy.get(PurchaseKeys.purchaseLink).click({ force: true });
    cy.get(PurchaseKeys.newPurchaseLink).click();

    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.newPartyBtn).click();
    cy.get(ModalPartiesKeys.toggleBtn).click({ force: true });

    cy.get(ModalPartiesKeys.partyNameModalInput).should('contain', '');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ModalPartiesKeys.partyNameModalInput).type(purchase.party_name);
    cy.get(ModalPartiesKeys.partyNameModalInput).should('have.value', purchase.party_name);

    cy.get(ModalPartiesKeys.partyPhoneModalInput).type('Name');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).should('have.value', '');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).type('123456');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'ফোন নম্বরটি সঠিক নয়');
    cy.get(ModalPartiesKeys.partyPhoneModalInput).clear();
    cy.get(ModalPartiesKeys.partyPhoneModalInput).type(purchase.party_phone);
    cy.get(ModalPartiesKeys.partyPhoneModalInput).should('have.value', purchase.party_phone);

    cy.get(ModalPartiesKeys.partyEmailModalInput).should('contain', '');
    cy.get(ModalPartiesKeys.partyEmailModalInput).type('testemail');
    cy.get(ModalPartiesKeys.helpBlock).should('contain', 'ইমেইল সঠিক নয়');
    cy.get(ModalPartiesKeys.partyEmailModalInput).clear();
    cy.get(ModalPartiesKeys.partyEmailModalInput).type(purchase.party_email);
    cy.get(ModalPartiesKeys.partyEmailModalInput).should('have.value', purchase.party_email);

    cy.get(ModalPartiesKeys.partyBalanceModalInput).should('have.value', 0);
    cy.get(ModalPartiesKeys.partyBalanceModalInput).type('abc');
    cy.get(ModalPartiesKeys.partyBalanceModalInput).type(purchase.party_balance);
    cy.get(ModalPartiesKeys.partyBalanceModalInput).should('have.value', purchase.party_balance);

    cy.get(ModalPartiesKeys.partyAddressModalInput).type(purchase.party_address);
    cy.get(ModalPartiesKeys.partyAddressModalInput).should('have.value', purchase.party_address);

    cy.get(ModalPartiesKeys.partyModalSaveBtn).should('be.enabled');
    cy.get(ModalPartiesKeys.partyModalSaveBtn).click();
    cy.get(ModalPartiesKeys.toastMessage).should('contain', 'Party saved');
  }

  searchSuplier() {
    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.partyInput).type(purchase.party_name);
    cy.get(ModalPartiesKeys.wordbreak).click();
  }

  addPurchase() {
    cy.get(ModalProductsKeys.productInput).click();
    cy.get(ModalProductsKeys.productAddBtn).click();

    cy.get(ModalProductsKeys.productModalNameInput).should('contain', '');
    cy.get(ModalProductsKeys.productModalNameRequireMsg).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(ModalProductsKeys.productModalNameInput).type(purchase.product_name);

    cy.get(ModalProductsKeys.productModalCodeInput).should('contain', '');
    cy.get(ModalProductsKeys.productModalCodeInput).type(purchase.product_code);

    cy.get(ModalProductsKeys.productModalPurchasePriceInput).type(purchase.product_purchase_price);
    cy.get(ModalProductsKeys.productModalPurchasePriceInput).should('have.value', purchase.product_purchase_price);

    cy.get(ModalProductsKeys.productModalSalesPriceInput).type(purchase.product_sales_price);
    cy.get(ModalProductsKeys.productModalSalesPriceInput).should('have.value', purchase.product_sales_price);

    cy.get(ModalProductsKeys.productModalInitialStockInput).type(purchase.product_initial_stock);
    cy.get(ModalProductsKeys.productModalInitialStockInput).should('have.value', purchase.product_initial_stock);

    cy.get(ModalProductsKeys.productSaveBtn).should('be.enabled');
    cy.get(ModalProductsKeys.productSaveBtn).click();
    cy.get(PurchaseKeys.purchaseSaveBtn).click();
  }

  editPurchase() {
    cy.get(PurchaseKeys.purchaseEditBtn).click({ force: true });
    cy.get(PurchaseKeys.purchaseToggleBtn).click({ force: true });

    cy.get(PurchaseKeys.purchaseQuantity).clear();
    cy.get(PurchaseKeys.purchaseQuantity).type('5');
    cy.get(PurchaseKeys.purchaseQuantity).should('have.value', 5);

    cy.get(PurchaseKeys.transactionPaidItem).clear();
    cy.get(PurchaseKeys.transactionPaidItem).type(purchase.trasanction_amount);
    cy.get(PurchaseKeys.purchaseSaveBtn).click();
  }

  addPurchaseReturn() {
    cy.get(PurchaseKeys.purchaseReturnLink).click();
    cy.get(PurchaseKeys.purchaseReturnNewBtn).click();

    cy.get(ModalPartiesKeys.partyInput).click();
    cy.get(ModalPartiesKeys.partyInput).type(purchase.party_name);
    cy.get(ModalPartiesKeys.wordbreak).click();

    cy.get(ModalProductsKeys.productInput).click();
    cy.get(ModalProductsKeys.wordbreak).click();

    cy.get(PurchaseKeys.purchaseReturnSaveBtn).click();
  }

  checkEditPurchaseReturn() {
    cy.wait(1000);
    cy.get(PurchaseKeys.purchaseReturnListEditBtn).click({ force: true });
    cy.get(PurchaseKeys.purchaseToggleBtn).click({ force: true });

    cy.get(PurchaseKeys.purchaseReturnAmount).type(purchase.purchase_Return_Amount);
    cy.get(PurchaseKeys.purchaseReturnEditSaveBtn).click();
  }

  checkPuchaseReport() {
    cy.wait(1000);
    cy.get(PurchaseKeys.reportsLink).click({ force: true });
    cy.get(PurchaseKeys.purchaseReportsLink).click({ force: true });

    //Total Purchase Quantity
    cy.get(':nth-child(2) > b').then(function ($quantity) {
      const totalNetAmount = $quantity
        .toArray()
        .map(function (el) {
          return el.innerText
        })

      const quantity = Cypress._.sum(totalNetAmount)
      cy.log(`Total Quantity should be ${quantity}`)
      expect(quantity).to.contains('4');
    })

    //Total Net Amount
    cy.get(':nth-child(4) > b')
      .then(function ($netAmount) {
        const totalNetAmount = $netAmount
          .toArray()
          .map(function (el) {
            return el.innerText
          })

        const netAmount = Cypress._.sum(totalNetAmount)
        cy.log(`Total Net Amount should be ${netAmount}`)
        expect(netAmount).to.contains('200');
      })
  }

  checkBalanceSheetReport() {
    cy.get(PurchaseKeys.balanceSheetReportLink).click();

    //Total Asset
    cy.get('[data-cy="total-assets"]').then(function ($assets) {
      const totalAssets = $assets
        .toArray()
        .map(function (el) {
          return el.innerText
        })

      const assets = Cypress._.sum(totalAssets)
      cy.log(`Total Assets should be ${assets}`)
      cy.contains(assets);

      // Total Liabilities
      cy.get('[data-cy="total-liabilities"]').then(function ($liabilities) {
        const totalLiabilities = $liabilities
          .toArray()
          .map(function (el) {
            return el.innerText
          })

        const liabilities = Cypress._.sum(totalLiabilities)
        cy.log(`liabilities should be ${liabilities}`)
        cy.contains(liabilities);

        if (assets == liabilities) {
          cy.log('Assets and liabilities are same');
          expect(assets).to.contains('250');
        } else {
          cy.log('Assets and liabilities are not same ,its should be fixed');
          expect(assets).to.contains(liabilities);
        }
      });
    });
  }
}