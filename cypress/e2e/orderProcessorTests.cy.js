let authCookie;

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
    cy.getCookie("jwt").should("exist").then(cookie => {
      authCookie = cookie;
    });
  })
});

const mockOrder = {
  pickUpTime: "10 30 am",
  studentID: "1212121212",
  orderID: `${Math.random()}`,
  pizzaType: "Pepperoni",
  toppings: ['onions', 'extraCheese'],
  specialInstructions: "mock order",
};

const mockOrder2 = {
  pickUpTime: "10 30 am",
  studentID: "1212121213",
  orderID: `${Math.random()}`,
  pizzaType: "Pepperoni",
  toppings: ['onions', 'extraCheese'],
  specialInstructions: "mock order",
};

describe('New Orders Page', () => {


  it("Correctly renders list", () => {
    cy.deleteMockNewOrders();
    cy.deleteMockAcceptedOrders();
    cy.orderProcessorLogin(authCookie);
    
    cy.createMockNewOrder(mockOrder);
    cy.createMockNewOrder(mockOrder2);
    
    cy.visit("/orderprocessor/new-orders");
    
    cy.get(".order h3").should("contain.text", mockOrder.orderID);
    cy.get(".order h3").should("contain.text", mockOrder2.orderID);
    
  })

  it("Clicking on order goes to individual order page", () => {
    cy.orderProcessorLogin(authCookie);
  
    cy.contains(mockOrder.orderID).click();

    cy.url().should("include", "/orderprocessor/individual-new-order/")
  })

  it("Accepting Order deletes from New Orders List", () => {
    cy.orderProcessorLogin(authCookie);
  
    cy.get("#accept-button").click();

    cy.url().should("include", "/orderprocessor/new-orders")

    cy.get(".order h3").should("not.contain.text", mockOrder.orderID);
    cy.get(".order h3").should("contain.text", mockOrder2.orderID);
  })
});

describe("Accepted Orders Page", () => {

  it("Accepted Order is put into Accepted Orders List", () => {
    cy.orderProcessorLogin(authCookie);
    cy.visit("/orderprocessor/accepted-orders");

    cy.get(".order h3").should("contain.text", mockOrder.orderID);
  })

  it("Clicking on order goes to individual accepted order page", () => {
    cy.orderProcessorLogin(authCookie);
  
    cy.contains(mockOrder.orderID).click();

    cy.url().should("include", "/orderprocessor/individual-accepted-order/")
  })

  it("Current status changes from Accepted to Ready to Cook", () => {
    cy.orderProcessorLogin(authCookie);

    cy.get(".status").should("have.text", "Accepted");
    mockOrder.orderStatus = "Ready to Cook";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status").should("have.text", "Ready to Cook");
    cy.get("#order-picked-up-button").should("be.disabled");
  })
  it("Current status changes from Ready to Cook to Cooking", () => {
    cy.orderProcessorLogin(authCookie);

    mockOrder.orderStatus = "Cooking";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status").should("have.text", "Cooking");
    cy.get("#order-picked-up-button").should("be.disabled");
  })
  it("Current status changes from Cooking to Ready to Pickup, and button is enabled", () => {
    cy.orderProcessorLogin(authCookie);

    mockOrder.orderStatus = "Ready to Pickup";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status").should("have.text", "Ready to Pickup");
    cy.get("#order-picked-up-button").should("be.enabled");
  })

  it("Clicking Order Picked Up Transfers to Accepted Orders Page", () => {
    cy.orderProcessorLogin(authCookie);

    cy.get("#order-picked-up-button").click();
    cy.url().should("include", "/orderprocessor/accepted-orders");    
  })
  it("The Finished Order is deleted", () => {
    cy.orderProcessorLogin(authCookie);

    cy.contains(mockOrder.orderID).should("not.exist");
  })

})

describe("Finished Orders Page", () => {

  it("Finished Order is put into Finished Orders List", () => {
    cy.orderProcessorLogin(authCookie);
    cy.visit("/orderprocessor/finished-orders");

    cy.get(".order h3").should("contain.text", mockOrder.orderID);
  });
  
  it("Clicking on individual order goes to individual finished orders page", () => {
    cy.orderProcessorLogin(authCookie);

    cy.contains(mockOrder.orderID).click();

    cy.url().should("include", "/orderprocessor/individual-finished-order/");
  });

  it("Shows amount paid", () => {
    cy.get(".amount-paid").should("have.text", "$10.00");
  });

})