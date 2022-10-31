/// <reference types="cypress" />

describe('auth/login', () => {
  let credentials;

  before(() => {
    cy.fixture('auth/credentials.json').then((data) => {
      credentials = data;
    });
  })

  it('should login', async () => {
    cy.visit('/auth/login');

    cy.get('input[id=phone_number]').should('contain', '');
    cy.get('button').should('be.enabled');
    cy.get('button').click();
    cy.get('button').should('be.disabled');
    cy.get('.help-block').should('contain', 'ফোন নম্বর অবশ্যই দিতে হবে');
    cy.get('input[id=phone_number]').type('0188AABBCC');
    cy.get('.help-block').should('contain', 'ফোন নম্বরটি সঠিক নয়');
    
    cy.get('input[id=phone_number]').clear();
    cy.get('input[id=phone_number]').type(credentials.phone_number);
    cy.get('button').click();
    cy.get('.toast-message').should('contain', 'OTP sent successfully');
    
    cy.get('input[id=otp]').should('contain', '');
    cy.get('button[type=submit]').click();
    cy.get('.help-block').should('contain', 'ওটিপি অবশ্যই দিতে হবে');
    cy.get('button[type=submit]').should('be.disabled');
    
    cy.get('input[id=otp]').type('123456');
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('button[type=submit]').click();
    cy.get('.toast-message').should('contain', 'OTP you entered is invalid');
    
    cy.get('input[id=otp]').clear();
    cy.get('input[id=otp]').type(credentials.otp);
    cy.get('button[type=submit]').should('be.enabled');
    cy.get('button[type=submit]').click();

    cy.get('.center-text > p').should('contain', 'লোড হচ্ছে...');
  });
})