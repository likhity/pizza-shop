let authCookie;

describe('Student Login', () => {
  it('Visit Home Page', () => {
    cy.visit("/");
    cy.deleteMockNewOrders();
    cy.deleteMockAcceptedOrders();
    cy.deleteMockFinishedOrders();
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

  it("Correct ASU ID logins in, transfers to customize pizza, and jwt auth token exists in cookies", () => {

    cy.studentLogin();

    cy.url().should('include', '/student/customize-pizza');
    cy.getCookie("jwt").should("exist").then(cookie => {
      authCookie = cookie;
    })
    cy.reload();
  })
});

describe("Customize Pizza Page", () => {
  it("Correctly renders pizza diagram if Pepperoni selected", () => {
    cy.studentLogin(authCookie);
    cy.get("input[value='Pepperoni']").check();

    cy.get("img.pizzaType").should("have.attr", "src", "/pizzaType/Pepperoni.png");
  });
  it("Correctly renders pizza diagram if Vegetable selected", () => {
    cy.get("input[value='Vegetable']").check();
    cy.get("img.pizzaType").should("have.attr", "src", "/pizzaType/Vegetable.png");
  })
  it("Correctly renders pizza diagram if Cheese selected", () => {
    cy.get("input[value='Cheese']").check();
    cy.get("img.pizzaType").should("have.attr", "src", "/pizzaType/Cheese.png");
  });
  it("Correctly renders pizza diagram when toppings are selected", () => {
    cy.get("#mushroom").check();
    cy.get("img.mushroom").should('not.have.class', 'invisible');
    cy.get("img.onion").should('have.class', 'invisible');
    cy.get("img.olive").should('have.class', 'invisible');

    cy.get("#mushroom").uncheck();
    cy.get("#onion").check();
    cy.get("#olive").check();
    cy.get("#extraCheese").check();

    cy.get("img.mushroom").should('have.class', 'invisible');
    cy.get("img.onion").should('not.have.class', 'invisible');
    cy.get("img.olive").should('not.have.class', 'invisible');
  })
  it("Next button transfers to pick up time page with correct session storage of pizza order", () => {
    cy.studentLogin(authCookie);
    cy.contains("Next").click();
    cy.url().should("include", "/student/pickup-time");

    cy.window().its("sessionStorage").invoke("getItem", "SUN_DEVIL_PIZZA_ORDER").should("exist").then((storage) => {
      expect(JSON.parse(storage)).to.deep.equal({
        "pickUpTime":"",
        "asuID":"",
        "pizzaType":"Cheese",
        "toppings":["onions","olives","extraCheese"],
        "specialInstructions":""
      });
    });
  });
});

describe("Pick Up Time Page", () => {
  it("Allows user to select to select hourTime", () => {
    cy.get("#hourTime").select("11");
    cy.get("#hourTime").should("have.value", "11");
  })
  it("Allows user to select to select minuteTime", () => {
    cy.get("#minuteTime").select("30");
    cy.get("#minuteTime").should("have.value", "30");
  })
  it("Allows user to select to select amPm", () => {
    cy.get("#amPm").select("pm");
    cy.get("#amPm").should("have.value", "pm");
  })
  it("Next button transfers user to special Instructions", () => {
    cy.studentLogin(authCookie);

    cy.contains("Next").click();
    cy.url().should("include", "/student/special-instructions");
  })
  it("Updates Correct Session Storage of pizza order", () => {
    cy.window().its("sessionStorage").invoke("getItem", "SUN_DEVIL_PIZZA_ORDER").should("exist").then((storage) => {
      expect(JSON.parse(storage)).to.deep.equal({
        "pickUpTime":"11 30 pm",
        "asuID":"",
        "pizzaType":"Cheese",
        "toppings":["onions","olives","extraCheese"],
        "specialInstructions":""
      });
    });

  })
})

describe("Special Instructions Page", () => {
  it("Allows user to type special instructions", () => {
    cy.get("textarea").type("mock order");
    cy.get("textarea").should("have.value", "mock order");
  })

  it("Next button transfers user to order summary", () => {
    cy.studentLogin(authCookie);

    cy.contains("Next").click();
    cy.url().should("include", "/student/order-summary");
  });

  it("Session storage of pizza order correctly updated", () => {
    cy.window().its("sessionStorage").invoke("getItem", "SUN_DEVIL_PIZZA_ORDER").should("exist").then((storage) => {
      expect(JSON.parse(storage)).to.deep.equal({
        "pickUpTime":"11 30 pm",
        "asuID":"",
        "pizzaType":"Cheese",
        "toppings":["onions","olives","extraCheese"],
        "specialInstructions":"mock order"
      });
    });

  })
})

describe("Order Summary Page", () => {
  it("Order details are correctly rendered", () => {
    cy.get("#pizzaType").should("have.text", "Pizza Type: Cheese");
    cy.get("#toppings").should("have.text", "Toppings: onions, olives, extraCheese");
    cy.get("#pickUpTime").should("contain.text", "Pick-Up Time: \n11:30 pm");
    cy.get("#specialInstructions").should("have.text", "Special Instructions: mock order");
  })
  
  it("Edit button transfers to Customize Pizza", () => {
    cy.studentLogin(authCookie);
    cy.contains("Edit").click();
    
    cy.url().should("include", "/student/customize-pizza");
  });

  it("Editing order changes details in order summary", () => {
    cy.studentLogin(authCookie);
    
    cy.url().should("include", "/student/customize-pizza");
    cy.contains("Next").click();
    cy.url().should("include", "/student/pickup-time");
    cy.get("#minuteTime").select("25");
    cy.contains("Next").click();
    cy.url().should("include", "/student/special-instructions");
    cy.contains("Next").click();
    cy.url().should("include", "/student/order-summary");
    cy.get("#pizzaType").should("have.text", "Pizza Type: Cheese");
    cy.get("#toppings").should("have.text", "Toppings: onions, olives, extraCheese");
    cy.get("#pickUpTime").should("contain.text", "Pick-Up Time: \n11:25 pm");
    cy.get("#specialInstructions").should("have.text", "Special Instructions: mock order");
  });
  
  it("Submitting order transfers us to order status page", () => {
    cy.studentLogin(authCookie);
    cy.contains("Submit").click();
    
    cy.url().should("include", "student/view-order-status");
  });
})

describe("Order Status Page", () => {

  it("Canceling order transfers us to customize pizza page with a blank order", () => {
    cy.studentLogin(authCookie);
    cy.contains("Cancel").click();
    
    cy.url().should("include", "student/customize-pizza");
    cy.window().its("sessionStorage").invoke("removeItem", "SUN_DEVIL_PIZZA_ORDER");
  });

  const mockOrder = {
    pizzaType: "Pepperoni",
    toppings: ["mushroom", "onions", "olives"],
    pickUpTime: "10 30 am",
    studentID: "1212121212",
    specialInstructions: "mock order",
    orderID: `${Math.random()}`
  }

  it("If student has order in progress, student is always redirected to Order Status Page", () => {
    cy.studentLogin(authCookie);

    // create a mock order in progress
    cy.createMockNewOrder(mockOrder);

    cy.visit("/student/customize-pizza");
    cy.url().should("include", "/student/view-order-status");

    cy.visit("/student/pickup-time");
    cy.url().should("include", "/student/view-order-status");

    cy.visit("/student/special-instructions");
    cy.url().should("include", "/student/view-order-status");

    cy.visit("/student/order-summary");
    cy.url().should("include", "/student/view-order-status");
  });

  it("Correctly displays order status", () => {
    cy.studentLogin(authCookie);

    cy.get(".status-bar").should("have.class", "order-sent");
    cy.get("#cancel-button").should("be.enabled");
  })

  it("Changes order status from Order Sent to Accepted", () => {
    cy.studentLogin(authCookie);
    
    cy.deleteOne({ studentID: mockOrder.studentID }, { collection: "orders", database: "pizza-shop" });
    cy.createMockAcceptedOrder(mockOrder);
    cy.wait(3000);
    cy.get(".status-bar").should("have.class", "accepted");
    cy.get(".pickup-text").should("have.class", "invisible");
    cy.get("#cancel-button").should("be.disabled");
  })

  it("Changes order status from Accepted to Ready to Cook", () => {
    cy.studentLogin(authCookie);

    mockOrder.orderStatus = "Ready to Cook";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status-bar").should("have.class", "ready-to-cook");
    cy.get(".pickup-text").should("have.class", "invisible");
    cy.get("#cancel-button").should("be.disabled");
  })

  it("Changes order status from Ready to Cook to Cooking", () => {
    cy.studentLogin(authCookie);

    mockOrder.orderStatus = "Cooking";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status-bar").should("have.class", "cooking");
    cy.get(".pickup-text").should("have.class", "invisible");
    cy.get("#cancel-button").should("be.disabled");
  });

  it("Changes order status from Cooking to Ready to Pickup", () => {
    cy.studentLogin(authCookie);

    mockOrder.orderStatus = "Ready to Pickup";
    cy.updateOne({ orderID: mockOrder.orderID }, { $set: mockOrder }, { collection: "acceptedorders", database: "pizza-shop" });
    cy.wait(3000);
    cy.get(".status-bar").should("have.class", "ready-to-pickup");
    cy.get(".pickup-text").should("not.have.class", "invisible");
    cy.get("#cancel-button").should("be.disabled");
  });
});