describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('be.visible');
  });

  it('should disable the login button if the form is invalid', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should enable the login button if the form is valid', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('123456');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should display an error message for invalid email', () => {
    cy.get('#email').type('invalid-email');
    cy.get('#email').blur();
    cy.get('.error').should('contain', 'Valid email is required.');
  });

  it('should log in successfully with valid credentials', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { success: true },
    }).as('loginRequest');

    cy.get('#email').type('test@example.com');
    cy.get('#password').type('123456');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest');
    cy.get('.success-message').should('contain', 'Login successful!');
  });

  it('should display an error message on login failure', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Login failed. Please try again.' },
    }).as('loginRequest');

    cy.get('#email').type('wrong@example.com');
    cy.get('#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest');
    cy.get('.error-message').should('contain', 'Login failed. Please try again.');
  });
});
