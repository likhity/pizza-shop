const pizzaTypeText = document.getElementById("pizzaType");
const toppingsText = document.getElementById("toppings");
const pickUptimeText = document.getElementById("pickUpTime");
const specialInstructionsText = document.getElementById("specialInstructions");
const editBtn = document.getElementById("editBtn");
const nextBtn = document.getElementById("submit");
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";

const order = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

//textContent is equal to order's pizzaType/toppings
pizzaTypeText.textContent = `Pizza Type: ${order.pizzaType}`;
toppingsText.textContent = `Toppings: ${order.toppings.join(", ")}`;

//parse pickUpTime sessionStorage
const pickUpTimeParsedArray = order.pickUpTime.split(" ");

//NOTE: format of pickUpTime is "8 40 pm"
pickUptimeText.textContent = `Pick-Up Time: 
${pickUpTimeParsedArray[0]}:${pickUpTimeParsedArray[1]} ${pickUpTimeParsedArray[2]}`;
specialInstructionsText.textContent = `Special Instructions: ${order.specialInstructions}`;

//editBtn allows user to change pizzaType/toppings
editBtn.addEventListener("click", (e) => {
  window.location.assign("/student/customize-pizza");
});

//submit button
nextBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  order.asuID = document.getElementById("asuID").textContent;

  //create response object
  //calls /student/create-order (in studentRoutes >> studentControllers)
  const response = await fetch("/student/create-order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  });

  //this data contaians stuff from (/student/create-order)
  //returns orderID
  //add to sessionStorage (should be local/time constraint)
  const data = await response.json();

  if (data.success) {
    location.assign("/student/view-order-status");
  }
});
