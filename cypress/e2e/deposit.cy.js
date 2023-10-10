import { loginFunc, commonObject, approvalAdmin, Deposit } from './../component/classFunction';

const loginFunction = new loginFunc();
const commonFunction = new commonObject();
const approvalAdminFunction = new approvalAdmin();
const depositFunction = new Deposit();

describe('Deposit Balance', () => {
  const email = Cypress.env('EMAIL_VALID');
  const pass = Cypress.env('PASS_VALID');

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('STAGING_URL'));
    cy.wait(10000);
  });

  context('Deposit Via Bank & VA', () => {
    it('Users want to request deposit to their account with transfer method but want to cancel it before transfer it', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('h4').contains('Deposit').click();
      cy.wait(15000);
      cy.get('h3').contains('Deposit').should('be.visible');

      // Request deposit & cancel
      depositFunction.depositLocalCancel();
    });

    it('Users want to request deposit to their account with transfer method', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('h4').contains('Deposit').click();
      cy.wait(15000);
      cy.get('h3').contains('Deposit').should('be.visible');

      // Request deposit
      depositFunction.depositLocal();
    });
  });

  context('Deposit Via Crypto', () => {
    it('User want to request deposit to their account with crypto payment but want to cancel it', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('h4').contains('Deposit').click();
      cy.wait(15000);
      cy.get('h3').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(10000);

      // Request deposit crypto & cancel
      depositFunction.depositCryptoCancel();
    });
    it('User want to request deposit to their account with crypto payment', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('h4').contains('Deposit').click();
      cy.wait(15000);
      cy.get('h3').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(10000);

      // Request deposit crypto
      depositFunction.depositCrypto();
    });
  });
});
