import StudentUI from "./StudentUI.js";

export default class MainUI {
  constructor() {
    this.userType = null;
  }

  render() {
    if (this.userType) {
      switch (this.userType) {
        case "student":
          const studentUI = new StudentUI();
          studentUI.render();
        default:
          console.log("hi");
      }
    } else {
    }
  }
}
