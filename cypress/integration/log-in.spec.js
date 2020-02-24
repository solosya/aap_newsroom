/// <reference types="cypress" />

// This recipe is very similar to the 'Logging In - HTML web form'
// except that is uses AJAX (XHR's) under the hood instead
// of using a regular HTML form submission.
//
// We are going to test a few things:
// 1. Test login form using XHR's
// 2. Test error states
// 3. Stub login XHR with errors and success
// 4. Stub Login.redirect method

// Be sure to run `npm start` to start the server
// before running the tests below.

describe('Logging In - XHR Web Form', function () {

    
    const username = Cypress.env('username');
    const password = Cypress.env('password');
    const loginurl = '/api/auth/login';
  
    context('XHR form submission', function () {
      
      beforeEach(function () {
        cy.visit('/')
      });
  



    //   it('successfully logs in', () => {
    //     cy.server();
    //     cy.route({
    //         method: 'POST',
    //         url: loginurl,
    //     }).as('loginRoute')

    //     cy.get("#signinBtn").click();
    //     cy.get("#loginName").type(username).should('have.value', username);
    //     cy.get("#loginPass").type(password).should('have.value', password);
    //     cy.get("#modal-signinBtn").click();
    //     cy.wait('@loginRoute');

    //     cy.visit('/paywall-type-section/test-paywalled-article-paid');
    //     cy.get('[data-test=article]')
    //   });
  


    //   it('displays errors on login', function () {
    //     cy.server()
  
    //     // alias this route so we can wait on it later
    //     cy.route('POST', loginurl).as('postLogin')
  
    //     // incorrect username on password
    //     cy.get("#signinBtn").click();
    //     cy.get("#loginName").type(username).should('have.value', username);
    //     cy.get("#loginPass").type('password123').should('have.value', 'password123');
    //     cy.get("#modal-signinBtn").click();

    //     cy.wait('@postLogin')
  
    //     cy.get('.login-form__error_text')
    //     .should('be.visible')
    //     .and('contain', 'Invalid Email or Password')
  
    //   })
  
      it('can stub the XHR to force it to fail', function () {
        // instead of letting this XHR hit our backend we can instead
        // control its behavior programmatically by stubbing it
        cy.server();
  
        // simulate the server returning 503 with
        // empty JSON response body
        cy.route({
          method: 'POST',
          url: loginurl,
          status: 503,
          response: {},
        }).as('postLogin');
  
        // incorrect username on purpose
        cy.get("#signinBtn").click();
        cy.get("#loginName").type(username).should('have.value', username);
        cy.get("#loginPass").type(password).should('have.value', password);
        cy.get("#modal-signinBtn").click();

        // we can even test that the correct request
        // body was sent in this XHR
        cy.wait('@postLogin');
        // .its('requestBody')
        // .should('deep.eq', {
        //   username: username,
        //   password: password,
        // });
  
        // we should have visible errors now
        cy.get('p.error')
        .should('be.visible')
        .and('contain', 'An error occurred: 503 Service Unavailable');
  
        // and still be on the same URL
        // cy.url().should('include', '/login')
      });
  






    //   it('redirects to /dashboard on success', function () {
    //     // we can submit form using "cy.submit" command
    //     // https://on.cypress.io/submit
    //     cy.get("#loginName").type(username).should('have.value', username);
    //     cy.get("#loginPass").type(password).should('have.value', password);
    //     cy.get("#modal-signinBtn").click();

    //     // we should be redirected to /dashboard
    //     // cy.url().should('include', '/dashboard')
    //     // cy.get('h1').should('contain', 'jane.lane')
  
    //     // and our cookie should be set to 'cypress-session-cookie'
    //     cy.getCookie('cypress-session-cookie').should('exist')
    //   })
  
    //   it('redirects on a stubbed XHR', function () {
    //     // When we stub the XHR we will no longer have a valid
    //     // cookie which means that on our Login.onSuccess callback
    //     // when we try to navigate to /dashboard we are unauthorized
    //     //
    //     // In this case we can simply stub out the Login.redirect method
    //     // and test that its called with the right data.
    //     //
    //     cy.window()
    //     .then(function (win) {
    //       // stub out the Login.redirect method
    //       // so it doesn't cause the browser to redirect
    //       cy.stub(win.Login, 'redirect').as('redirect')
    //     })
  
    //     cy.server()
  
    //     // simulate the server returning 503 with
    //     // empty JSON response body
    //     cy.route({
    //       method: 'POST',
    //       url: loginurl,
    //       response: {
    //         // simulate a redirect to another page
    //         redirect: '/error',
    //       },
    //     })
    //     // alias this route so we can wait on it later
    //     .as('postLogin')
  
    //     cy.get("#loginName").type(username).should('have.value', username);
    //     cy.get("#loginPass").type(password).should('have.value', password);
    //     cy.get("#modal-signinBtn").click();
  
    //     cy.wait('@postLogin')
  
    //     // we should not have any visible errors
    //     cy.get('p.error')
    //     .should('not.be.visible')
    //     .then(function () {
    //       // our redirect function should have been called with
    //       // the right arguments from the stubbed routed
    //       expect(this.redirect).to.be.calledWith('/error')
    //     })
    //   })


    })
  })