import MainUI from "./MainUI.js";

class PizzaOrderingApplication {
  constructor() {}

  render() {
    const mainUI = new MainUI();
    mainUI.render();
  }
}

const app = new PizzaOrderingApplication();

app.render();
