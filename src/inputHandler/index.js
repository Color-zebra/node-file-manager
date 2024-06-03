import FilesModule from "../files/files.js";

class InputHandler {
  constructor(interfaceInstance) {
    this.interface = interfaceInstance;
    this.filesModule = new FilesModule(this.interface);
  }

  parseInput(string) {
    this.filesModule.getFileList();
  }
}

export default InputHandler;
