describe('Chef Login', () => {
  it('Visit Home Page', () => {
    cy.visit("/");
  });

  it('Clicking chef button on home page goes to chef login page', () => {
    cy.contains("Chef").click();
    cy.url().should('include', '/chef/login');
  });

  it("Wrong username/password combo gives error message", () => {
    cy.get("#username").type("john");
    cy.get("#password").type("john13");
    cy.contains("Login").click();

    cy.get("p.error").should('be.visible');
  })

  it("Correct credentials logs in, transfers to orders page, and a jwt token should exist in cookies", () => {

    cy.get("#username").clear().type("john");
    cy.get("#password").clear().type("john12");
    cy.contains("Login").click();

    cy.url().should('include', '/chef/order-list');
    cy.getCookie("jwt").should("exist");
  })
});