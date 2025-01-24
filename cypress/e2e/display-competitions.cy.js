describe('Competitions List Page', () => {
    beforeEach(() => {
      cy.clearLocalStorage();
      cy.visit('/auth/login');

      cy.get('#email').type('mykov@mailinator.com');
      cy.get('#password').type('Pa$$w0rd!');
      cy.get('button[type="submit"]').click();
      cy.get('.success-message').should('contain', 'Login successful!');
      cy.visit('/competition/competitions-list');
    });
  
    it('should display a loading message while competitions are loading', () => {
      cy.intercept('GET', '/api/organizer/getAllCompetitions', (req) => {
        req.reply((res) => {
          res.delay(2000);
          res.send({ body: [] });
        });
      });
  
      cy.get('.loading').should('contain', 'Loading competitions...');
    });
  
    it('should display an error message if the API call fails', () => {
      cy.intercept('GET', '/api/organizer/getAllCompetitions', {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      });
  
      cy.get('.error').should('contain', 'Failed to load competitions. Please try again later.');
    });
  
    it('should display "Unauthorized" message if the API returns a 401 error', () => {
      cy.intercept('GET', '/api/organizer/getAllCompetitions', {
        statusCode: 401,
      });
  
      cy.get('.error').should('contain', 'Unauthorized. Please log in again.');
    });
  
    it('should display the competitions list when data is available', () => {
      cy.intercept('GET', '/api/organizer/getAllCompetitions', {
        statusCode: 200,
        body: [
          {
            name: 'Competition 1',
            distance: 100,
            startDate: '2025-01-01T00:00:00',
            latitude: '34.0522',
            longitude: '-118.2437',
            type: 'Race',
            isOpen: true,
            season: { name: 'Winter' },
          },
          {
            name: 'Competition 2',
            distance: 200,
            startDate: '2025-06-15T00:00:00',
            latitude: '40.7128',
            longitude: '-74.0060',
            type: 'Marathon',
            isOpen: false,
            season: { name: 'Summer' },
          },
        ],
      });
  
      cy.get('.competition-table').should('exist');
      cy.get('.competition-table tbody tr').should('have.length', 2);
  
      cy.get('.competition-table tbody tr').first().within(() => {
        cy.get('td').eq(0).should('contain', 'Competition 1');
        cy.get('td').eq(1).should('contain', '100');
        cy.get('td').eq(2).should('contain', 'January 1, 2025');
        cy.get('td').eq(3).should('contain', '[34.0522, -118.2437]');
        cy.get('td').eq(4).should('contain', 'Race');
        cy.get('td').eq(5).should('contain', 'Open');
        cy.get('td').eq(6).should('contain', 'Winter');
      });
    });
  
    it('should display "Not assigned" if a competition has no season assigned', () => {
      cy.intercept('GET', '/api/organizer/getAllCompetitions', {
        statusCode: 200,
        body: [
          {
            name: 'Competition 3',
            distance: 150,
            startDate: '2025-02-15T00:00:00',
            latitude: '51.5074',
            longitude: '-0.1278',
            type: 'Sprint',
            isOpen: true,
            season: null,
          },
        ],
      });
  
      cy.get('.competition-table tbody tr').first().within(() => {
        cy.get('td').eq(6).should('contain', 'Not assigned');
      });
    });
  });
  