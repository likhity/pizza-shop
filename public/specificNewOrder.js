const acceptButton = document.getElementById("accept-button");
const cancelButton = document.getElementById("cancel-button");
const specificNewOrderID = document.getElementById("specificNewOrderID");


//==========================================================================
// deleted tab event listeners and instead added href to link between pages
//==========================================================================


//accept button will copy information from pending orders(orders) collection into acceptedOrders collections
acceptButton.addEventListener("click", async (e) => {


    e.preventDefault();
    
    
    //mongoOrderID was got in EJS file
    
    //this is a string not a json

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