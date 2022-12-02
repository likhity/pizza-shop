describe('Student Login', () => {
  it('Visit Home Page', () => {
    cy.visit("/");
  });

  it('Clicking student button on home page goes to student login page', () => {
    cy.contains("Student").click();
    cy.url().should('include', '/student/login');
  });

  it("Wrong ASU ID gives error message", () => {
    cy.get("#asuID").type("1212121213");
    cy.contains("Login").click();

    cy.get("p.error").should('be.visible');
  })

  it("Correct ASU ID logins in, transfers to customize pizza, and jwt auth token in cookies", () => {

    cy.get("#asuID").clear().type("1212121212");
    cy.contains("Login").click();

    cy.url().should('include', '/student/customize-pizza');
    cy.getCookie("jwt").should("exist");
  })
});