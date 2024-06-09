import readline from "readline/promises";
import { eol, print, printTable } from "../utils/print.js";

class Interface {
  constructor(appInstance) {
    this._interface = null;
    this.userName = null;
    this.app = appInstance;
    this.newLineSymbol = eol;
    this.print = print;
    this.printTable = printTable;
    this.initInterface();
  }

  initInterface() {
    this.getUserName();
    this._interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this._interface.on("close", () => this.sayGoodbye());
    this._interface.on("line", (data) =>
      this.app.inputHandler.parseInput(data)
    );
  }

  close() {
    this._interface.close();
  }

  getUserName() {
    const possibleName = process.argv.slice(2)[0];

    if (possibleName && possibleName.startsWith("--username")) {
      this.userName = possibleName.slice(possibleName.indexOf("=") + 1);
    } else {
      this.print("You didn't pass your nickname, so...");
      this.userName = "Anonymous";
    }
  }

  afterEach() {
    this.print(`You are currently in ${this.app.navigation.getCurrDir()}`);
  }

  sayHi() {
    this.print(`Welcome to the File Manager, ${this.userName}!`);
    this.afterEach();
  }

  sayGoodbye() {
    this.print(`Thank you for using File Manager, ${this.userName}, goodbye!`);
  }
}

export default Interface;
