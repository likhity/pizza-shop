var pizzaTypeText = document.getElementById("pizzaTypeText");
var toppingsText = document.getElementById("toppingsText");
var picKUpTimeText = document.getElementById("pickUpTimeText");
var specialInstructionsText = document.getElementById(
  "specialInstructionsText"
);
var cancelButton = document.getElementById("cancel-button");
const pickUpText = document.querySelector(".pickup-text");

//get orderID from client(assume each client only has one order)
const clientOrderID = sessionStorage.getItem("ORDER_ID");

//get order from client
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";
const clientPizzaOrder = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

pizzaTypeText.textContent = `Pizza Type: ${clientPizzaOrder.pizzaType}`;
clientPizzaOrder;
//parse pickUpTime sessionStorage
const pickUpTimeParsedArray = clientPizzaOrder.pickUpTime.split(" ");

//NOTE: format of pickUpTime is "8 40 pm"
picKUpTimeText.textContent = `Pick Up Time: 
${pickUpTimeParsedArray[0]}:${pickUpTimeParsedArray[1]} ${pickUpTimeParsedArray[2]}`;
specialInstructionsText.textContent = `Special Instructions: ${clientPizzaOrder.specialInstructions}`;

class StatusBar {
  constructor() {
    this.currentStatus = "Order Sent";
    this.htmlStatusBar = document.querySelector(".status-bar");
    this.phoneStatusText = document.querySelector(".phone-status");
    this.htmlStatusBar.className = "status-bar order-sent";
  }

  setStatus(newStatus) {
    if (newStatus === this.currentStatus) return;

    this.phoneStatusText.textContent = newStatus;

    switch (newStatus) {
      case "Accepted":
        this.htmlStatusBar.className = "status-bar accepted";
        break;
      case "Ready to Cook":
        this.htmlStatusBar.className = "status-bar ready-to-cook";
        break;
      case "Cooking":
        this.htmlStatusBar.className = "status-bar cooking";
        break;
      case "Ready to Pickup":
        this.htmlStatusBar.className = "status-bar ready-to-pickup";
        this.phoneStatusText.classList.replace("red", "green");
        break;
    }

    this.currentStatus = newStatus;
  }
}

const theStatusBar = new StatusBar();

async function updateStatus() {
  //if orderStatus is "Ready To Pick Up"
  //break out of loop

  //response is json object with orderStatus
  //NOTE: this is based on student controllers
  //if modelName = "acceptedOrder" =>returns order.orderStatus (accepted/cookings/readypickUp)
  //else => returns status of "Order Sent"
  const response = await fetch(`/student/order-status/${clientOrderID}`, {
    method: "GET",
  });

  const data = await response.json();
  const orderStatusState = data.status;
  cancelButton.disabled = orderStatusState !== "Order Sent";
  theStatusBar.setStatus(orderStatusState);
  if (orderStatusState === "Ready to Pickup") {
    //if order is ready to pick up we break out of loop
    clearInterval(fiveSecondInterval);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("ORDER_ID");
    pickUpText.classList.remove("invisible");
  }
}

//set interval to run updateStatus() function every 5 seconds
const fiveSecondInterval = setInterval(updateStatus, 5000);

// run the function once
// (because the fiveSecondInterval will make its first call 5 seconds later)
updateStatus();

//CANCEL BUTTON WILL DO WITH DELETE REQUEST
cancelButton.addEventListener("click", async (e) => {
  console.log(clientOrderID);
  e.preventDefault();
  await fetch("/student/cancel-order", {
    method: "DELETE",
    body: JSON.stringify({ orderID: clientOrderID }),
    headers: { "Content-Type": "application/json" },
  });
  clearInterval(fiveSecondInterval);
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem("ORDER_ID");
  location.assign("/student/customize-pizza");
});
