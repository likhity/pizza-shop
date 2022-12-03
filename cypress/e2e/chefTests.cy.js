let authCookie;

const mockOrder = {
  pickUpTime: "10 30 am",
  studentID: "1212121212",
  orderID: `${Math.random()}`,
  pizzaType: "Pepperoni",
  toppings: ['onions', 'extraCheese'],
  specialInstructions: "mock order",
};

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
    cy.chefLogin();

    cy.url().should('include', '/chef/order-list');
    cy.getCookie("jwt").should("exist").then(cookie => {
      authCookie = cookie;
    });
  });
});

describe("Chef Order List Page", () => {
  it("correctly renders the list of orders", () => {
    cy.deleteMockAcceptedOrders();
    // create the mock order in the database
    cy.createMockAcceptedOrder(mockOrder);
    cy.chefLogin(authCookie);
    cy.reload();

    // test to see if an order with the order id of our mock order is rendered
    cy.get(".order h3").contains(mockOrder.orderID);
  });
});

describe("Specific Order Page", () => {

  it("Clicking on an order transfers to specific order page", () => {
    // create the mock order in the database
    cy.chefLogin(authCookie);
    cy.reload();

    // click on the mock order we created
    cy.contains(mockOrder.orderID).click();

    cy.url().should('include', '/chef/order/');
  })

  it("correctly renders the order details", () => {
    // login
    cy.chefLogin(authCookie);

    cy.get(".title").should('have.text', `Order ${mockOrder.orderID}`);
    const [ hour, minute, amPm ] = mockOrder.pickUpTime.split(" ");
    cy.get(".order-details").contains(`Pick Up Time: ${hour}:${minute} ${amPm}`);
    cy.get(".order-details").contains(`Pizza Type: ${mockOrder.pizzaType}`);
    mockOrder.toppings.forEach(topping => {
      cy.get("li").contains(`${topping}`);
    })

    cy.get(".order-details").contains("Special Instructions:");
    cy.get(".order-details").contains(`${mockOrder.specialInstructions}`);

  });

  it("Clicking Ready to Cook changes button to Cooking", () => {
    cy.chefLogin(authCookie);
    
    cy.contains("Cooking").should("have.class", "invisible");
    cy.contains("Ready to Cook").should("not.have.class", "invisible");
    cy.contains("Ready to Pickup").should("have.class", "invisible");

    cy.contains("Ready to Cook").click();

    cy.contains("Cooking").should("not.have.class", "invisible");
    cy.contains("Ready to Cook").should("have.class", "invisible");
    cy.contains("Ready to Pickup").should("have.class", "invisible");
  })

  it("Clicking on Cooking button changes button to Ready to Pickup", () => {
    cy.chefLogin(authCookie);

    cy.contains("Cooking").click();

    cy.contains("Cooking").should("have.class", "invisible");
    cy.contains("Ready to Cook").should("have.class", "invisible");
    cy.contains("Ready to Pickup").should("not.have.class", "invisible");
  })

  it("Clicking on Ready to Pickup button transfers user to order list", () => {
    cy.chefLogin(authCookie);

    cy.contains("Ready to Pickup").click();

    cy.url().should("include", "/chef/order-list");
  })

  it("Ready to Pickup order is not shown in order list", () => {
    cy.chefLogin(authCookie);

    cy.contains(mockOrder.orderID).should("not.exist");
  })
});