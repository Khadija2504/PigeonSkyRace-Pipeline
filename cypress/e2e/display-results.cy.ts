describe('DisplayResultsComponent', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/auth/login');

    cy.get('#email').type('jowikig@mailinator.com');
    cy.get('#password').type('Pa$$w0rd!');
    cy.get('button[type="submit"]').click();

    cy.get('.success-message').should('contain', 'Login successful!');

    cy.visit('/results/display-results');
  });

  it('should display the table when results are loaded successfully', () => {
    cy.intercept('GET', '/api/breeder/allResults', {
      statusCode: 200,
      body: [
        {
          points: 100,
          speed: 12.34,
          ranking: 1,
          distance: 500.5,
          flightTime: 2.5,
          arrivalDate: '10/1/23, 12:00 PM',
          pigeon: { name: 'Pigeon1' },
          competition: { name: 'Competition1' },
        },
        {
          points: 90,
          speed: 11.23,
          ranking: 2,
          distance: 450.75,
          flightTime: 2.75,
          arrivalDate: '10/2/23, 12:00 PM',
          pigeon: { name: 'Pigeon2' },
          competition: { name: 'Competition2' },
        },
      ],
    }).as('getResults');

    cy.wait('@getResults');

    cy.get('table.result-table').should('exist');

    cy.get('table.result-table thead th').eq(0).should('contain', 'Points');
    cy.get('table.result-table thead th').eq(1).should('contain', 'Speed (m/s)');
    cy.get('table.result-table thead th').eq(2).should('contain', 'Ranking');
    cy.get('table.result-table thead th').eq(3).should('contain', 'Distance (km)');
    cy.get('table.result-table thead th').eq(4).should('contain', 'Flight Time (h)');
    cy.get('table.result-table thead th').eq(5).should('contain', 'Arrival Date');
    cy.get('table.result-table thead th').eq(6).should('contain', 'Pigeon');
    cy.get('table.result-table thead th').eq(7).should('contain', 'Competition');

    cy.get('table.result-table tbody tr').should('have.length', 2);
    cy.get('table.result-table tbody tr').eq(0).within(() => {
      cy.get('td').eq(0).should('contain', '100');
      cy.get('td').eq(1).should('contain', '12.34');
      cy.get('td').eq(2).should('contain', '1');
      cy.get('td').eq(3).should('contain', '500.5');
      cy.get('td').eq(4).should('contain', '2.5');
      cy.get('td').eq(5).should('contain', `10/1/23, 12:00 PM`);
      cy.get('td').eq(6).should('contain', 'Pigeon1');
      cy.get('td').eq(7).should('contain', 'Competition1');
    });
    cy.get('table.result-table tbody tr').eq(1).within(() => {
      cy.get('td').eq(0).should('contain', '90');
      cy.get('td').eq(1).should('contain', '11.23');
      cy.get('td').eq(2).should('contain', '2');
      cy.get('td').eq(3).should('contain', '450.75');
      cy.get('td').eq(4).should('contain', '2.75');
      cy.get('td').eq(5).should('contain', `10/2/23, 12:00 PM`);
      cy.get('td').eq(6).should('contain', 'Pigeon2');
      cy.get('td').eq(7).should('contain', 'Competition2');
    });
  });

  it('should display "No results available" when the results list is empty', () => {
    cy.intercept('GET', '/api/breeder/allResults', {
      statusCode: 200,
      body: [],
    }).as('getResults');

    cy.wait('@getResults');

    cy.contains('No results available').should('exist');
    cy.get('table.result-table').should('not.exist');
  });

  it('should display an error message when the API call fails', () => {
    cy.intercept('GET', '/api/breeder/allResults', {
      statusCode: 500,
      body: { message: 'Failed to fetch results' },
    }).as('getResults');

    cy.wait('@getResults');

    cy.get('.error-message').should('contain', 'An error occurred while fetching results.');
    cy.get('table.result-table').should('not.exist');
  });
});