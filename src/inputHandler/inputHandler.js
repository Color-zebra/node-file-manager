import { INVALID_INPUT } from "../vars/messages.js";

class InputHandler {
  constructor(appInstance) {
    this.app = appInstance;
  }

  parseInput(string) {
    switch (string) {
      case "ls":
        this.app.files.getFileList();
        break;
      case "up":
        this.app.navigation.up();
        break;
      case ".exit":
        this.app.interface.close();
        break;
      default:
        this.app.interface.print(INVALID_INPUT);
    }
  }
}

export default InputHandler;
