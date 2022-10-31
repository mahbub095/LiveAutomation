import { PartyPage } from "../pages/party.page-object";

const partypage = new PartyPage();

describe('party/add', () => {

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

  it('should search party by name and phone', () => {
    partypage.searchParty();
  });

  it('should check duplicate name and phone no', () => {
    partypage.checkDuplicateName();
    partypage.checkDuplicatePhone();
  });

  it('should add supplier', () => {
    partypage.addSupplier();
  });

  it('should filter party by type', () => {
    partypage.filterParty();
  });

  it('should check duplicate supplier name and phone no', () => {
    partypage.checkSupplierDuplicateName();
    partypage.checkSupplierDuplicatePhone();
  });
})