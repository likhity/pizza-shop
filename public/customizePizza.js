class PizzaDisplay {

  constructor() {
    //default pizza constuction
    this.pizzaType = "Cheese";
    this.toppings = { 
      mushroom: false,
      extraCheese: false,
      olives: false,
      onions: false,
     }
    
  }

    //set toppings with booleans
  setToppings(mushroom, extraCheese, olives, onions) {
    this.mushroom = mushroom
    this.extraCheese = extraCheese
    this.olives = olives
    this.onions = onions

    //if a topping is true, we remove invisibility to display, else make that topping invisible 
    if (mushroom) {
      document.getElementById("mushroom-img").classList.remove("invisible");
    } else {
      document.getElementById("mushroom-img").classList.add("invisible");
    }

    if (olives) {
      document.getElementById("olives-img").classList.remove("invisible");
    } else {
      document.getElementById("olives-img").classList.add("invisible");
    }
    
    if (onions) {
      document.getElementById("onions-img").classList.remove("invisible");
    } else {
      document.getElementById("onions-img").classList.add("invisible");
    }
  }

  //set PizzaType and set image
  setPizzaType(pizzaType) {
    this.pizzaType = pizzaType //pizzaType is string
    //get html img of pizzaType, then change its src based on pizzaType
    const pizzaTypeImage = document.querySelector("img[alt='pizzaType']");
    pizzaTypeImage.src = `/pizzaType/${this.pizzaType}.png`;
  }

  getPizzaType() {
    return this.pizzaType;
  }

  getToppings() {
    const toppings = [];
    if (this.mushroom) toppings.push("mushroom")
    if (this.onions) toppings.push("onions")
    if (this.olives) toppings.push("olives")
    if (this.extraCheese) toppings.push("extraCheese")

    return toppings;
  }
}
//----------------- END OF CLASS -------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------------------------------------------------------

const customizePizzaForm = document.getElementById("customizePizzaForm");
const nextBtn = document.getElementById("nextBtn");

//Storage key for a pizzaOrder (sessionStorage)
const STORAGE_KEY = "SUN_DEVIL_PIZZA_ORDER";

const PizzaViewer = new PizzaDisplay();

//new object defines entire pizzaOrder (includes pizzaDisplayItems and more)
const order = { 
  pickUpTime: "",
  asuID: "",
  pizzaType: "Cheese",
  toppings: [],
  specialInstructions: "",
 };

//if sessionStorage exists then we parse sessionStorage order into savedOrder
const savedOrder = sessionStorage.getItem(STORAGE_KEY) && JSON.parse(sessionStorage.getItem(STORAGE_KEY));

//if savedOrder was a parsed object from client sessionStorage
if (savedOrder) {
  //set pizzaType (class) to pizzaType retrieved from sessionStorage
  PizzaViewer.setPizzaType(savedOrder.pizzaType);

  //set toppings to T/F if it was included in topping array
  const toppings = savedOrder.toppings;
  const mushroom = toppings.includes("mushroom")
  const extraCheese = toppings.includes("extraCheese")
  const olives = toppings.includes("olives")
  const onions = toppings.includes("onions")
  //set pizzaType toppings (class) with booleans retrieved from session storage
  PizzaViewer.setToppings(
    mushroom,
    extraCheese,
    olives,
    onions
  );
  //rest of attributes from sessionStorage are kept after submitting (eventListener on nextBtn)
  order.asuID = savedOrder.asuID;
  order.pickUpTime = savedOrder.pickUpTime;
  order.specialInstructions = savedOrder.specialInstructions;

  
  //sets form checkboxes based on retrieved sessionStorage pizzaType and toppings
  
    //find pizzaType value and set checked to true
    document.querySelector(`[value=${savedOrder.pizzaType}]`).checked = true;

    //find toppings values and set checkboxes to true if it was in sessionStorage
    customizePizzaForm.mushroom.checked = mushroom
    customizePizzaForm.extraCheese.checked = extraCheese
    customizePizzaForm.olive.checked = olives
    customizePizzaForm.onions.checked = onions
}
//------------------------------------------------------------------------------------------------------------------------------------






//------------------------------------------------------------------------------------------------------------------------------------
//event listener of customizePizzaForm sets pizzaType and toppings (class) respondes to any change within the form
customizePizzaForm.addEventListener("input", (e) => {  

  //checks each checkbox and sets that toppings to T/F
  const mushroom = customizePizzaForm.mushroom.checked
  const extraCheese = customizePizzaForm.extraCheese.checked
  const olive = customizePizzaForm.olive.checked
  const onions = customizePizzaForm.onions.checked
  
  //sets pizzaType toppings (class) to T/F based on current checkboxes
  PizzaViewer.setToppings(mushroom, extraCheese, olive, onions);
  //set pizzaType (class) based on radio button thats checked (string value is equal to label of radio)
  PizzaViewer.setPizzaType(customizePizzaForm.querySelector("input[type='radio']:checked").value);
})
//------------------------------------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------------------------------------------------------

//next Button Event Listener responds to a click (on button)
nextBtn.addEventListener("click", (e) => {

  //retrieve pizzaType, and toppings from class
  order.pizzaType = PizzaViewer.getPizzaType();
  order.toppings = PizzaViewer.getToppings();

  //return new order
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));

  //give new page
  window.location.assign("/student/pickup-time");
})
//------------------------------------------------------------------------------------------------------------------------------------