/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//  namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
Cypress.Commands.add('login', () => {
  cy.visit('/auth/login')
  cy.get('input[id=phone_number]').type('ABCD');
  cy.get('button').click();
  cy.get('.toast-message').should('contain', 'OTP sent successfully');

  cy.get('input[id=otp]').clear();
  cy.get('input[id=otp]').type('ABCD');
  cy.get('button[type=submit]').should('be.enabled');
  cy.get('button[type=submit]').click();

  cy.get('.center-text > p').should('contain', 'লোড হচ্ছে...');
})

Cypress.Commands.add('loadingTime', () => {
  return cy.intercept('/api/**').as('time')
})
