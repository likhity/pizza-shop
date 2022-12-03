// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('studentLogin', (authCookie) => { 
  if (authCookie) {
    cy.setCookie(authCookie.name, authCookie.value);
  } else {
    cy.visit("/student/login");
    cy.get("#asuID").clear().type("1212121212");
    cy.contains("Login").click();
  }
 });
Cypress.Commands.add('orderProcessorLogin', (authCookie) => { 
  if (authCookie) {
    cy.setCookie(authCookie.name, authCookie.value);
  } else {
    cy.visit("/orderprocessor/login");
    cy.get("#username").clear().type("jeff");
    cy.get("#password").clear().type("jeff12");
    cy.contains("Login").click();
  }
 });
Cypress.Commands.add('chefLogin', (authCookie) => { 
  if (authCookie) {
    cy.setCookie(authCookie.name, authCookie.value);
  } else {
    cy.visit("/chef/login");
    cy.get("#username").clear().type("john");
    cy.get("#password").clear().type("john12");
    cy.contains("Login").click();
  }
 });

 Cypress.Commands.add("createMockAcceptedOrder", (mockOrder) => {
  cy.insertOne(mockOrder, { collection: 'acceptedorders', database: 'pizza-shop' });
 })

 Cypress.Commands.add("deleteMockAcceptedOrders", () => {
  cy.deleteMany({ specialInstructions: "mock order" }, { collection: 'acceptedorders', 'database': 'pizza-shop' });
 })

 Cypress.Commands.add("createMockNewOrder", (mockOrder) => {
  cy.insertOne(mockOrder, { collection: 'orders', database: 'pizza-shop' });
 })

 Cypress.Commands.add("deleteMockNewOrders", () => {
  cy.deleteMany({ specialInstructions: "mock order" }, { collection: 'orders', 'database': 'pizza-shop' });
 })

 Cypress.Commands.add("createMockFinishedOrder", (mockOrder) => {
  cy.insertOne(mockOrder, { collection: 'orders', database: 'pizza-shop' });
 })

 Cypress.Commands.add("deleteMockFinishedOrders", () => {
  cy.deleteMany({ specialInstructions: "mock order" }, { collection: 'finishedorders', 'database': 'pizza-shop' });
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })