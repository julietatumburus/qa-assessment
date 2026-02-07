import CheckoutPage from '../support/pages/CheckoutPage'

describe('Checkout validation', () => {
  beforeEach(() => {
    cy.login('standard_user')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('should show error if form is empty', () => {
    cy.get(CheckoutPage.continueBtn).click()
    cy.get(CheckoutPage.error).should('contain', 'First Name is required')
  })
})
