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

  randomChar() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 15; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `${empySpace}`;
  }
}

export class approvalAdmin {
  loginAdmin() {
    const email = 'health.check@turnkey.id';
    const pass = 'HealthCheck11!!';

    // Buka web admin dan login
    cy.visit('https://new-admin-staging.primecodex.com/');
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
}
