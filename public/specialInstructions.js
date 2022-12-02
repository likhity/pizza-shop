const textArea = document.getElementById("specialInstructions");
const nxtBtn = document.getElementById("nextBtn");
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";


//get order from user session storage
//and set textArea to sessionStorage specialInstructions
const order = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
textArea.value = order.specialInstructions;


//----------------------------------------------------------------------------------------------------
nxtBtn.addEventListener("click", (e) => {


    //get userinput from the textarea
    //show in console
    //set order's special instructions (from sessionStorage)
    //reStoreSessionStorage w/ new specialInstructions
    userInputTextArea = textArea.value;
    order.specialInstructions = userInputTextArea;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));


    //route is based off server.js > studentRoutes > studentControllers
    window.location.assign("/student/order-summary");
})
//----------------------------------------------------------------------------------------------------


