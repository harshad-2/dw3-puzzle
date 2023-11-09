describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to mark a book as finished', () => {
    cy.get('input[type="search"]').type('cook');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="book-action"]').first().click();
    cy.get('.reading-list-item').should('have.length.greaterThan', 0);
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.mark-as-finished').click();
    cy.get('.finished-confirmation').should('be.visible');
  });
  
});