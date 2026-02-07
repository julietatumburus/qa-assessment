import LoginPage from '../support/pages/LoginPage'

describe('Login', () => {
  it('should login with valid credentials', () => {
    cy.visit('/')
    cy.get(LoginPage.username).type('standard_user')
    cy.get(LoginPage.password).type('secret_sauce')
    cy.get(LoginPage.loginButton).click()

    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_item').should('have.length', 6)
  })
})
