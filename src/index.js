import IOinterface from "./interface/interface.js";

class App {
  constructor() {
    this.interface = IOinterface;
    this.init();
  }

  init() {
    this.interface.sayHi();
  }
}

new App();
