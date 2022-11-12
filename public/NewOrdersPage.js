const newOrdersTab = document.getElementById("NewOrdersTabs");
const acceptedOrdersTab = document.getElementById("AcceptedOrdersTabs");
const finishedOrdersTab = document.getElementById("FinishedOrdersTabs");


//newOrdersTab will simply reload current page?
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
