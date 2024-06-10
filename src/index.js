import IOinterface from "./interface/interface.js";
import Files from "./files/files.js";
import Navigation from "./navigation/navigation.js";
import InputHandler from "./inputHandler/inputHandler.js";
import Os from "./os/os.js";
import Hash from "./hash/hash.js";
import Compress from "./compress/compress.js";

class App {
  constructor() {
    this.interface = new IOinterface(this);
    this.files = new Files(this);
    this.inputHandler = new InputHandler(this);
    this.navigation = new Navigation(this);
    this.os = new Os(this);
    this.hash = new Hash(this);
    this.compress = new Compress(this);
    this.init();
  }

  init() {
    this.interface.sayHi();
  }
}

new App();
