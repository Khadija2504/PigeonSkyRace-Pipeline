describe('Login Component', () => {

  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should render the login form correctly', () => {
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist').and('have.attr', 'type', 'email');
    cy.get('input[name="password"]').should('exist').and('have.attr', 'type', 'password');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Login');
  });

  it('should validate the login form', () => {
    cy.get('button[type="submit"]').click();

    cy.get('input[name="email"]')
      .parent()
      .should('contain', 'Valid email is required.');

    cy.get('input[name="password"]')
      .parent()
      .should('contain', 'Password must be at least 6 characters.');

    cy.get('input[name="email"]').clear().type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="email"]')
      .parent()
      .should('contain', 'Valid email is required.');

    cy.get('input[name="password"]').clear().type('123');
    cy.get('button[type="submit"]').click();
    cy.get('input[name="password"]')
      .parent()
      .should('contain', 'Password must be at least 6 characters.');
  });

  it('should successfully login with valid credentials and redirect based on role', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'mock-token' },
    }).as('loginRequest');

    cy.intercept('GET', '/api/auth/role', {
      statusCode: 200,
      body: { role: 'breeder' },
    }).as('roleRequest');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.wait('@roleRequest').its('response.statusCode').should('eq', 200);
    cy.contains('Login successful! Redirecting...').should('exist');
    cy.url().should('eq', `${Cypress.config().baseUrl}/pigeon/pigeonsList`);
  });

  it('should show an error message for invalid credentials', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid email or password' },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
    cy.contains('Invalid email or password').should('exist');
  });

  it('should disable submit button while submitting', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.intercept('POST', '/api/auth/login', {
      delay: 1000,
      body: { token: 'mock-token' },
      statusCode: 200,
    }).as('loginRequest');

    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait('@loginRequest');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

});
