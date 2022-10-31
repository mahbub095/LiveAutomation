import { PartiesKeys } from "../../support/keys/parties-keys";
import { Utils } from "../../support/utils";

let customer;
let customerEdit;
let supplier;
let supplierEdit;
let todayDate = Utils.getTodayDate();

enum EPartyType {
  ALL = 'সকল',
  CUSTOMER = 'কাস্টমার',
  SUPPLIER = 'সাপ্লাইয়ার',
}

before(() => {
  cy.fixture('party/add-party/new-customer.json').then((data) => {
    customer = data;
  });
  cy.fixture('party/add-party/edit-customer.json').then((data) => {
    customerEdit = data;
  });
  cy.fixture('party/add-party/new-supplier.json').then((data) => {
    supplier = data;
  });
  cy.fixture('party/add-party/edit-supplier.json').then((data) => {
    supplierEdit = data;
  });
})

export class PartyPage {

  addCustomer() {
    cy.get(PartiesKeys.partyMenu).click({ force: true });
    cy.get(PartiesKeys.newPartyBtn).click({ force: true });

    cy.get(PartiesKeys.partyNameInput).should('contain', '');
    cy.get(PartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(PartiesKeys.partyNameInput).type(customer.party_name);
    cy.get(PartiesKeys.partyNameInput).should('have.value', customer.party_name);

    cy.get(PartiesKeys.partyPhoneInput).type('Name');
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', '');
    cy.get(PartiesKeys.partyPhoneInput).type('123456');
    cy.get(PartiesKeys.helpBlock).should('contain', 'ফোন নম্বরটি সঠিক নয়');
    cy.get(PartiesKeys.partyPhoneInput).clear();
    cy.get(PartiesKeys.partyPhoneInput).type(customer.party_phone);
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', customer.party_phone);

    cy.get(PartiesKeys.partyEmailInput).should('contain', '');
    cy.get(PartiesKeys.partyEmailInput).type('testemail');
    cy.get(PartiesKeys.helpBlock).should('contain', 'ইমেইল সঠিক নয়');
    cy.get(PartiesKeys.partyEmailInput).clear();
    cy.get(PartiesKeys.partyEmailInput).type(customer.party_email);
    cy.get(PartiesKeys.partyEmailInput).should('have.value', customer.party_email);

    cy.get(PartiesKeys.partyBalanceInput).should('have.value', 0);
    cy.get(PartiesKeys.partyBalanceInput).type('abc');
    cy.get(PartiesKeys.partyAddressInput).should('contain', '');
    cy.get(PartiesKeys.partyBalanceInput).type(customer.party_balance);
    cy.get(PartiesKeys.partyBalanceInput).should('have.value', customer.party_balance);

    cy.get(PartiesKeys.previousReceivableOrPayableDate).should('have.value', todayDate);
    cy.get(PartiesKeys.previousReceivableOrPayableDate).clear();
    cy.get(PartiesKeys.previousReceivableOrPayableDate).type(customer.initial_balance_date);
    cy.get(PartiesKeys.previousReceivableOrPayableDate).should('have.value', customer.initial_balance_date);

    cy.get(PartiesKeys.partyTinInput).should('contain', '');
    cy.get(PartiesKeys.partyTinInput).type(customer.party_tin);
    cy.get(PartiesKeys.partyTinInput).should('have.value', customer.party_tin);

    cy.get(PartiesKeys.partyAddressInput).type(customer.party_address);

    cy.get(PartiesKeys.partySaveBtn).should('be.enabled');
    cy.get(PartiesKeys.partySaveBtn).click();
    cy.get(PartiesKeys.toastMessage).should('contain', 'Party saved');
    return this;
  }

  searchParty() {
    cy.get(PartiesKeys.partyMenu).click();

    cy.get(PartiesKeys.partySearchInput).should('contain', '');
    cy.get(PartiesKeys.totalParty).should('contain', 2);
    cy.get(PartiesKeys.partySearchInput).type(customer.party_name);
    cy.get(PartiesKeys.totalParty).should('contain', 1);
    cy.get(PartiesKeys.partyListPartyName).should('contain', customer.party_name);
    cy.get(PartiesKeys.partyDelete).should('be.visible');
    cy.get(PartiesKeys.partyEdit).should('be.visible');

    cy.get(PartiesKeys.partySearchInput).clear();
    cy.get(PartiesKeys.totalParty).should('contain', 2);
    cy.get(PartiesKeys.partySearchInput).type(customer.party_phone);
    cy.get(PartiesKeys.totalParty).should('contain', 1);
    cy.get(PartiesKeys.partyListPartyPhone).should('contain', customer.party_phone);
    cy.get(PartiesKeys.partyDelete).should('be.visible');
    cy.get(PartiesKeys.partyEdit).should('be.visible');
  }

  filterParty() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.partyFilterDropdown).should('contain', EPartyType.ALL);
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('contain', 'CUSTOMER');
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('contain', 'SUPPLIER');
    cy.get(PartiesKeys.partyFilterDropdown).select(EPartyType.CUSTOMER);
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('contain', 'CUSTOMER');
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('not.contain', 'SUPPLIER');
    cy.get(PartiesKeys.partyFilterDropdown).select(EPartyType.SUPPLIER);
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('contain', 'SUPPLIER');
    cy.get(PartiesKeys.partyListTbody).children('tr').children('td').should('not.contain', 'CUSTOMER');
  }

  checkDuplicateName() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.newPartyBtn).click();

    cy.get(PartiesKeys.partyNameInput).type(customer.party_name);
    cy.get(PartiesKeys.helpBlock).should('contain', 'একই নাম একাধিক বার ব্যবহৃত হয়েছে');

    cy.get(PartiesKeys.partySaveBtn).should('be.disabled');
    return this;
  }

  checkDuplicatePhone() {
    cy.get(PartiesKeys.partyPhoneInput).type(customer.party_phone);
    cy.get(PartiesKeys.helpBlock).should('contain', 'ফোন নম্বর একাধিক বার ব্যবহৃত হয়েছে');

    cy.get(PartiesKeys.partySaveBtn).should('be.disabled');
    return this;
  }

  editCustomer() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.partyEdit).click();

    cy.get(PartiesKeys.partyNameInput).clear();
    cy.get(PartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(PartiesKeys.partyNameInput).type(customerEdit.party_name);
    cy.get(PartiesKeys.partyNameInput).should('have.value', customerEdit.party_name);

    cy.get(PartiesKeys.partyPhoneInput).clear();
    cy.get(PartiesKeys.partyPhoneInput).type(customerEdit.party_phone);
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', customerEdit.party_phone);

    cy.get(PartiesKeys.partyBalanceInput).clear();
    cy.get(PartiesKeys.partyBalanceInput).type(customerEdit.party_balance);
    cy.get(PartiesKeys.partyBalanceInput).should('have.value', customerEdit.party_balance);

    cy.get(PartiesKeys.previousPayableDate).clear();
    cy.get(PartiesKeys.previousPayableDate).type(customerEdit.previous_payable_date);
    cy.get(PartiesKeys.previousPayableDate).should('have.value', customerEdit.previous_payable_date);

    cy.get(PartiesKeys.partyEmailInput).clear();
    cy.get(PartiesKeys.partyEmailInput).type(customerEdit.party_email);
    cy.get(PartiesKeys.partyEmailInput).should('have.value', customerEdit.party_email);

    cy.get(PartiesKeys.partyTinInput).clear();
    cy.get(PartiesKeys.partyTinInput).type(customerEdit.party_tin);
    cy.get(PartiesKeys.partyTinInput).should('have.value', customerEdit.party_tin);

    cy.get(PartiesKeys.partyAddressInput).clear();
    cy.get(PartiesKeys.partyAddressInput).type(customerEdit.party_address);

    cy.get(PartiesKeys.partyEditSaveBtn).click();
    cy.get(PartiesKeys.toastMessage).should('contain', 'Party saved');
    return this;
  }

  deleteParty() {
    cy.get(PartiesKeys.partyDelete).click();
    cy.get(PartiesKeys.productDeleteConfirmBtn).click();
    return this;
  }

  addSupplier() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.newPartyBtn).click();
    cy.get(PartiesKeys.toggleBtn).click();

    cy.get(PartiesKeys.partyNameInput).should('contain', '');
    cy.get(PartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(PartiesKeys.partyNameInput).type(supplier.party_name);
    cy.get(PartiesKeys.partyNameInput).should('have.value', supplier.party_name);

    cy.get(PartiesKeys.partyPhoneInput).type('Name');
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', '');
    cy.get(PartiesKeys.partyPhoneInput).type('123456');
    cy.get(PartiesKeys.helpBlock).should('contain', 'ফোন নম্বরটি সঠিক নয়');
    cy.get(PartiesKeys.partyPhoneInput).clear();
    cy.get(PartiesKeys.partyPhoneInput).type(supplier.party_phone);
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', supplier.party_phone);

    cy.get(PartiesKeys.partyEmailInput).should('contain', '');
    cy.get(PartiesKeys.partyEmailInput).type('testemail');
    cy.get(PartiesKeys.helpBlock).should('contain', 'ইমেইল সঠিক নয়');
    cy.get(PartiesKeys.partyEmailInput).clear();
    cy.get(PartiesKeys.partyEmailInput).type(supplier.party_email);
    cy.get(PartiesKeys.partyEmailInput).should('have.value', supplier.party_email);

    cy.get(PartiesKeys.partyBalanceInput).should('have.value', 0);
    cy.get(PartiesKeys.partyBalanceInput).type('abc');
    cy.get(PartiesKeys.partyAddressInput).should('contain', '');
    cy.get(PartiesKeys.partyBalanceInput).type(supplier.party_balance);
    cy.get(PartiesKeys.partyBalanceInput).should('have.value', supplier.party_balance);

    cy.get(PartiesKeys.previousReceivableOrPayableDate).should('have.value', todayDate);
    cy.get(PartiesKeys.previousReceivableOrPayableDate).clear();
    cy.get(PartiesKeys.previousReceivableOrPayableDate).type(supplier.initial_balance_date);
    cy.get(PartiesKeys.previousReceivableOrPayableDate).should('have.value', supplier.initial_balance_date);

    cy.get(PartiesKeys.partyTinInput).should('contain', '');
    cy.get(PartiesKeys.partyTinInput).type(supplier.party_tin);
    cy.get(PartiesKeys.partyTinInput).should('have.value', supplier.party_tin);

    cy.get(PartiesKeys.partyAddressInput).type(supplier.party_address);
    cy.get(PartiesKeys.partyAddressInput).should('have.value', supplier.party_address);

    cy.get(PartiesKeys.partySaveBtn).should('be.enabled');
    cy.get(PartiesKeys.partySaveBtn).click();
    cy.get(PartiesKeys.toastMessage).should('contain', 'Party saved');
    return this;
  }

  checkSupplierDuplicateName() {
    cy.get(PartiesKeys.newPartyBtn).click();
    cy.get(PartiesKeys.toggleBtn).click();

    cy.get(PartiesKeys.partyEmailInput).clear();
    cy.get(PartiesKeys.partyNameInput).type(supplier.party_name);
    cy.get(PartiesKeys.helpBlock).should('contain', 'একই নাম একাধিক বার ব্যবহৃত হয়েছে');

    cy.get(PartiesKeys.partySaveBtn).should('be.disabled');
    return this;
  }

  checkSupplierDuplicatePhone() {
    cy.get(PartiesKeys.partyPhoneInput).clear();
    cy.get(PartiesKeys.partyPhoneInput).type(supplier.party_phone);
    cy.get(PartiesKeys.helpBlock).should('contain', 'ফোন নম্বর একাধিক বার ব্যবহৃত হয়েছে');

    cy.get(PartiesKeys.partySaveBtn).should('be.disabled');
    return this;
  }

  editSupplier() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.partyEdit).click();

    cy.get(PartiesKeys.toggleBtn).click();

    cy.get(PartiesKeys.partyNameInput).clear();
    cy.get(PartiesKeys.helpBlock).should('contain', 'নাম অবশ্যই দিতে হবে');
    cy.get(PartiesKeys.partyNameInput).type(supplierEdit.party_name);
    cy.get(PartiesKeys.partyNameInput).should('have.value', supplierEdit.party_name);

    cy.get(PartiesKeys.partyPhoneInput).clear();
    cy.get(PartiesKeys.partyPhoneInput).type(supplierEdit.party_phone);
    cy.get(PartiesKeys.partyPhoneInput).should('have.value', supplierEdit.party_phone);

    cy.get(PartiesKeys.partyBalanceInput).clear();
    cy.get(PartiesKeys.partyBalanceInput).type(supplierEdit.party_balance);
    cy.get(PartiesKeys.partyBalanceInput).should('have.value', supplierEdit.party_balance);

    cy.get(PartiesKeys.previousPayableDate).clear();
    cy.get(PartiesKeys.previousPayableDate).type(supplierEdit.previous_payable_date);
    cy.get(PartiesKeys.previousPayableDate).should('have.value', supplierEdit.previous_payable_date);

    cy.get(PartiesKeys.partyEmailInput).clear();
    cy.get(PartiesKeys.partyEmailInput).type(supplierEdit.party_email);
    cy.get(PartiesKeys.partyEmailInput).should('have.value', supplierEdit.party_email);

    cy.get(PartiesKeys.partyTinInput).clear();
    cy.get(PartiesKeys.partyTinInput).type(supplierEdit.party_tin);
    cy.get(PartiesKeys.partyTinInput).should('have.value', supplierEdit.party_tin);

    cy.get(PartiesKeys.partyAddressInput).clear();
    cy.get(PartiesKeys.partyAddressInput).type(supplierEdit.party_address);

    cy.get(PartiesKeys.partyEditSaveBtn).click();
    cy.get(PartiesKeys.toastMessage).should('contain', 'Party saved');
    return this;
  }

  deleteSupplier() {
    cy.get(PartiesKeys.partyMenu).click();
    cy.get(PartiesKeys.partyDelete).click();
    cy.get(PartiesKeys.productDeleteConfirmBtn).click();
    return this;
  }
}