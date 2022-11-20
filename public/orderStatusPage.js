const cancelButton = document.getElementById("cancel-button");
const pickUpText = document.querySelector(".pickup-text");

//get orderID from client(assume each client only has one order)
const clientStudentID = document.getElementById("asuID").textContent;

//get order from client
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";

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
  const response = await fetch(`/student/order-status/${clientStudentID}`, {
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
  e.preventDefault();
  await fetch("/student/cancel-order", {
    method: "DELETE",
    body: JSON.stringify({ studentID: clientStudentID }),
    headers: { "Content-Type": "application/json" },
  });
  clearInterval(fiveSecondInterval);
  sessionStorage.removeItem(STORAGE_KEY);
  location.assign("/student/customize-pizza");
});
