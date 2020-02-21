
describe('Article paywall guest', function() {
    it('shows article paywall for guest user', function() {
        cy.visit('/paywall-type-section/test-paywalled-article-paid');
        cy.get('.article-subscribe__header').should('have.text', 'TO READ THE FULL STORY ON NEWSROOM PRO');
    });

    it('redirects to paywall for guest user', function() {
        cy.visit('/paywall-type-section/');
    });

    it('shows section for guest user', function() {
        cy.visit('/paywall-type-article/');
    });

});
  

describe('Article paywall user', function() {
    it('shows full article for singed in user', function() {
        
        cy.visit('/');
        cy.get("#signinBtn").click();
        cy.get("#loginName").type(Cypress.env('admin.username')).should('have.value', Cypress.env('admin.username'));
        cy.get("#loginPass").type(Cypress.env('admin.password')).should('have.value', Cypress.env('admin.password'));
        // cy.get("#modal-signinBtn").click();
        
        // cy.visit('/paywall-type-section/test-paywalled-article-paid');

    });
});
  