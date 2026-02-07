import LoginPage from '../support/pages/LoginPage'

describe('Login', () => {
  it('should show error for locked out user', () => {
    cy.visit('/')
    cy.get(LoginPage.username).type('locked_out_user')
    cy.get(LoginPage.password).type('secret_sauce')
    cy.get(LoginPage.loginButton).click()

    cy.get(LoginPage.error).should('contain', 'locked out')
    cy.url().should('not.include', '/inventory')
  })
})
