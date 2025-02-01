describe('PigeonListComponent', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/auth/login');
  
        cy.get('#email').type('jowikig@mailinator.com');
        cy.get('#password').type('Pa$$w0rd!');
        cy.get('button[type="submit"]').click();
        cy.get('.success-message').should('contain', 'Login successful!');
        cy.visit('/pigeon/pigeonsList');
    });
  
    it('should display the table when pigeons are loaded successfully', () => {
      cy.intercept('GET', '/api/breeder/getAllPigeons', {
        statusCode: 200,
        body: [
          { name: 'Pigeon1', age: 2, color: 'Gray', gender: 'Male', badge: '123' },
          { name: 'Pigeon2', age: 3, color: 'White', gender: 'Female', badge: '456' },
        ],
      }).as('getPigeons');
  
      cy.wait('@getPigeons');
  
      cy.get('table').should('exist');
  
      cy.get('table thead th').eq(0).should('contain', 'Name');
      cy.get('table thead th').eq(1).should('contain', 'Age');
      cy.get('table thead th').eq(2).should('contain', 'Color');
      cy.get('table thead th').eq(3).should('contain', 'Gender');
      cy.get('table thead th').eq(4).should('contain', 'Badge');
  
      cy.get('table tbody tr').should('have.length', 2);
      cy.get('table tbody tr').eq(0).within(() => {
        cy.get('td').eq(0).should('contain', 'Pigeon1');
        cy.get('td').eq(1).should('contain', '2');
        cy.get('td').eq(2).should('contain', 'Gray');
        cy.get('td').eq(3).should('contain', 'Male');
        cy.get('td').eq(4).should('contain', '123');
      });
      cy.get('table tbody tr').eq(1).within(() => {
        cy.get('td').eq(0).should('contain', 'Pigeon2');
        cy.get('td').eq(1).should('contain', '3');
        cy.get('td').eq(2).should('contain', 'White');
        cy.get('td').eq(3).should('contain', 'Female');
        cy.get('td').eq(4).should('contain', '456');
      });
    });
  
    it('should display "No pigeons found" when the pigeons list is empty', () => {
      cy.intercept('GET', '/api/breeder/getAllPigeons', {
        statusCode: 200,
        body: [],
      }).as('getPigeons');
  
      cy.wait('@getPigeons');
  
      cy.contains('No pigeons found').should('exist');
  
      cy.get('table').should('not.exist');
    });
  
    it('should display an error message when the API call fails', () => {
      cy.intercept('GET', '/api/breeder/getAllPigeons', {
        statusCode: 500,
        body: { message: 'Failed to load pigeons' },
      }).as('getPigeons');
  
      cy.wait('@getPigeons');
  
      cy.get('.error-message').should('contain', 'Failed to load pigeons');
  
      cy.get('table').should('not.exist');
    });
  });