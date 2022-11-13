var pizzaTypeText = document.getElementById("pizzaTypeText");
var toppingsText = document.getElementById("toppingsText");
var picKUpTimeText = document.getElementById("pickUpTimeText");
var specialInstructionsText = document.getElementById(
  "specialInstructionsText"
);
var orderStatusText = document.querySelector(".status");
var cancelButton = document.getElementById("cancel-button");

//get orderID from client(assume each client only has one order)
const clientOrderID = sessionStorage.getItem("ORDER_ID").split('"')[1];

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

//set interval 5 seconds
const fiveSecondInterval = setInterval(async () => {
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
  orderStatusText.textContent = orderStatusState;
  if (orderStatusState === "Ready to Pickup") {
    orderStatusText.classList.replace("red", "green");
  }
}, 5000);

//at this point order status is "ready to pick up"
//need to display order to pick up and make it green

// //CANCEL BUTTON WILL DO WITH DELETE REQUEST
// // cancelButton.addEventListener("click", () => {
// //     window.location = "/customizePizzaPage.html";
// //   });
