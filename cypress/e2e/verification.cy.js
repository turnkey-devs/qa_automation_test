import { loginFunc, commonObject, approvalAdmin } from './../component/classFunction';

const loginFunction = new loginFunc();
const commonFunction = new commonObject();
const approvalAdminFunction = new approvalAdmin();

describe('New Investors Register', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://staging-secure-pamm2.primecodex.com/');
    cy.wait(3000);
  });

  context('Login To Primecodex', () => {
    it('New users want to verification their account but without input all required field', () => {
      const email = 'testingqaassignment@gmail.com';
      const pass = 'Testing1234';

      // Login
      loginFunction.loginCorrect(email, pass);

      // Klik tombol verify now pada my identity
      cy.get('a[href="/identity"] > button').contains('Verify Now').click();
      cy.wait(2000);

      // Assert membuka halaman yang sesuai
      cy.url().should('include', '/identity');
      cy.get('h1').contains('Identity Verification Request').should('be.visible');

      // Langsung klik tombol submit
      cy.get('button').contains('Submit').click();
      cy.wait(2000);

      // Assert adanya validasi
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });

    it('New users want to verification their account but input wrong format images files', () => {
      const email = 'testingqaassignment@gmail.com';
      const pass = 'Testing1234';

      // Login
      loginFunction.loginCorrect(email, pass);

      // Klik tombol verify now pada my identity
      cy.get('a[href="/identity"] > button').contains('Verify Now').click();
      cy.wait(2000);

      // Assert membuka halaman yang sesuai
      cy.url().should('include', '/identity');
      cy.get('h1').contains('Identity Verification Request').should('be.visible');

      // Input field jenis ID
      cy.get('select[name="type"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="type"]', $el);
      });

      // Input field ID Number
      const numberID = commonFunction.randomNumberID();
      cy.get('input[id="id-number"]').type(numberID).should('have.value', numberID);

      // Input field file dengan value yang tidak sesuai
      cy.get('input[type="file"]').selectFile('cypress\\fixtures\\pdfExample.pdf');
      cy.wait(2000);

      // Assert pop up error muncul
      cy.get('h2').contains('Your file is not an image').should('be.visible');
      cy.get('button').contains('OK').click();
    });

    it('New users want to verification their identity account with correct value', () => {
      const email = 'testingqaassignment@gmail.com';
      const pass = 'Testing1234';

      // Login
      loginFunction.loginCorrect(email, pass);

      // Klik tombol verify now pada my identity
      cy.get('a[href="/identity"] > button').contains('Verify Now').click();
      cy.wait(2000);

      // Assert membuka halaman yang sesuai
      cy.url().should('include', '/identity');
      cy.get('h1').contains('Identity Verification Request').should('be.visible');

      // Input field jenis ID
      cy.get('select[name="type"] > option').then(($el) => {
        commonFunction.randomDropdownValue('select[name="type"]', $el);
      });

      // Input field ID Number
      const numberID = commonFunction.randomNumberID();
      cy.get('input[id="id-number"]').type(numberID).should('have.value', numberID);

      // Input field file dengan value yang sesuai
      cy.get('input[type="file"]').selectFile('cypress\\fixtures\\PicExample.png');
      cy.wait(2000);

      // Klik submit
      cy.get('button').contains('Submit').click();
      cy.wait(1000);

      // Klik Yes di verify identity pop up
      cy.get('button').contains('Yes').click();
      cy.wait(4000);

      // Assert sukses send request approve identity
      cy.get('h1').contains('Pending Verification').should('be.visible');
      cy.url().should('include', '/verify-pending');

      // Buka login admin staging untuk approval verification
      approvalAdminFunction.approvalIdentity(numberID);

      // Buka primecodex staging kembali dan login
      cy.visit('https://staging-secure-pamm2.primecodex.com/');
      cy.wait(3000);
      loginFunction.loginCorrect(email, pass);

      // Check status verified identity
      cy.get('a[href="/identity"]').parent().find('button').contains('Verified').should('be.visible');
    });

    it('Users want to verify their banking adress request but without fill any field', () => {
      const email = 'testingqaassignment@gmail.com';
      const pass = 'Testing1234';

      // Login
      loginFunction.loginCorrect(email, pass);

      // Klik tombol verify now pada proof of address
      cy.get('a[href="/verify-poa"] > button').contains('Verify Now').click();
      cy.wait(2000);

      // Assert membuka halaman yang sesuai
      cy.url().should('include', '/verify-poa');
      cy.get('h1').contains('Proof of Address Request').should('be.visible');

      // Langsung klik tombol submit
      cy.get('button').contains('Submit').click();
      cy.wait(2000);

      // Assert adanya validasi
      cy.get('h2').contains('Incomplete Data!').should('be.visible');
      cy.get('button').contains('Oke').click();
      cy.wait(1000);
    });

    it.only('Users want to verify their banking adress request but with invalid format file', () => {
      const email = 'testingqaassignment@gmail.com';
      const pass = 'Testing1234';

      // Login
      loginFunction.loginCorrect(email, pass);

      // Klik tombol verify now pada proof of address
      cy.get('a[href="/verify-poa"] > button').contains('Verify Now').click();
      cy.wait(2000);

      // Assert membuka halaman yang sesuai
      cy.url().should('include', '/verify-poa');
      cy.get('h1').contains('Proof of Address Request').should('be.visible');

      // Input field jenis ID
      cy.get('div[class="menu hidden"] > div').then(($el) => {
        // Pilih dropdown dan ambil number index item yang dipilih
        const number = commonFunction.randomDropdownValueDivPOA($el);

        // Ambil string item div
        cy.get($el[number])
          .invoke('text')
          .then(($txt) => {
            // Kondisi berdasarkan input yang diberikan
            if ($txt == 'Bank or Credit Card Statement') {
              // Input field bank number
              const numberID = commonFunction.randomNumberID();
              cy.get('input[name="bank-number"]').type(numberID).should('have.value', numberID);

              // Input nama bank
              cy.get('div[class="menu hidden"]')
                .eq(1)
                .find('div')
                .then(($el2) => {
                  // Pilih dropdown dan ambil number index item yang dipilih
                  commonFunction.randomDropdownValueDivPOA($el2);
                });

              // Input bank account name
              const randChar = commonFunction.randomChar();
              cy.get('input[name="account-name"]').eq(0).type(randChar).should('have.value', randChar);
            } else if ($txt == 'Other') {
              // Input other explaination
              const randChar = commonFunction.randomChar();
              cy.get('input[placeholder="Explain..."]').type(randChar).should('have.value', randChar);
            }
          });
      });

      // Input notes
      const randChar = commonFunction.randomChar();
      cy.get('input[name="account-name"]').eq(1).type(randChar).should('have.value', randChar);
      cy.wait(1000);

      // Input field file dengan value yang tidak sesuai
      cy.get('input[type="file"]').selectFile('cypress\\fixtures\\pdfExample.pdf');
      cy.wait(2000);

      // Assert pop up error muncul
      cy.get('h2').contains('Your file is not an image').should('be.visible');
      cy.get('button').contains('OK').click();
    });

    it('Users want to verify their banking adress request but with correct value', () => {});
  });
});
