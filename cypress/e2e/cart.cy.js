import InventoryPage from '../support/pages/InventoryPage'

describe('Cart', () => {
  beforeEach(() => {
    cy.login('standard_user')
  })

  it('should add and remove a product', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get(InventoryPage.cartBadge).should('have.text', '1')

    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get(InventoryPage.cartBadge).should('not.exist')

    // check the cart page is actually empty
    cy.get(InventoryPage.cartLink).click()
    cy.get('.cart_item').should('not.exist')
  })
})
