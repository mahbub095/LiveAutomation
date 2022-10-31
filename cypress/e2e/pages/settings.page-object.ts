import { ItemSettingsKeys } from "../../support/keys/item-settings-keys";
import { TransactionSettingKeys } from "../../support/keys/trasaction-settings-keys";

export class SettingsPage {

  enableItemSetttings() {
    cy.get(ItemSettingsKeys.settingsMenu).click({ force: true });
    cy.wait(1000);

    cy.get(ItemSettingsKeys.itemEnableToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemMaintenanceToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemUnitToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemUnitToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemCategoryToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemCategoryToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemDiscountToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemDiscountToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemVatToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemVatToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemMfgDateToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemMfgDateToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemExpDateToggle).click({ force: true });
    cy.get(ItemSettingsKeys.itemExpDateToggle).should('be.checked');

    cy.get(ItemSettingsKeys.itemBaseDescription).click({ force: true });
    cy.get(ItemSettingsKeys.itemBaseDescription).should('be.checked');

    cy.get(ItemSettingsKeys.itemMrpPrice).click({ force: true });
    cy.get(ItemSettingsKeys.itemMrpPrice).should('be.checked');

    cy.get(ItemSettingsKeys.itemBatchNo).click({ force: true });
    cy.get(ItemSettingsKeys.itemBatchNo).should('be.checked');

    cy.get(ItemSettingsKeys.itemSerialNo).click({ force: true });
    cy.get(ItemSettingsKeys.itemSerialNo).should('be.checked');

    cy.get(ItemSettingsKeys.itemSaveBtn).click();
    return this;
  }

  enableTransactionSettings() {
    cy.get(ItemSettingsKeys.settingsMenu).click();
    cy.wait(1000);

    cy.scrollTo(0, 250);

    cy.get(TransactionSettingKeys.trasactiondDiscount).should('not.be.checked');
    cy.get(TransactionSettingKeys.trasactiondDiscount).click({ force: true });
    cy.get(TransactionSettingKeys.trasactiondDiscount).should('be.checked');

    cy.get(TransactionSettingKeys.invoicePreview).should('be.checked');
    cy.get(TransactionSettingKeys.invoicePreview).click({ force: true });
    cy.get(TransactionSettingKeys.invoicePreview).should('not.be.checked');
    
    cy.get(TransactionSettingKeys.transactionSaveBtn).click();
    return this;
  }
}