
const nxtBtn = document.getElementById("nextBtnpickTime");
const hourTimeSelect = document.getElementById("hourTime");
const minuteTimeSelect = document.getElementById("minuteTime");
const amPmSelect = document.getElementById("amPm");

// vars to store value of user choice times
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";


nxtBtn.addEventListener("click", (e) => {
    
    const order = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    //get user input
    console.log(order);
    const hourTime = hourTimeSelect.value;
    const minuteTime = minuteTimeSelect.value;
    const amPm = amPmSelect.value;
    console.log(hourTime)
    console.log(minuteTime)
    console.log(amPm)

    order.pickUpTime = `${hourTime}:${minuteTime} ${amPm}`;
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    
    window.location.assign("/student/special-instructions");
})



