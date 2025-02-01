describe('PigeonFormComponent', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/auth/login');
  
      cy.get('#email').type('jowikig@mailinator.com');
      cy.get('#password').type('Pa$$w0rd!');
      cy.get('button[type="submit"]').click();
  
      cy.get('.success-message').should('contain', 'Login successful!');
  
      cy.visit('/pigeon/addPigeon');
    });
  
    it('should display validation errors when the form is submitted with empty fields', () => {
      cy.get('#name').focus().blur();
      cy.get('#age').focus().blur();
      cy.get('#gender').focus().blur();
      cy.get('#color').focus().blur();
  
      cy.get('.error').should('contain', 'Name is required.');
      cy.get('.error').should('contain', 'age is required');
      cy.get('.error').should('contain', 'Valid gender is required and it must be \'male\' or \'female\'.');
      cy.get('.error').should('contain', 'valid color is required.');
    });
  
    it('should successfully add a pigeon and redirect to the pigeons list page', () => {
      cy.intercept('POST', '/api/breeder/addPigeon', {
        statusCode: 200,
        body: { message: 'Pigeon added successfully' },
      }).as('addPigeon');
  
      cy.get('#name').type('Pigeon1');
      cy.get('#age').type('2');
      cy.get('#gender').select('Male');
      cy.get('#color').type('Gray');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addPigeon');
  
      cy.get('.success-message').should('contain', 'pigeon added succesfully!!');
      cy.url().should('include', '/pigeon/pigeonsList');
    });
  
    it('should display an error message when the API call fails', () => {
      cy.intercept('POST', '/api/breeder/addPigeon', {
        statusCode: 500,
        body: { message: 'add pigeon fild' },
      }).as('addPigeon');
  
      cy.get('#name').type('Pigeon1');
      cy.get('#age').type('2');
      cy.get('#gender').select('Male');
      cy.get('#color').type('Gray');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addPigeon');
  
      cy.get('.error-message').should('contain', 'add pigeon fild');
    });
  
    it('should redirect to the login page if the user is not logged in', () => {
      cy.clearLocalStorage();
  
      cy.visit('/pigeon/addPigeon');
  
      cy.url().should('include', '/auth/login');
    });
  });