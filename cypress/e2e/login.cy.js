describe('New Investors Register', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('https://staging-secure-pamm2.primecodex.com/');
    cy.wait(3000);
  });

  it('Users at login page and want to login but not input all field', () => {
    // Klik login langsung
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);

    // Assert kalau tidak bisa dan tetap berada dihalaman login
    cy.get('h1').contains('Login Account').should('be.visible');
  });

  it('Users at login page and want to login but only input email field', () => {
    const email = 'test@gmail.com';

    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);
    cy.wait(1000);

    // Klik login langsung
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);

    // Assert kalau tidak bisa dan tetap berada dihalaman login
    cy.get('h1').contains('Login Account').should('be.visible');
  });

  it('Users at login page and want to login but only input password field', () => {
    const pass = 'Testing1234';

    // Input Email
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);
    cy.wait(1000);

    // Klik login langsung
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);

    // Assert kalau tidak bisa dan tetap berada dihalaman login
    cy.get('h1').contains('Login Account').should('be.visible');
  });

  it('Users at login page and want to login but with not valid email format', () => {
    const email = 'notvalidemail';
    const pass = 'Testing1234';

    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);

    // Input Pass
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);

    // Login
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);
    cy.get('div').contains('user not found. please register or try again').should('be.visible'); // Assert kalau pop up error muncul
  });

  it('Users at login page and want to login but with not valid/registered account', () => {
    const email = 'notregistered@gmail.com';
    const pass = 'Testing1234';

    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);

    // Input Pass
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);

    // Login
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);
    cy.get('div').contains('user not found. please register or try again').should('be.visible'); // Assert kalau pop up error muncul
  });

  it('Users at login page and want to login and login with correct account', () => {
    const email = 'testingqaassignment@gmail.com';
    const pass = 'Testing1234';

    // Input Email
    cy.get('input[placeholder="Email"]').type(email).should('have.value', email);

    // Input Pass
    cy.get('input[placeholder="password"]').type(pass).should('have.value', pass);

    // Login
    cy.get('button[data-cy="submit"]').click();
    cy.wait(3000);
    cy.url().should('include', '/dashboard'); // Asert url harus ada path dashboard
    cy.get('h1').contains('My Account').should('be.visible'); // Assert kalau My Account terlihat di dashboard
  });
});
