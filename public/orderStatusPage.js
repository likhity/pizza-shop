var pizzaTypeText = document.getElementById("pizzaTypeText");
var toppingsText = document.getElementById("toppingsText");
var picKUpTimeText = document.getElementById("pickUpTimeText");
var specialInstructionsText = document.getElementById("specialInstructionsText");
var orderStatusText = document.getElementById("orderStatusText");
var cancelButton = document.getElementById("cancel-button");



//get orderID from client(assume each client only has one order)
const clientOrderID = sessionStorage.getItem("ORDER_ID");

//get order from client
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";
const clientPizzaOrder = JSON.parse(sessionStorage.getItem(STORAGE_KEY));


pizzaTypeText.textContent = `Pizza Type: ${clientPizzaOrder.pizzaType}`;
clientPizzaOrder
//parse pickUpTime sessionStorage
const pickUpTimeParsedArray = clientPizzaOrder.pickUpTime.split(" ");

//NOTE: format of pickUpTime is "8 40 pm"
picKUpTimeText.textContent = `Pick Up Time: 
${pickUpTimeParsedArray[0]}:${pickUpTimeParsedArray[1]} ${pickUpTimeParsedArray[2]}`;
specialInstructionsText.textContent = `Special Instructions: ${clientPizzaOrder.specialInstructions}`;





// //first response to get the loop going
var response = /*await*/ fetch("/student/order-status", {
    method: "GET",
    body: JSON.stringify(clientOrderID),
    headers: { "Content-Type": "application/json" }
});





    //set interval 5 seconds
    var fiveSecondInterval = setInterval(  async function() {

        //if orderStatus is "Ready To Pick Up"
        //break out of loop
        if (response.orderStatus === "Ready To Pick Up"){
            clearInterval(fiveSecondInterval);
        }

        console.log("intervalLoop");

        //response is json object with orderStatus
        //NOTE: this is based on student controllers
        //if modelName = "acceptedOrder" =>returns order.orderStatus (accepted/cookings/readypickUp)
        //else => returns status of "Order Sent"
        response = await fetch("/student/order-status", {
            method: "GET",
            body: JSON.stringify(clientOrderID),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        var orderStatusState = data.orderStatus;

        switch(orderStatusState){

            case 'Accepted':
                //change font,text,color to accepted
                cancelButton.disabled = true;
                orderStatusText.textContent = "Accepted";
                break;

            case 'Cooking':
                //change font,text,color to accepted
                orderStatusText.textContent = "Cooking";
                break;

            //if orderSent (notAccepted)
            default: 
                orderStatusText.textContent = "Order Sent"
                

            //order is ready to pick up will be outside of loop since broken
        }
    } ,5000)

//at this point order status is "ready to pick up"
//need to display order to pick up and make it green




// //CANCEL BUTTON WILL DO WITH DELETE REQUEST
// // cancelButton.addEventListener("click", () => {
// //     window.location = "/customizePizzaPage.html";
// //   });