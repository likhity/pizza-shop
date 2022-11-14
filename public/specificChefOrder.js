const readyToCookButton = document.getElementById("ready-to-cook-button");
const inTheOvenButton = document.getElementById("in-the-oven-button");
const readyToPickupButton = document.getElementById("ready-to-pick-up-button");


readyToCookButton.addEventListener("click", async () => {

  const response = await fetch("/chef/confirm-ready-to-cook", {
    method: "POST",
    body: JSON.stringify({ orderID: orderID }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (data.success) {
    readyToCookButton.classList.add("invisible")
    readyToCookButton.disabled = true
    inTheOvenButton.classList.remove("invisible")
    inTheOvenButton.disabled = false
  }

});


inTheOvenButton.addEventListener("click", async () => {

    const response = await fetch("/chef/confirm-cooking", {
      method: "POST",
      body: JSON.stringify({ orderID: orderID }),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json();
  
    if (data.success) {
      inTheOvenButton.classList.add("invisible")
      inTheOvenButton.disabled = true
      readyToPickupButton.classList.remove("invisible")
      readyToPickupButton.disabled = false
    }
  
  });


  readyToPickupButton.addEventListener("click", async () => {

    const response = await fetch("/chef/confirm-ready-to-pickup", {
      method: "POST",
      body: JSON.stringify({ orderID: orderID }),
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json();
  
    if (data.success) {
      location.assign("/chef/order-list");
    }
  
  });