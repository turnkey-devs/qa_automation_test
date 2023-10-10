export class loginFunc {
  loginCorrect(email, pass) {
    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);

    // Input Pass
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);

    // Login
    cy.get('button[data-cy="submit"]').click();
    cy.wait(10000);
    cy.url().should('include', '/dashboard'); // Asert url harus ada path dashboard
    cy.get('h1').contains('My Account').should('be.visible'); // Assert kalau My Account terlihat di dashboard
    cy.wait(10000);
  }
}

export class commonObject {
  randomDropdownValue(selectPath, element) {
    // Logika untuk random value dropdown
    const randNumber = Math.floor(Math.random() * element.length);

    cy.wait(5000);

    // Pilih items dropdown
    const valueDrop = element[randNumber].text;
    cy.get(selectPath).select(valueDrop);
    cy.wait(1000);
  }

  randomDropdownValueDivPOA(element) {
    // Logika untuk random value dropdown
    let randNumber = Math.floor(Math.random() * element.length);

    // Pilih items dropdown
    cy.get(element[randNumber]).click({ force: true });
    cy.wait(1000);

    return randNumber;
  }

  randomNumberID() {
    const randChar = '0123456789';
    let empySpace = '';
    for (let i = 0; i < 15; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}`;
  }

  randomNumberPhone() {
    const randChar = '0123456789';
    let empySpace = '';
    for (let i = 0; i < 10; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}`;
  }

