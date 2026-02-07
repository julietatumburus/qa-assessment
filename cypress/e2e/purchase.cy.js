import InventoryPage from '../support/pages/InventoryPage'
import CheckoutPage from '../support/pages/CheckoutPage'

describe('Purchase flow', () => {
  it('should complete a full purchase', () => {
    cy.login('standard_user')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get(InventoryPage.cartBadge).should('have.text', '1')
    cy.get(InventoryPage.cartLink).click()

    cy.get('.cart_item').should('have.length', 1)
    cy.get('[data-test="checkout"]').click()

    cy.get(CheckoutPage.firstName).type('John')
    cy.get(CheckoutPage.lastName).type('Doe')
    cy.get(CheckoutPage.postalCode).type('10001')
    cy.get(CheckoutPage.continueBtn).click()

    cy.url().should('include', '/checkout-step-two')
    cy.get(CheckoutPage.finishBtn).click()

    cy.get(CheckoutPage.completeHeader).should('have.text', 'Thank you for your order!')
  })
})
