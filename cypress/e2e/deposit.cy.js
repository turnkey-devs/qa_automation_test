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
    cy.wait(10000);
  });

  context('Deposit Via Bank & VA', () => {
    it('Users want to deposit to their account without input all field or some field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');
      cy.get('h3').contains('Select Account').should('be.visible');

      // Klik proceed deposit
      cy.get('button').contains('Request Deposit').click();
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
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input nama akun bank
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="akun-pemilik"]').clear().type(randCharacters).should('have.value', randCharacters);
      cy.wait(1000);

      // Input nomor akun bank
      const randNumber = commonFunction.randomNumberID();
      cy.get('input[name="nomor-akun"]').clear().type(randNumber).should('have.value', randNumber);
      cy.wait(1000);

      // Input nama bank
      cy.get('div[class="menu hidden"]')
        .find('div')
        .then(($el2) => {
          // Pilih dropdown dan ambil number index item yang dipilih
          commonFunction.randomDropdownValueDivPOA($el2);
        });

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('div').contains('To complete your payment').should('be.visible');
      cy.get('button').contains('Transfer Manual').click();
      cy.wait(5000);
      cy.url().should('include', '/verify-time');

      // Buka account dashboard
      cy.get('a[href="/dashboard"]').contains('Account').click();
      cy.wait(5000);

      // Check status verified identity dan klik cancel
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(5000);
      cy.get('thead').then(($el) => {
        const rowTd = $el.length;
        if (rowTd == 0) {
          cy.reload();
          cy.wait(10000);
        }
      });
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

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input nama akun bank
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="akun-pemilik"]').clear().type(randCharacters).should('have.value', randCharacters);
      cy.wait(1000);

      // Input nomor akun bank
      const randNumber = commonFunction.randomNumberID();
      cy.get('input[name="nomor-akun"]').clear().type(randNumber).should('have.value', randNumber);
      cy.wait(1000);

      // Input nama bank
      cy.get('div[class="menu hidden"]')
        .find('div')
        .then(($el2) => {
          // Pilih dropdown dan ambil number index item yang dipilih
          commonFunction.randomDropdownValueDivPOA($el2);
        });

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('div').contains('To complete your payment').should('be.visible');
      cy.get('button').contains('Transfer Manual').click();
      cy.wait(5000);
      cy.url().should('include', '/verify-time');

      // Input field file dengan value yang sesuai
      cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/PicExample.png');
      cy.wait(2000);

      // Klik Send Proof
      cy.get('button').contains('Send Proof').click();
      cy.wait(2000);
      cy.get('h2').contains('Deposit Verification').should('be.visible');

      // Klik Yes
      cy.get('button').contains('Yes').click();
      cy.wait(3000);
      cy.get('h2').contains('Success').should('be.visible');
    });
  });

  context('Deposit Via Crypto', () => {
    it('User want to request deposit to their account with crypto payment method without fill all field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Klik request deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);

      // Assert pop up error
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });
    it('User want to request deposit to their account with crypto payment method with minus amount', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input amount
      cy.get('input[name="amount"]').type(-1).should('not.have.value', -1);
      cy.wait(2000);
    });
    it('User want to request deposit to their account with crypto payment but want to cancel it', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input crypto address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="nomor-akun"]').type(randCharacters).should('have.value', randCharacters);

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

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.url().should('include', '/verify-time');

      // Buka account dashboard
      cy.get('a[href="/dashboard"]').contains('Account').click();
      cy.wait(5000);

      // Check status verified identity dan klik cancel
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(5000);
      cy.get('thead').then(($el) => {
        const rowTd = $el.length;
        if (rowTd == 0) {
          cy.reload();
          cy.wait(10000);
        }
      });
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
    it('User want to request deposit to their account with crypto payment', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik crypto metode payment
      cy.get('a[href="/deposit-crypto"]').click({ force: true });
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input crypto address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="nomor-akun"]').type(randCharacters).should('have.value', randCharacters);

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

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik proceed deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.url().should('include', '/verify-time');

      // Input field file dengan value yang sesuai
      cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/PicExample.png');
      cy.wait(2000);

      // Klik Send Proof
      cy.get('button').contains('Send Proof').click();
      cy.wait(2000);
      cy.get('h2').contains('Deposit Verification').should('be.visible');

      // Klik Yes
      cy.get('button').contains('Yes').click();
      cy.wait(3000);
      cy.get('h2').contains('Success').should('be.visible');

      // =========================
      //  NO APPROVAL ADMIN FIRST
      // =========================
    });
  });

  context('Deposit Via Credit Card', () => {
    it('User want to request deposit to their account with credit card payment method without fill all field', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik credit card metode payment
      cy.get('a[href="/deposit-credit-card"]').click();
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Klik request deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);

      // Assert pop up error
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });
    it('User want to request deposit to their account with credit card payment method with minus amount', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik credit card metode payment
      cy.get('a[href="/deposit-credit-card"]').click();
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input amount
      cy.get('input[name="amount"]').type(-1).should('not.have.value', -1);
      cy.wait(2000);
    });
    it('User want to request deposit to their account with credit card payment but want to cancel it', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik credit card metode payment
      cy.get('a[href="/deposit-credit-card"]').click();
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input crypto address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="akun-pemilik"]').type(randCharacters).should('have.value', randCharacters);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik request deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('h2').contains('Attention!').should('be.visible');

      // Agar tidak membuka tab baru
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      // Klik Payment Gateway
      cy.get('button').contains('Payment Gateway').click();
      cy.wait(5000);

      // Check status verified identity dan klik cancel
      cy.get('h1').contains('History Payment').scrollIntoView();
      cy.get(5000);
      cy.get('thead').then(($el) => {
        const rowTd = $el.length;
        if (rowTd == 0) {
          cy.reload();
          cy.wait(10000);
        }
      });
      cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
      cy.wait(1000);
      cy.get('h2').contains('Do you want to cancel the deposit?').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(4000);
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('button').contains('OK').click();
      cy.wait(10000);
      cy.get('table > tr').eq(0).find('td').contains('CANCELED').should('be.visible');
    });
    it('Users want to request deposit to their account with credit card', () => {
      // Login
      loginFunction.loginCorrect(email, pass);

      // Buka deposit menu dari sidebar
      cy.get('a[href="/deposit"] > div > div > h4').contains('Deposit').click();
      cy.wait(3000);
      cy.get('h1').contains('Deposit').should('be.visible');

      // Klik credit card metode payment
      cy.get('a[href="/deposit-credit-card"]').click();
      cy.wait(5000);
      cy.get('h3').contains('Select Account').should('be.visible');

      // Input akun yang ingin di deposit
      cy.wait(2000);
      cy.get('select[name="select-account"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="select-account"]', $el);
      });
      cy.wait(2000);

      // Input amount (input $1 saja)
      cy.get('input[name="amount"]').type(1).should('have.value', 1);
      cy.wait(2000);

      // Input crypto address
      const randCharacters = commonFunction.randomChar();
      cy.get('input[name="akun-pemilik"]').type(randCharacters).should('have.value', randCharacters);

      // Input checkbox
      cy.get('input[type="checkbox"]').click();
      cy.get('input[type="checkbox"]').should('be.checked');
      cy.wait(1000);

      // Klik request deposit
      cy.get('button').contains('Request Deposit').click();
      cy.wait(2000);
      cy.get('h2').contains('Are You Confident With Your Data?').should('be.visible');

      // Klik yes
      cy.get('button').contains('Yes').click();
      cy.wait(5000);
      cy.get('h2').contains('Attention!').should('be.visible');

      cy.window().then((win) => {
        cy.stub(win, 'open').as('openStub');
      });

      // Klik Payment Gateway
      cy.get('button').contains('Payment Gateway').click();
      cy.wait(5000);

      // ========================
      // NO ADMIN APPROVAL FIRST
      // =======================
    });
  });
});
