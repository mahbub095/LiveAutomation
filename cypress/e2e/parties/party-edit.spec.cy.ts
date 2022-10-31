import { PartyPage } from "../pages/party.page-object";

const partypage = new PartyPage();

describe('party/edit', () => {

  before(() => {
    cy.login();
  })

  beforeEach(() => {
    cy.loadingTime();
  });

  it('should add customer', () => {
    cy.wait(5000);
    partypage.addCustomer();
  });

  it('should edit customer', () => {
    partypage.editCustomer();
  });

  it('should delete customer', () => {
    partypage.deleteParty();
  });

  it('should check add supplier', () => {
    partypage.addSupplier();
  });

  it('should edit supplier', () => {
    partypage.editSupplier();
  });

  it('should delete supplier', () => {
    partypage.deleteSupplier();
  });
})