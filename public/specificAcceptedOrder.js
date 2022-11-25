// const newOrdersTab = document.getElementById("NewOrdersTabs");
// const acceptedOrdersTab = document.getElementById("AcceptedOrdersTabs");
// const finishedOrdersTab = document.getElementById("FinishedOrdersTabs");
const orderStatusText = document.querySelector(".status");
const pickUpButton = document.getElementById("order-picked-up-button");

const fiveSecondInterval = setInterval(async () => {
  //response is json object with orderStatus
  //NOTE: this is based on student controllers
  //if modelName = "acceptedOrder" =>returns order.orderStatus (accepted/cookings/readypickUp)
  //else => returns status of "Order Sent"
  console.log(`this is ${mongoOrderID} inside of fiveSEcond`);
  const response = await fetch(
    `/orderprocessor/order-status/${mongoOrderID}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  const orderStatusState = data.status;
  orderStatusText.textContent = orderStatusState;
  if (orderStatusState === "Ready to Pickup") {
    //change status color from red to green and enable order pickupButton
    orderStatusText.classList.replace("red", "green");
    pickUpButton.disabled = false;
    clearInterval(fiveSecondInterval);
  }
}, 5000);

//===============================================================================
//tab event listeners were deleted and implemented in ejs/html with href instead
//===============================================================================

//pickUpButton will move order from AcceptedOrders collections into FinishedOrders
pickUpButton.addEventListener("click", async (e) => {
  // console.log("inside listen");
  // e.preventDefault();
  console.log("pickUpButton is clicked");

  // //mongoOrderID was got in EJS file
  // console.log(mongoOrderID);

  // //this is a string not a json
  // console.log(JSON.stringify({mongoOrderID: mongoOrderID}));

  // //send mongoOrderID
  const response = await fetch("/orderprocessor/confirm-pickedup", {
    ///id as parameter?
    method: "POST",
    //send mongoID
    body: JSON.stringify({ mongoOrderID: mongoOrderID }),
    headers: { "Content-Type": "application/json" },
  });

  // //this is what data we receive
  const dataJSON = await response.json();

  if (dataJSON.success) {
    window.location.assign("/orderprocessor/accepted-orders");
  }
});
