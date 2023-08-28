import { loginFunc, commonObject, approvalAdmin, RegistHandleAPIFromAdmin } from './../component/classFunction';

const commonFunction = new commonObject();
const registAPIHandle = new RegistHandleAPIFromAdmin();

describe('New Investors Register', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('STAGING_URL'));
    cy.wait(3000);
    cy.get('a').contains('Daftar').invoke('removeAttr', 'target').click();
    cy.wait(10000);
  });

  it('Users try to create new account without fill all required field', () => {
    // Langsung klik tombol Next
    cy.get('button').contains('Next').click();

    // Assert
    cy.get('h2').contains('OOPS!').should('be.visible');
  });

  it('Users try to create new account with only input some required field', () => {
    // Input full name
    const randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Langsung klik tombol Next
    cy.get('button').contains('Next').click();
    cy.wait(2000);

    // Assert
    cy.get('h2').contains('OOPS!').should('be.visible');
  });

  it('Users want to create account but with invalid format email', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input invalid email
    randCharacters = commonFunction.randomChar();
    cy.get('input[type="email"]').type(randCharacters).should('have.value', randCharacters);

    // Input pass and confirm pass
    const passTest = 'Abcdefg12345';
    cy.get('input[placeholder="Input Password"]').type(passTest).should('have.value', passTest);
    cy.wait(1000);
    cy.get('input[placeholder="Confirm Password"]').type(passTest).should('have.value', passTest);

    // Klik Next
    cy.get('button').contains('Next').click();
    cy.wait(2000);

    // Input country
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="country"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input State
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="state"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input City
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="city"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input Address
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="address"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Klik Register
    cy.get('button').contains('Register').click();
    cy.wait(2000);
    cy.get('h4').contains('Legal Information Prime Codex LLC').should('be.visible');

    // Input checkbox Aggree
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    cy.wait(1000);

    // Input checkbox Open Account
    cy.get('input[type="checkbox"]').eq(2).click();
    cy.get('input[type="checkbox"]').eq(2).should('be.checked');
    cy.wait(1000);

    // Klik Open Account
    cy.get('button').contains('Open Account').click();
    cy.wait(3500);

    // Assert failed
    cy.get('div').contains('Invalid Email').click();
  });

  it('Users want to input password without following password rules', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input valid email
    const randomEmail = commonFunction.randomEmail();
    cy.get('input[type="email"]').type(randomEmail).should('have.value', randomEmail);

    // Input pass and confirm pass
    randCharacters = commonFunction.randomPass();
    cy.get('input[placeholder="Input Password"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Assert error
    cy.get('p').contains('Please make sure password includes Capital, Number, and 8 Character long').should('be.visible');
  });

  it('Users want to create account but password and confirm password is not match', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input email
    const randomEmail = commonFunction.randomEmail();
    cy.get('input[type="email"]').type(randomEmail).should('have.value', randomEmail);

    // Input pass and confirm pass
    randCharacters = commonFunction.randomChar();
    cy.get('input[placeholder="Input Password"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);
    cy.get('input[placeholder="Confirm Password"]').type('sfdda').should('have.value', 'sfdda');

    // Assert error
    cy.get('p').contains('Password don`t match!').should('be.visible');
  });

  it('User want to open create primecodex account but without checklist agreement', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input invalid email
    const randomEmail = commonFunction.randomEmail();
    cy.get('input[type="email"]').type(randomEmail).should('have.value', randomEmail);

    // Input pass and confirm pass
    const passTest = 'Abcdefg12345';
    cy.get('input[placeholder="Input Password"]').type(passTest).should('have.value', passTest);
    cy.wait(1000);
    cy.get('input[placeholder="Confirm Password"]').type(passTest).should('have.value', passTest);

    // Klik Next
    cy.get('button').contains('Next').click();
    cy.wait(2000);

    // Input country
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="country"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input State
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="state"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input City
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="city"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input Address
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="address"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Klik Register
    cy.get('button').contains('Register').click();
    cy.wait(2000);
    cy.get('h4').contains('Legal Information Prime Codex LLC').should('be.visible');

    // Klik Open Account
    cy.get('button').contains('Open Account').click();
    cy.wait(3500);

    // Assert failed
    cy.get('p').contains('I Agree to Terms and Conditions Set by Prime Codex LLC').should('be.visible');
  });

  it('User want to open create primecodex account but with already registered email', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input invalid email
    const email = Cypress.env('EMAIL_VALID');
    cy.get('input[type="email"]').type(email).should('have.value', email);

    // Input pass and confirm pass
    const passTest = 'Abcdefg12345';
    cy.get('input[placeholder="Input Password"]').type(passTest).should('have.value', passTest);
    cy.wait(1000);
    cy.get('input[placeholder="Confirm Password"]').type(passTest).should('have.value', passTest);

    // Klik Next
    cy.get('button').contains('Next').click();
    cy.wait(2000);

    // Input country
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="country"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input State
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="state"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input City
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="city"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input Address
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="address"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Klik Register
    cy.get('button').contains('Register').click();
    cy.wait(2000);
    cy.get('h4').contains('Legal Information Prime Codex LLC').should('be.visible');

    // Input checkbox Aggree
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    cy.wait(1000);

    // Input checkbox Open Account
    cy.get('input[type="checkbox"]').eq(2).click();
    cy.get('input[type="checkbox"]').eq(2).should('be.checked');
    cy.wait(1000);

    // Klik Open Account
    cy.get('button').contains('Open Account').click();
    cy.wait(3500);

    // Assert failed
    cy.get('div').contains('Email have been used! Please use another email!').should('be.visible');
  });

  it('User want to open create primecodex account', () => {
    // Input full name
    let randCharacters = commonFunction.randomChar();
    cy.get('input[id="form-id-fullName"]').type(randCharacters).should('have.value', randCharacters);

    // Input no hp
    const randPhone = commonFunction.randomNumberPhone();
    cy.get('div[aria-haspopup="listbox"]').click();
    cy.wait(1000);
    cy.get('li[data-country-code="id"]').click();
    cy.wait(1000);
    cy.get('input[name="phone"]').type(randPhone);

    // Input valid email
    const randomEmail = commonFunction.randomEmail();
    cy.get('input[type="email"]').type(randomEmail).should('have.value', randomEmail);

    // Input pass and confirm pass
    const passTest = 'Abcdefg12345';
    cy.get('input[placeholder="Input Password"]').type(passTest).should('have.value', passTest);
    cy.wait(1000);
    cy.get('input[placeholder="Confirm Password"]').type(passTest).should('have.value', passTest);

    // Klik Next
    cy.get('button').contains('Next').click();
    cy.wait(2000);

    // Input country
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="country"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input State
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="state"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input City
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="city"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Input Address
    randCharacters = commonFunction.randomChar();
    cy.get('input[name="address"]').type(randCharacters).should('have.value', randCharacters);
    cy.wait(1000);

    // Klik Register
    cy.get('button').contains('Register').click();
    cy.wait(2000);
    cy.get('h4').contains('Legal Information Prime Codex LLC').should('be.visible');

    // Input checkbox Aggree
    cy.get('input[type="checkbox"]').eq(1).click();
    cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    cy.wait(1000);

    // Input checkbox Open Account
    cy.get('input[type="checkbox"]').eq(2).click();
    cy.get('input[type="checkbox"]').eq(2).should('be.checked');
    cy.wait(1000);

    // Get information from API regist
    cy.intercept('POST', `${Cypress.env('BASE_API_BETA')}/api/v2/auth/register`).as('getRegistDetails');

    // Klik Open Account
    cy.get('button').contains('Open Account').click();
    cy.wait(3500);

    // Assert failed
    cy.get('h2').contains('Congratulations!').should('be.visible');

    // Check API response details
    cy.wait('@getRegistDetails').then(($res) => {
      cy.log($res);
      const accountID = $res.response.body.data.account.id;
      const userID = $res.response.body.data.user.id;

      // Delete akun dan user berdasarkan ID nya
      registAPIHandle.deleteRegistAccountUser(accountID, userID);
    });
  });
});
