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
    //toppings set
  setToppings(mushroom, extraCheese, olives, onions) {
    this.mushroom = mushroom
    this.extraCheese = extraCheese
    this.olives = olives
    this.onions = onions
    //render correct image
    //if toppings is true; we remove invisibility of image in pizza customization; else make invisible
    //NOTE: not doing image for extra cheese but still tracking if chosen/not chosen
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



  //pizzaType set
  setPizzaType(pizzaType) {
    this.pizzaType = pizzaType //pizzaType is string
    //get html img of pizzaType, then change its src based on pizzaType
    const pizzaTypeImage = document.querySelector("img[alt='pizzaType']");
    pizzaTypeImage.src = `/pizzaType/${this.pizzaType}.png`;
  }
}

const customizePizzaForm = document.getElementById("customizePizzaForm");

const PizzaViewer = new PizzaDisplay();

customizePizzaForm.addEventListener("input", (e) => {

  //sets each topping to T/F based on if its checked in
  const mushroom = customizePizzaForm.mushroom.checked
  const extraCheese = customizePizzaForm.extraCheese.checked
  const olive = customizePizzaForm.olive.checked
  const onions = customizePizzaForm.onions.checked

  PizzaViewer.setToppings(mushroom, extraCheese, olive, onions);
  console.log(customizePizzaForm.querySelector("input[type='radio']:checked").value);
  PizzaViewer.setPizzaType(customizePizzaForm.querySelector("input[type='radio']:checked").value);
})
