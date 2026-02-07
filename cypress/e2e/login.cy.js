import LoginPage from '../support/pages/LoginPage'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should login with valid credentials', () => {
    cy.get(LoginPage.username).type('standard_user')
    cy.get(LoginPage.password).type('secret_sauce')
    cy.get(LoginPage.loginButton).click()

    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('should show error for locked out user', () => {
    cy.get(LoginPage.username).type('locked_out_user')
    cy.get(LoginPage.password).type('secret_sauce')
    cy.get(LoginPage.loginButton).click()

    cy.get(LoginPage.error).should('contain', 'locked out')
    cy.url().should('not.include', '/inventory')
  })
})
