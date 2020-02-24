
// /paywall-type-section/test-paywalled-article-paid
// /paywall-type-section/test-paywalled-article
// /paywall-type-article/test-paywalled-article-section-article


describe('Log in', function() {
    it('Allows user to log in to site', function() {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/auth/login',
          }).as('loginRoute')
                            
        cy.visit('/');
        cy.get("#signinBtn").click();
        cy.get("#loginName").type(Cypress.env('username')).should('have.value', Cypress.env('username'));
        cy.get("#loginPass").type(Cypress.env('password')).should('have.value', Cypress.env('password'));
        cy.get("#modal-signinBtn").click();
        cy.wait('@loginRoute');
        cy.visit('/paywall-type-section/test-paywalled-article-paid');
        cy.get('[data-test=article]')

    });
});
  



// describe('Article paywall guest', function() {
//     it('shows article paywall for guest user', function() {
//         cy.visit('/paywall-type-section/test-paywalled-article-paid');
//         cy.get('[data-test=paywall]')
//         cy.get('.article-subscribe__header').should('have.text', 'TO READ THE FULL STORY ON NEWSROOM PRO');
//     });

//     it('redirects to paywall for guest user', function() {
//         cy.visit('/paywall-type-section/');
//         cy.get('[data-test=paywall]')
//     });

//     it('shows section for guest user', function() {
//         cy.visit('/paywall-type-article/');
//         cy.get('[data-test=section]')
//     });

// });
  

// describe('Article paywall user', function() {
//     it('shows full article for singed in user', function() {
//         cy.server();
//         cy.route({
//             method: 'POST',
//             url: '/api/auth/login',
//           }).as('loginRoute')
                            
//         cy.visit('/');
//         cy.get("#signinBtn").click();
//         cy.get("#loginName").type(Cypress.env('username')).should('have.value', Cypress.env('username'));
//         cy.get("#loginPass").type(Cypress.env('password')).should('have.value', Cypress.env('password'));
//         cy.get("#modal-signinBtn").click();
//         cy.wait('@loginRoute');
//         cy.visit('/paywall-type-section/test-paywalled-article-paid');
//         cy.get('[data-test=article]')

//     });
// });
  