import IOinterface from "./interface/interface.js";
import Files from "./files/files.js";
import Navigation from "./navigation/navigation.js";
import InputHandler from "./inputHandler/inputHandler.js";

class App {
  constructor() {
    this.interface = new IOinterface(this);
    this.files = new Files(this);
    this.inputHandler = new InputHandler(this);
    this.navigation = new Navigation(this);
    this.init();
  }

  init() {
    this.interface.sayHi();
  }
}

new App();
