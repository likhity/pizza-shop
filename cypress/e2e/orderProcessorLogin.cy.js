describe('Order Processor Login', () => {
  it('Visit Home Page', () => {
    cy.visit("/");
  });

  it('Clicking order processor button on home page goes to order processor login page', () => {
    cy.contains("Order Processor").click();
    cy.url().should('include', '/orderprocessor/login');
  });

  it("Wrong username/password combo gives error message", () => {
    cy.get("#username").type("jeff");
    cy.get("#password").type("jeff13");
    cy.contains("Login").click();

    cy.get("p.error").should('be.visible');
  })

  it("Correct credentials logs in, transfers to new orders, and a jwt token should exist in cookies", () => {

    cy.get("#username").clear().type("jeff");
    cy.get("#password").clear().type("jeff12");
    cy.contains("Login").click();

    cy.url().should('include', '/orderprocessor/new-orders');
    cy.getCookie("jwt").should("exist");
  })
});