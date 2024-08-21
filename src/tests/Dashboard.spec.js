describe('Dashboard Page', () => {
    beforeEach(() => {
        cy.visit('/dashboard');
    });

    it('should display user name and text based on user type', () => {
        cy.get('header').contains('Hi, John Smith 👋');
        cy.get('p').contains('Manage your documents issued by SMU Academy or track your career goal.');
    });

    it('should not render ProgressCard for personal users', () => {
        cy.intercept('GET', '/api/user', { fixture: 'personalUser.json' });

        cy.visit('/dashboard');

        cy.get('header').contains('Hi, John Smith 👋');
        cy.get('p').contains('Manage your documents.');
        cy.get('.progress-card').should('not.exist');
    });

});
