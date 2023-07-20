import { loginFunc, commonObject, approvalAdmin } from './../component/classFunction';

const loginFunction = new loginFunc();
const commonFunction = new commonObject();
const approvalAdminFunction = new approvalAdmin();

describe('Deposit Balance', () => {
  const email = Cypress.env('EMAIL_VALID');
  const pass = Cypress.env('PASS_VALID');

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('STAGING_URL'));
    cy.wait(3000);
  });

  context('Deposit Via Bank & VA', () => {
    it('Users want to deposit to their account without input all field or some field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik bank & va sebagai metode payment
      cy.get('div').contains('Bank Transfer & Virtual Account').click();
      cy.wait(5000);
      cy.get('h2').contains('Input deposit amount').should('be.visible');

      // Klik proceed deposit
      cy.get('button').contains('Proceed Deposit').click();
      cy.wait(2000);

      // Assert pop up error
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });
    it('Users want to request deposit to their account with transfer method but want to cancel it before transfer it', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik bank & va sebagai metode payment
      cy.get('div').contains('Bank Transfer & Virtual Account').click();
      cy.wait(5000);
      cy.get('h2').contains('Input deposit amount').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Proceed Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('To finalize the payment').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes, Continue Payment').click();
      cy.wait(5000);
      cy.get('div').contains('To complete your payment').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(5000);

      // Check status verified identity dan klik cancel
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(5000);
      cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
      cy.wait(1000);
      cy.get('h2').contains('Do you want to cancel the deposit?').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(4000);
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(4000);
      cy.get('table > tr').eq(0).find('td').contains('CANCELED').should('be.visible');
    });
    it('Users want to request deposit to their account with transfer method', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik bank & va sebagai metode payment
      cy.get('div').contains('Bank Transfer & Virtual Account').click();
      cy.wait(5000);
      cy.get('h2').contains('Input deposit amount').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Proceed Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('To finalize the payment').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes, Continue Payment').click();
      cy.wait(5000);
      cy.get('div').contains('To complete your payment').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(5000);

      // ===============================================================================
      // CYPRESS TIDAK DAPAT HANDLE NEW TAB SELAIN DARI LINK YANG ADA TARGET BLANK NYA
      // ===============================================================================
    });
  });

  context('Deposit Via Credit Card', () => {});

  context('Deposit Via Crypto', () => {});
});