  randomChar() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 10; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `AutomationQA_${empySpace}`;
  }

  randomPass() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 10; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}`;
  }

  randomEmail() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 5; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `AutomationQA_${empySpace}@gmail.com`;
  }

  checkWithdrawlBalance() {
    cy.get('h4')
      .contains('Trading Account Information')
      .parent()
      .parent()
      .find('p')
      .eq(3)
      .then(($txt) => {
        const textBalance = $txt.text().split(' ');
        const textBalanceNumber = parseFloat(textBalance[textBalance.length - 1]);

        if (textBalanceNumber == 0 || textBalanceNumber <= 1) {
          //  Input akun yang ingin di withdraw kembali
          cy.get('select[name="select-account"] > option[name="select-account"]').then(($el) => {
            this.randomDropdownValue('select[name="select-account"]', $el);
          });
          cy.wait(2000);

          this.checkWithdrawlBalance();
        }
      });
  }
}

export class approvalAdmin {
  loginAdmin() {
    const email = Cypress.env('EMAIL_ADMIN');
    const pass = Cypress.env('PASS_ADMIN');

    // Buka web admin dan login
    cy.visit(Cypress.env('STAGING_ADMIN_URL'));
    cy.wait(3000);
    cy.get('input[name="email"]').type(email).should('have.value', email);
    cy.wait(500);
    cy.get('input[name="password"]').type(pass).should('have.value', pass);

    // Klik login
    cy.get('button').contains('Sign in').click();
    cy.wait(3500);

    // Assert
    cy.get('h5').contains('Dashboard').should('be.visible');
  }

  logoutAdmin() {
    cy.get('svg[data-icon="circle-user"]').click();
    cy.wait(3000);
    cy.get('span').contains('New Admin').should('be.visible');
  }

  approvalIdentity(id) {
    // Login admin
    this.loginAdmin();

    // Buka verification page
    cy.get('a[href="/verification/"]').click();
    cy.wait(5000);
    cy.get('h4').contains('Verification List').should('be.visible');
    cy.get('table').should('be.visible');

    // Cari data request berdasarkan id/account number
    cy.get('input[placeholder="Search data..."]').type(id);
    cy.wait(2500);

    // Approve request
    cy.get('svg[data-icon="check"]').click();
    cy.wait(1500);
    cy.get('h2').contains('Are your sure?').should('be.visible');
    cy.get('button').contains('Yes').click();
    cy.wait(5000);
    cy.get('h2').contains('SUCCESS!').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.get(3000);

    // Check status approval di request yang baru di approve
    cy.get('td').contains(id).parent().find('p').contains('APPROVED').should('be.visible');

    // Logout admin
    this.logoutAdmin();
  }

  approvalPOA() {
    // Login admin
    this.loginAdmin();

    // Buka verification page
    cy.get('a[href="/verification/"]').click();
    cy.wait(5000);
    cy.get('h4').contains('Verification List').should('be.visible');
    cy.get('table').should('be.visible');

    // Approve dari admin dengan ambil row paling atas
    cy.get('tbody > tr').eq(0).find('svg[data-icon="check"]').click();
    cy.wait(1500);
    cy.get('h2').contains('Are your sure?').should('be.visible');
    cy.get('button').contains('Yes').click();
    cy.wait(5000);
    cy.get('h2').contains('SUCCESS!').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.get(3000);

    // Assert kalau sukses approve dari admin
    cy.get('tbody > tr').eq(0).find('td > p').contains('APPROVED').should('be.visible');

    // Logout admin
    this.logoutAdmin();
  }

  approvalWithdrawal() {
    // Login admin
    this.loginAdmin();

    // Buka payment page
    cy.get('a[href="/payment/"]').click();
    cy.wait(5000);
    cy.get('h4').contains('Payment List').should('be.visible');

    // Buka Withdraw
    cy.get('button').contains('Withdraw').click();
    cy.wait(3000);
    cy.get('table').should('be.visible');

    // Approve dari admin dengan ambil row paling atas
    cy.get('tbody > tr').eq(0).find('svg[data-icon="check"]').click();
    cy.wait(1500);
    cy.get('h4').contains('Account will be updated to').should('be.visible');
    cy.get('textarea[name="comment"]').type('Test').should('have.value', 'Test');
    cy.get('button').contains('Confirm').click();
    cy.wait(2000);
    cy.get('h2').contains('Are your sure?').should('be.visible');
    cy.get('button').contains('Yes').click();
    cy.wait(10000);
    cy.get('h2').contains('SUCCESS!').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.get(3000);

    // Logout admin
    this.logoutAdmin();
  }

  approvalDeposit() {
    // Login admin
    this.loginAdmin();

    // Buka payment page
    cy.get('a[href="/payment/"]').click();
    cy.wait(5000);
    cy.get('h4').contains('Payment List').should('be.visible');
    cy.get('table').should('be.visible');

    // Approve dari admin dengan ambil row paling atas
    cy.get('tbody > tr').eq(0).find('svg[data-icon="check"]').click();
    cy.wait(1500);
    cy.get('h4').contains('Account will be updated to').should('be.visible');
    cy.get('textarea[name="comment"]').clear().type('Test').should('have.value', 'Test');
    cy.get('button').contains('Confirm').click();
    cy.wait(2000);
    cy.get('h2').contains('Are your sure?').should('be.visible');
    cy.get('button').contains('Yes').click();
    cy.wait(10000);
    cy.get('h2').contains('SUCCESS!').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.get(3000);

    // Logout admin
    this.logoutAdmin();
  }
}

export class ApproveAdminFromAPI {
  approvePayment(paymentID, lastBalance) {
    const pemKey = Cypress.env('PEM_KEY');
    const baseURL = Cypress.env('BASE_API_STAGING');

    const bodyLogin = {
      email: Cypress.env('EMAIL_ADMIN'),
      password: Cypress.env('PASS_ADMIN'),
    };

    const bodyApprovePayment = {
      account_last_balance: lastBalance,
      amount: 1,
      comment: 'TestAPIHitAutomation',
      status: 'SUCCESS',
    };

    const bodyAppToken = {
      appId: '18',
      name: 'Codex-Greylabel',
      broker: {},
      link: {},
    };

    cy.request({
      method: 'POST',
      url: `${baseURL}/api/v2/admin/app-token`,
      headers: {
        'x-pem-key': pemKey,
      },
      failOnStatusCode: false,
      body: bodyAppToken,
    }).then(($resToken) => {
      const appToken = $resToken.body.data.token;

      cy.request({
        method: 'POST',
        url: `${baseURL}/api/v2/auth/admin/login`,
        headers: {
          'X-App-Token': appToken,
          Accept: 'application/json',
        },
        failOnStatusCode: false,
        body: bodyLogin,
      }).then(($res) => {
        const userToken = $res.body.data.token;

        // Request untuk approve ticket
        cy.request({
          method: 'PUT',
          url: `${baseURL}/api/v2/payment/${paymentID}/status`,
          headers: {
            'X-App-Token': appToken,
            'X-User-Token': userToken,
          },
          failOnStatusCode: false,
          body: bodyApprovePayment,
        }).then(($resAppr) => {
          const statusMessage = $resAppr.body.data.payment.status;

          expect(statusMessage).to.equal('SUCCESS');
        });
      });
    });
  }
}

export class Deposit {
  depositLocalCancel() {
    const commonFunction = new commonObject();
    const approvalAdminFromAPI = new ApproveAdminFromAPI();

    // Input akun yang ingin di deposit
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account-value"]').then(($el) => {
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
    cy.wait(20000);
    cy.get('div').contains('To complete your payment', { timeout: 10000 }).should('be.visible');
    cy.get('button').contains('Transfer Manual').click();
    cy.wait(5000);
    cy.url().should('include', '/verify-time');

    // Buka account dashboard
    cy.get('a[href="/dashboard"]').contains('Account').click();
    cy.wait(5000);

    // Check status verified identity dan klik cancel
    cy.get('h1').contains('Payment History').scrollIntoView();
    cy.get(5000);
    cy.get('thead').then(($el) => {
      const rowTd = $el.length;
      if (rowTd == 0) {
        cy.reload();
        cy.wait(10000);
      }
    });
    cy.wait(15000);
    cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
    cy.wait(1000);
    cy.get('h2').contains('Do you want to cancel the deposit?').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.wait(10000);
    cy.get('h2').contains('Success').should('be.visible');
  }

  depositLocal() {
    const commonFunction = new commonObject();
    const approvalAdminFromAPI = new ApproveAdminFromAPI();

    // Input akun yang ingin di deposit
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account-value"]').then(($el) => {
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
    cy.wait(20000);
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
    cy.wait(10000);
    cy.get('h2').contains('Success').should('be.visible');
  }

  depositCryptoCancel() {
    const commonFunction = new commonObject();
    const approvalAdminFromAPI = new ApproveAdminFromAPI();

    // Input akun yang ingin di deposit
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account-value"]').then(($el) => {
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
    cy.wait(20000);
    cy.url().should('include', '/verify-time');

    // Buka account dashboard
    cy.get('a[href="/dashboard"]').contains('Account').click({ force: true });
    cy.wait(5000);

    // Check status verified identity dan klik cancel
    cy.get('h1').contains('Payment History').scrollIntoView();
    cy.get(5000);
    cy.get('thead').then(($el) => {
      const rowTd = $el.length;
      if (rowTd == 0) {
        cy.reload();
        cy.wait(10000);
      }
    });
    cy.wait(15000);
    cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
    cy.wait(1000);
    cy.get('h2').contains('Do you want to cancel the deposit?').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.wait(10000);
    cy.get('h2').contains('Success').should('be.visible');
  }

  depositCrypto() {
    const commonFunction = new commonObject();

    // Input akun yang ingin di deposit
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account-value"]').then(($el) => {
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
    cy.wait(25000);
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
  }
}

export class WithdrawCrypto {
  withdrawCryptoAcceptAPI() {
    const commonFunction = new commonObject();
    const approvalAdminFromAPI = new ApproveAdminFromAPI();

    //  Input akun yang ingin di withdraw
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account"]').then(($el) => {
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
    cy.get('div').contains('Withdrawal Crypto').should('be.visible');

    // Intercept API untuk ambil withdraw payment ID
    cy.intercept('POST', `${Cypress.env('BASE_API_STAGING')}/api/v2/payment/withdraw`).as('getPaymentID');

    // Klik continue dan yes
    cy.get('button').contains('Continue').click();
    cy.get(2000);
    cy.get('button').contains('Yes').click();
    cy.wait(10000);

    cy.wait('@getPaymentID').then(($res) => {
      cy.log($res);
      const statusCodeAPI = $res.response.statusCode;

      // Logic apabila status API tidak sesuai
      if (statusCodeAPI == 400 || statusCodeAPI == 401 || statusCodeAPI == 402 || statusCodeAPI == 403 || statusCodeAPI == 404 || statusCodeAPI == 500) {
        cy.reload();
        cy.wait(5000);

        // Input data withdraw lagi
        this.withdrawCryptoAcceptAPI();
      } else {
        const paymentID = $res.response.body.data.payment.id;
        const lastBalance = $res.response.body.data.payment.account.last_balance;

        // Cek approval admin lewat API
        approvalAdminFromAPI.approvePayment(paymentID, lastBalance);

        cy.get('h2').contains('Your request will be processed').should('be.visible');
        cy.get('button').contains('Oke').click();
        cy.wait(3000);
      }
    });
  }

  withdrawCryptoInvalidFile() {
    const commonFunction = new commonObject();

    //  Input akun yang ingin di withdraw
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account"]').then(($el) => {
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
  }
}

export class WithdrawLocal {
  withdrawLocalAcceptAPI() {
    const commonFunction = new commonObject();
    const approvalAdminFromAPI = new ApproveAdminFromAPI();

    //  Input akun yang ingin di withdraw
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account"]').then(($el) => {
      commonFunction.randomDropdownValue('select[name="select-account"]', $el);
    });
    cy.wait(2000);

    //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
    commonFunction.checkWithdrawlBalance();

    // Input amount (input $1 saja)
    cy.get('input[name="amount"]').type(1).should('have.value', 1);

    // Apabila verification POA sudah bank, maka skip input info bank dan lanjut klik checkbox
    cy.get('label[for="akun-pemilik"]')
      .parent()
      .find('input')
      .then(($el) => {
        if (!$el.attr('readonly')) {
          // Input nama akun
          const randCharacters = commonFunction.randomChar();
          cy.get('input[name="input_akun_pemilik"]').clear().type(randCharacters).should('have.value', randCharacters);

          // Input nomor akun
          const randNumber = commonFunction.randomNumberID();
          cy.get('input[name="input_nomor_akun"]').clear().type(randNumber).should('have.value', randNumber);

          // Input nama bank
          const randCharacters2 = commonFunction.randomChar();
          cy.get('div[class="item"]').contains('Other').click({ force: true });
          cy.get('input[name="select-bank"]').clear().type(randCharacters2).should('have.value', randCharacters2);
        }
      });

    // Input checkbox
    cy.get('input[type="checkbox"]').click();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.wait(1000);

    // Intercept API untuk ambil withdraw payment ID
    cy.intercept('POST', `${Cypress.env('BASE_API_STAGING')}/api/v2/payment/withdraw`).as('getPaymentID');

    // Klik tombol request withdraw
    cy.get('button').contains('Request Withdraw').click();
    cy.wait(2000);
    cy.get('div').contains('Withdrawal Bank').should('be.visible');

    // Klik continue dan yes
    cy.get('button').contains('Continue').click();
    cy.get(2000);
    cy.get('button').contains('Yes').click();
    cy.wait(10000);

    // Check payment ID
    cy.wait('@getPaymentID').then(($res) => {
      cy.log($res);
      const statusCodeAPI = $res.response.statusCode;

      if (statusCodeAPI == 400 || statusCodeAPI == 401 || statusCodeAPI == 402 || statusCodeAPI == 403 || statusCodeAPI == 404 || statusCodeAPI == 500) {
        cy.reload();
        cy.wait(5000);

        // Input data withdraw lagi
        this.withdrawLocalAcceptAPI();
      } else {
        const paymentID = $res.response.body.data.payment.id;
        const lastBalance = $res.response.body.data.payment.account.last_balance;

        // Cek approval admin lewat API
        approvalAdminFromAPI.approvePayment(paymentID, lastBalance);

        cy.get('h2').contains('Success').should('be.visible');
        cy.get('button').contains('Oke').click();
        cy.wait(3000);
      }
    });
  }

  withdrawLocalCancel() {
    const commonFunction = new commonObject();

    //  Input akun yang ingin di withdraw
    cy.wait(2000);
    cy.get('select[name="select-account"] > option[name="select-account"]').then(($el) => {
      commonFunction.randomDropdownValue('select[name="select-account"]', $el);
    });
    cy.wait(2000);

    //  Cek balance apakah 0 atau tidak. Kalau 0 maka pilih akun lagi
    commonFunction.checkWithdrawlBalance();

    // Input amount (input $1 saja)
    cy.get('input[name="amount"]').type(1).should('have.value', 1);

    // Apabila verification POA sudah bank, maka skip input info bank dan lanjut klik checkbox
    cy.get('label[for="akun-pemilik"]')
      .parent()
      .find('input')
      .then(($el) => {
        if (!$el.attr('readonly')) {
          // Input nama akun
          const randCharacters = commonFunction.randomChar();
          cy.get('input[name="input_akun_pemilik"]').clear().type(randCharacters).should('have.value', randCharacters);

          // Input nomor akun
          const randNumber = commonFunction.randomNumberID();
          cy.get('input[name="input_nomor_akun"]').clear().type(randNumber).should('have.value', randNumber);

          // Input nama bank
          const randCharacters2 = commonFunction.randomChar();
          cy.get('div[class="item"]').contains('Other').click({ force: true });
          cy.get('input[name="select-bank"]').clear().type(randCharacters2).should('have.value', randCharacters2);
        }
      });

    // Input checkbox
    cy.get('input[type="checkbox"]').click();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.wait(1000);

    // Klik tombol request withdraw
    cy.get('button').contains('Request Withdraw').click();
    cy.wait(2000);
    cy.get('div').contains('Withdrawal Bank').should('be.visible');

    // Klik continue dan yes
    cy.get('button').contains('Continue').click();
    cy.get(2000);
    cy.get('button').contains('Yes').click();
    cy.wait(10000);
    cy.get('h2').contains('Success').should('be.visible');
    cy.get('button').contains('Oke').click();
    cy.wait(5000);

    // Check status verified identity dan klik cancel
    cy.get('h1').contains('Payment History').scrollIntoView();
    cy.get(10000);

    // Apabila table element tidak muncul, refresh
    cy.get('h1')
      .contains('Payment History')
      .parent()
      .then(($el) => {
        if ($el.find('div > table > tr').length < 1) {
          cy.reload();
          cy.get('h1').contains('Payment History').scrollIntoView();
          cy.wait(10000);
        }
      });

    cy.get('table > tr').eq(0).find('td > button').contains('Cancel').click();
    cy.wait(1000);
    cy.get('h2').contains('Do you want to cancel the withdrawal?').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.wait(5000);
    cy.get('h2').contains('Success').should('be.visible');
    cy.get('button').contains('OK').click();
  }
}

export class RegistHandleAPIFromAdmin {
  deleteRegistAccountUser(accountID, userID) {
    const endpointAccountDelete = `${Cypress.env('BASE_API_BETA')}/api/v2/account/${accountID}`;
    const endpointUserDelete = `${Cypress.env('BASE_API_BETA')}/api/v2/user/${userID}`;

    const bodyLogin = {
      email: Cypress.env('EMAIL_ADMIN'),
      password: Cypress.env('PASS_ADMIN'),
    };

    const bodyAppToken = {
      appId: '24',
      name: 'Codex-Greylabel',
      broker: {},
      link: {},
    };

    cy.request({
      method: 'POST',
      url: `${Cypress.env('BASE_API_STAGING')}/api/v2/admin/app-token`,
      headers: {
        'x-pem-key': Cypress.env('PEM_KEY'),
      },
      failOnStatusCode: false,
      body: bodyAppToken,
    }).then(($resToken) => {
      cy.log($resToken);
      const appToken = $resToken.body.data.token;

      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_API_BETA')}/api/v2/auth/admin/login`,
        headers: {
          'X-App-Token': appToken,
          Accept: 'application/json',
        },
        failOnStatusCode: false,
        body: bodyLogin,
      }).then(($res) => {
        const userToken = $res.body.data.token;

        // API Delete New Account
        cy.request({
          method: 'DELETE',
          url: endpointAccountDelete,
          headers: {
            'X-App-Token': appToken,
            'X-User-Token': userToken,
          },
          failOnStatusCode: false,
        }).then(($resDelAcc) => {
          cy.log($resDelAcc);
          const statusMessage = $resDelAcc.body.status;

          expect(statusMessage).to.equal('SUCCESS');
        });

        // API Delete New User
        cy.request({
          method: 'DELETE',
          url: endpointUserDelete,
          headers: {
            'X-App-Token': appToken,
            'X-User-Token': userToken,
          },
          failOnStatusCode: false,
        }).then(($resDelUsr) => {
          cy.log($resDelUsr);
          const statusMessage = $resDelUsr.body.status;

          expect(statusMessage).to.equal('SUCCESS');
        });
      });
    });
  }
}
