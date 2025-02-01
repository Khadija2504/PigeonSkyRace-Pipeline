describe('Create Competition Component', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/auth/login');
    
      cy.get('#email').type('mykov@mailinator.com');
      cy.get('#password').type('Pa$$w0rd!');
      cy.get('button[type="submit"]').click();
      cy.get('.success-message').should('contain', 'Login successful!');
      cy.visit('/competition/create-competition');
    });
  
    it('should display the competition form with all fields', () => {
      cy.get('form').should('exist');
      cy.get('input#name').should('exist');
      cy.get('textarea#description').should('exist');
      cy.get('input#distance').should('exist');
      cy.get('input#date').should('exist');
      cy.get('input#latitude').should('exist');
      cy.get('input#longitude').should('exist');
      cy.get('select#type').should('exist');
      cy.get('select#season').should('exist');
    });
  
    it('should submit the form successfully when all fields are valid', () => {
      cy.intercept('GET', '/api/organizer/getAllSeasons', {
        statusCode: 200,
        body: [{ name: 'Season 1' }, { name: 'Season 2' }],
      }).as('getSeasons');
  
      cy.get('select#season').select('Season 1');
      cy.get('input#name').type('Competition 1');
      cy.get('textarea#description').type('A description for competition 1');
      cy.get('input#distance').type('5km');
      cy.get('input#date').type('2025-01-01T12:00');
      cy.get('input#latitude').type('48.8566');
      cy.get('input#longitude').type('2.3522');
      cy.get('select#type').select('VITESSE');
  
      cy.intercept('POST', '/api/organizer/addCompetition', {
        statusCode: 200,
        body: { message: 'Competition added successfully!' },
      }).as('addCompetition');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addCompetition');
      cy.get('.text-success').should('contain', 'Competition added successfully!');
    });
  
    it('should show an error message when the API call fails', () => {
      cy.intercept('GET', '/api/organizer/getAllSeasons', {
        statusCode: 200,
        body: [{ name: 'Season 1' }, { name: 'Season 2' }],
      }).as('getSeasons');
  
      cy.get('select#season').select('Season 1');
      cy.get('input#name').type('Competition 1');
      cy.get('textarea#description').type('A description for competition 1');
      cy.get('input#distance').type('5km');
      cy.get('input#date').type('2025-01-01T12:00');
      cy.get('input#latitude').type('48.8566');
      cy.get('input#longitude').type('2.3522');
      cy.get('select#type').select('VITESSE');
  
      cy.intercept('POST', '/api/organizer/addCompetition', {
        statusCode: 500,
        body: { message: 'Failed to add competition' },
      }).as('addCompetition');
  
      cy.get('button[type="submit"]').click();
  
      cy.wait('@addCompetition');
      cy.get('.text-danger').should('contain', 'Failed to add competition');
    });
  
    it('should not allow submission when the form is invalid', () => {
      cy.get('input#name').type('A');
      cy.get('textarea#description').clear();
      cy.get('input#distance').clear();
      cy.get('input#date').clear();
      cy.get('input#latitude').clear();
      cy.get('input#longitude').clear();
  
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });
  