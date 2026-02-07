import CheckoutPage from '../support/pages/CheckoutPage'

describe('problem_user bugs', () => {
  it('should not keep last name in checkout form', () => {
    cy.login('problem_user')

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()

    cy.get(CheckoutPage.firstName).type('John')
    cy.get(CheckoutPage.lastName).type('Doe')
    cy.get(CheckoutPage.postalCode).type('10001')

    // problem_user doesn't keep the last name
    cy.get(CheckoutPage.lastName).should('not.have.value', 'Doe')
  })
})
