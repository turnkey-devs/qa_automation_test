import { loginFunc, commonObject, approvalAdmin } from './../component/classFunction';

const loginFunction = new loginFunc();
const commonFunction = new commonObject();
const approvalAdminFunction = new approvalAdmin();

describe('Withdraw Balance', () => {
  const email = Cypress.env('EMAIL_VALID');
  const pass = Cypress.env('PASS_VALID');

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('STAGING_URL'));
    cy.wait(3000);
  });

  context('Local Withdrawl', () => {
    it('Users want to withdraw their balance with local method without input any field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Klik tombol request withdraw
      cy.get('button').contains('Request Withdraw').click();
      cy.wait(2000);

      // Assert pop up error
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });

    it('Users want to withdraw their balance with local method but input negatif value in amount', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(-1).should('not.have.value', -1);
    });

    it('Users want to withdraw with local method but want to cancel it before approved by admin', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      //  Input akun yang ingin di withdraw
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
      commonFunction.checkWithdrawlBalance();

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);

      // Input nama akun
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="input_akun_pemilik"]').type(randCharacters).should('have.value', randCharacters);

      // Input nomor akun
      const randNumber = commonFunction.randomNumberID();
      cy.get('input[name="input_nomor_akun"]').type(randNumber).should('have.value', randNumber);

      // Input nama bank
      const randCharacters2 = commonFunction.randomChar();
      cy.get('input[name="selectBank"]').type(randCharacters2).should('have.value', randCharacters2);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik tombol request withdraw
      cy.get('button').contains('Request Withdraw').click();
      cy.wait(2000);
      cy.get('h1').contains('Withdrawal Bank').should('be.visible');

      // Klik continue dan yes
      cy.get('button').contains('Continue').click();
      cy.get(2000);
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(3000);

      // Check status verified identity dan klik cancel
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(5000);
      cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
      cy.wait(1000);
      cy.get('h2').contains('Do you want to cancel the withdrawal?').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(4000);
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(4000);
      cy.get('table > tr').eq(0).find('td').contains('CANCELED').should('be.visible');
    });

    it('Users want to withdraw with local method', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka withdraw menu dari sidebar
      cy.get('a[href="/withdraw"] > div > div > h4').contains('Withdraw').click();
      cy.wait(3000);
      cy.get('h1').contains('Withdraw').should('be.visible');

      //  Input akun yang ingin di withdraw
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
      commonFunction.checkWithdrawlBalance();

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);

      // Input nama akun
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="input_akun_pemilik"]').type(randCharacters).should('have.value', randCharacters);

      // Input nomor akun
      const randNumber = commonFunction.randomNumberID();
      cy.get('input[name="input_nomor_akun"]').type(randNumber).should('have.value', randNumber);

      // Input nama bank
      const randCharacters2 = commonFunction.randomChar();
      cy.get('input[name="selectBank"]').type(randCharacters2).should('have.value', randCharacters2);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik tombol request withdraw
      cy.get('button').contains('Request Withdraw').click();
      cy.wait(2000);
      cy.get('h1').contains('Withdrawal Bank').should('be.visible');

      // Klik continue dan yes
      cy.get('button').contains('Continue').click();
      cy.get(2000);
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(3000);

      // Cek approval admin
      approvalAdminFunction.approvalWithdrawal();

      // Buka primecodex staging kembali dan login
      cy.visit(Cypress.env('STAGING_URL'));
      cy.wait(3000);
      loginFunction.loginCorrect(email, pass);

      // Check status verified identity
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(10000);
      cy.get('table > tr').eq(0).find('td').contains('SUCCESS').should('be.visible');
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

      //  Input akun yang ingin di withdraw
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
      commonFunction.checkWithdrawlBalance();

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);

      // Input wallet address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[placeholder="Your USDT address"]').type(randCharacters).should('have.value', randCharacters);

      // Input server network
      cy.get('label')
        .contains('Network')
        .parent()
        .find('select > option')
        .then(($el) => {
          // Logika untuk random value dropdown
          let randNumber = Math.floor(Math.random() * $el.length);
          if (randNumber == 0) {
            randNumber = randNumber + 1;
          }

          // Pilih items dropdown
          const valueDrop = $el[randNumber].text;
          cy.get('select').eq(1).select(valueDrop);
          cy.wait(1000);
        });

      // Input field file dengan value yang tidak sesuai
      cy.get('input[type="file"]').selectFile('cypress/fixtures/pdfExample.pdf');
      cy.wait(2000);

      // Assert pop up error muncul
      cy.get('h2').contains('Your file is not an image').should('be.visible');
      cy.get('button').contains('OK').click();
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

      //  Input akun yang ingin di withdraw
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
      commonFunction.checkWithdrawlBalance();

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);

      // Input wallet address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[placeholder="Your USDT address"]').type(randCharacters).should('have.value', randCharacters);

      // Input server network
      cy.get('label')
        .contains('Network')
        .parent()
        .find('select > option')
        .then(($el) => {
          // Logika untuk random value dropdown
          let randNumber = Math.floor(Math.random() * $el.length);
          if (randNumber == 0) {
            randNumber = randNumber + 1;
          }

          // Pilih items dropdown
          const valueDrop = $el[randNumber].text;
          cy.get('select').eq(1).select(valueDrop);
          cy.wait(1000);
        });

      // Input field file dengan value yang sesuai
      cy.get('input[type="file"]').selectFile('cypress/fixtures/PicExample.png');
      cy.wait(2000);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik tombol request withdraw
      cy.get('button').contains('Request Withdraw').click();
      cy.wait(2000);
      cy.get('h1').contains('Withdrawal Crypto').should('be.visible');

      // Klik continue dan yes
      cy.get('button').contains('Continue').click();
      cy.get(2000);
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('h2').contains('Your request will be processed').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(3000);

      // Cek approval admin
      approvalAdminFunction.approvalWithdrawal();

      // Buka primecodex staging kembali dan login
      cy.visit(Cypress.env('STAGING_URL'));
      cy.wait(3000);
      loginFunction.loginCorrect(email, pass);

      // Check status withdraw
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(10000);
      cy.get('table > tr').eq(0).find('td').contains('SUCCESS').should('be.visible');
    });
  });
});
