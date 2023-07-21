export class loginFunc {
  loginCorrect(email, pass) {
    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);

    // Input Pass
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);

    // Login
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);
    cy.url().should('include', '/dashboard'); // Asert url harus ada path dashboard
    cy.get('h1').contains('My Account').should('be.visible'); // Assert kalau My Account terlihat di dashboard
  }
}

export class commonObject {
  randomDropdownValue(selectPath, element) {
    // Logika untuk random value dropdown
    let randNumber = Math.floor(Math.random() * element.length);
    if (randNumber == 0) {
      randNumber = randNumber + 1;
    }

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
    for (let i = 0; i < 15; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}`;
  }

  randomEmail() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 8; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}@gmail.com`;
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

        if (textBalanceNumber == 0) {
          //  Input akun yang ingin di withdraw kembali
          cy.get('select[name="select-account"] > option').then(($el) => {
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
    cy.wait(5000);
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
    cy.wait(5000);
    cy.get('h2').contains('SUCCESS!').should('be.visible');
    cy.get('button').contains('OK').click();
    cy.get(3000);

    // Logout admin
    this.logoutAdmin();
  }
}
