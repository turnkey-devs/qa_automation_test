import { loginFunc, commonObject, approvalAdmin, ApproveAdminFromAPI, WithdrawCrypto, WithdrawLocal } from './../component/classFunction';

const loginFunction = new loginFunc();
const commonFunction = new commonObject();
const approvalAdminFunction = new approvalAdmin();
const approvalAdminFromAPI = new ApproveAdminFromAPI();
const withdrawCrypto = new WithdrawCrypto();
const withdrawLocal = new WithdrawLocal();

describe('Withdraw Balance', () => {
  const email = Cypress.env('EMAIL_VALID');
  const pass = Cypress.env('PASS_VALID');

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('STAGING_URL'));
    cy.wait(10000);
  });

  context('Local Withdrawl', () => {
    // it('Users want to withdraw their balance with local method without input any field', () => {
    //   // Login
    //   loginFunction.loginCorrect(email, pass);

    //   // Buka withdraw menu dari sidebar
    //   cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
    //   cy.wait(3000);
    //   cy.get('h1').contains('Withdraw').should('be.visible');

    //   // Klik tombol request withdraw
    //   cy.get('button').contains('Request Withdraw').click();
    //   cy.wait(2000);

    //   // Assert pop up error
    //   cy.get('h2').contains('Incomplete Data!').should('be.visible');
    //   cy.get('button').contains('Oke').click();
    //   cy.wait(1000);
    // });

    // it('Users want to withdraw their balance with local method but input negatif value in amount', () => {
    //   // Login
    //   loginFunction.loginCorrect(email, pass);

    //   // Buka withdraw menu dari sidebar
    //   cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
    //   cy.wait(3000);
    //   cy.get('h1').contains('Withdraw').should('be.visible');

    //   // Input amount (input $1 saja)
    //   cy.get('input[name="amount"]').type(-1).should('not.have.value', -1);
    // });

    it('Users want to withdraw with local method but want to cancel it before approved by admin', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Input data sesuai withdraw dan cancel setelah create
      withdrawLocal.withdrawLocalCancel();
    });

    it('Users want to withdraw with local method', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Input sesuai data request withdraw local dan approve admin lewat API
      withdrawLocal.withdrawLocalAcceptAPI();
    });
  });

  context('Crypto Withdrawl', () => {
    it('Users want to withdraw their balance with crypto method without input any field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Klik tab crypto
      cy.get('a[href="/withdraw-crypto"]').click();
      cy.wait(4000);

      // Klik tombol request withdraw
      cy.get('button').contains('Request Withdraw').click();
      cy.wait(2000);

      // Assert pop up error
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });

    it('Users want to withdraw their balance with crypto method but input negatif value in amount', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Klik tab crypto
      cy.get('a[href="/withdraw-crypto"]').click();
      cy.wait(4000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(-1).should('not.have.value', -1);
    });

    it('Users want to withdraw their balance with crypto method but input wallet address with not correct file format', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Klik tab crypto
      cy.get('a[href="/withdraw-crypto"]').click();
      cy.wait(4000);

      // Input data request withdraw invalid file
      withdrawCrypto.withdrawCryptoInvalidFile();
    });

    it('Users want to withdraw their balance with crypto method', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Klik tab crypto
      cy.get('a[href="/withdraw-crypto"]').click();
      cy.wait(4000);

      // Input data request withdraw crypto dan approve admin lewat API
      withdrawCrypto.withdrawCryptoAcceptAPI();
    });
  });
});
