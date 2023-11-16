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

  it('Then: I should be able to UNDO adding of a book', () => {
    cy.get('input[type="search"]').type('cook');
    cy.get('form').submit();
    cy.wait(1000);
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="add-book"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length.greaterThan', 0);
    cy.get('.mat-simple-snackbar-action').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 0);
  });

  it('Then: I should be able to UNDO removal of a book',  () => {
    cy.get('input[type="search"]').type('cook');
    cy.get('form').submit();
    cy.wait(1000);
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="add-book"]').first().click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length.greaterThan', 0);
    cy.get('[data-testing="remove-book"]').first().click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 0);
    cy.wait(100);
    cy.get('.mat-simple-snackbar-action').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 1);    
  });
  
});