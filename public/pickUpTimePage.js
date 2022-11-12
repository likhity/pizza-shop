const hourTimeSelect = document.getElementById("hourTime");
const minuteTimeSelect = document.getElementById("minuteTime");
const amPmSelect = document.getElementById("amPm");
const nxtBtn = document.getElementById("nextBtnpickTime");

const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";

//retrieve sessionStroage (to use time to display)
//NOTE: there will be a sessionStorage since we came from customizePizzaPage
//which set a sessionStorage
const savedOrder = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

var hourTime = "";
var minuteTime = "";
var amPm = "";

//if there is a pickUpTime in sessionStorage
if (savedOrder.pickUpTime){

    //retrieve pickUpTime
    const parsedPickUpTimeArray = savedOrder.pickUpTime.split(" ");

    // pickUpTime format = "01h:15m:am"
    //set corresponding values 
    hourTime = parsedPickUpTimeArray[0];
    minuteTime = parsedPickUpTimeArray[1];
    amPm = parsedPickUpTimeArray[2];

    //find values hour = "01h", minute = "15m", amPm = "am"
    //select form value = value retrieved from sessionStorage
    hourTimeSelect.value = hourTime;
    minuteTimeSelect.value = minuteTime;
    amPmSelect.value = amPm;    
}

nxtBtn.addEventListener("click", (e) => {
    
    //retrieve sessionStorage of order
    const order = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

    //get user input
    hourTime = hourTimeSelect.value;
    minuteTime = minuteTimeSelect.value;
    amPm = amPmSelect.value;

    //set retrieved sessionStorage order's pickUpTime to userInput pickupTime
    //NOTE: used " : " for parsing when retrieving pickUpTime
    //format "05h:35m:am"
    order.pickUpTime = `${hourTime} ${minuteTime} ${amPm}`;

    //set sessionStorage to newOrder w/ new pickUpTime
    //send user to next page (specialInstructions)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    window.location.assign("/student/special-instructions");
})



