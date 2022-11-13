const newOrdersTab = document.getElementById("NewOrdersTabs");
const acceptedOrdersTab = document.getElementById("AcceptedOrdersTabs");
const finishedOrdersTab = document.getElementById("FinishedOrdersTabs");
const acceptButton = document.getElementById("accept-button");
const cancelButton = document.getElementById("cancel-button");
const specificNewOrderID = document.getElementById("specificNewOrderID");


//newOrdersTab will open newOrdersPage
newOrdersTab.addEventListener("click", (e) => {
    console.log("neworders")
    window.location.assign("/orderprocessor/new-orders");
});

//acceptedOrdersTab will load all accepted orders
acceptedOrdersTab.addEventListener("click", (e) => {
    console.log("acceptedOrders")
    window.location.assign("/orderprocessor/accepted-orders");
});

//finishedOrdersTab will load all finishedOrders
finishedOrdersTab.addEventListener("click", (e) => {
    console.log("finishedOrders")
    window.location.assign("/orderprocessor/finished-orders");
});





//accept button will copy information from pending orders(orders) collection into acceptedOrders collections
acceptButton.addEventListener("click", async (e) => {


    console.log("inside listen");
    e.preventDefault();
    
    
    //mongoOrderID was got in EJS file
    console.log(mongoOrderID);
    
    //this is a string not a json
    console.log(JSON.stringify({mongoOrderID: mongoOrderID}));

    //send mongoOrderID
    const response = await fetch("/orderprocessor/accept-order", { ///id as parameter?
    method: "POST",
    //send orderID not mongoID
    body: JSON.stringify({mongoOrderID: mongoOrderID}),
    headers: { "Content-Type": "application/json" }
    });
    
    //this is what data we receive
    const dataJSON = await response.json();
    
    if (dataJSON.success) {
        window.location.assign("/orderprocessor/new-orders");
    } else {
        console.log("failure");
    }
})


//cancel button will delete the order (not saving anywhere)