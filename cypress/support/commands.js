// login command so we don't repeat it in every test
Cypress.Commands.add('login', (username, password = 'secret_sauce') => {
  cy.visit('/')
  cy.get('[data-test="username"]').type(username)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
})
