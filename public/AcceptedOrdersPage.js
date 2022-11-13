const newOrdersTab = document.getElementById("NewOrdersTabs");
const acceptedOrdersTab = document.getElementById("AcceptedOrdersTabs");
const finishedOrdersTab = document.getElementById("FinishedOrdersTabs");

//==============================TABS================================================
//newOrdersTab will load all newOrders
newOrdersTab.addEventListener("click", (e) => {
    console.log("neworders")
    window.location.assign("/orderprocessor/new-orders");
});

//acceptedOrdersTab will reload acceptedOrdersPage
acceptedOrdersTab.addEventListener("click", (e) => {
    console.log("acceptedOrders")
    window.location.assign("/orderprocessor/accepted-orders");
});

//finishedOrdersTab will load all finishedOrders
finishedOrdersTab.addEventListener("click", (e) => {
    console.log("finishedOrders")
    window.location.assign("/orderprocessor/finished-orders");
});
//==============================TABS================================================
