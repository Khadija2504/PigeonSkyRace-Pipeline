describe('Register Page', () => {
    beforeEach(() => {
      cy.visit('/auth/register');
    });
  
    it('should display the registration form', () => {
      cy.get('form').should('be.visible');
      cy.get('#username').should('be.visible');
      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#confirmPassword').should('be.visible');
      cy.get('#latitude').should('be.visible');
      cy.get('#longitude').should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('should show validation errors for required fields', () => {
        cy.get('#username').focus().blur();
        cy.get('.error').should('contain', 'Username is required (min 3 characters).');
      
        cy.get('#name').focus().blur();
        cy.get('.error').should('contain', 'Name is required.');
      
        cy.get('#email').focus().blur();
        cy.get('.error').should('contain', 'Valid email is required.');
      
        cy.get('#password').focus().blur();
        cy.get('.error').should('contain', 'Password must be at least 6 characters.');
      
        cy.get('#confirmPassword').type('123456').blur();
        cy.get('#password').type('123');
        cy.get('.error').should('contain', 'Passwords do not match.');
      
        cy.get('#latitude').focus().blur();
        cy.get('.error').should('contain', 'Valid latitude is required.');
      
        cy.get('#longitude').focus().blur();
        cy.get('.error').should('contain', 'Valid longitude is required.');
      });
      
  
    it('should enable the register button if the form is valid', () => {
      cy.get('#username').type('testuser');
      cy.get('#name').type('Test User');
      cy.get('#email').type('test@example.com');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('#latitude').type('12.345');
      cy.get('#longitude').type('-54.321');
      cy.get('button[type="submit"]').should('not.be.disabled');
    });
  
    it('should show an error message for mismatched passwords', () => {
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('wrongpassword');
      cy.get('#confirmPassword').blur();
      cy.get('.error').should('contain', 'Passwords do not match.');
    });
  
    it('should register successfully with valid inputs', () => {
      cy.intercept('POST', '/api/auth/register', {
        statusCode: 201,
        body: { success: true },
      }).as('registerRequest');
  
      cy.get('#username').type('testuser');
      cy.get('#name').type('Test User');
      cy.get('#email').type('test@example.com');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('#latitude').type('12.345');
      cy.get('#longitude').type('-54.321');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registerRequest');
      cy.get('.success-message').should('contain', 'Registration successful! Redirecting to login...');
    });
  
    it('should display an error message for failed registration', () => {
      cy.intercept('POST', '/api/auth/register', {
        statusCode: 400,
        body: { message: 'Registration failed. Email already exists.' },
      }).as('registerRequest');
  
      cy.get('#username').type('testuser');
      cy.get('#name').type('Test User');
      cy.get('#email').type('existing@example.com');
      cy.get('#password').type('123456');
      cy.get('#confirmPassword').type('123456');
      cy.get('#latitude').type('12.345');
      cy.get('#longitude').type('-54.321');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@registerRequest');
      cy.get('.error-message').should('contain', 'Registration failed. Email already exists.');
    });
  });
  