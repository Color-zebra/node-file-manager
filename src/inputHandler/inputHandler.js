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
      default:
        this.app.interface.print(INVALID_INPUT);
    }
  }
}

export default InputHandler;
