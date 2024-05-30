import readline from "readline/promises";
import { eol, print } from "../utils/print.js";
import inputHandler from "../inputHandler/index.js";

class Interface {
  constructor() {
    this.newLineSymbol = eol;
    this.inputParser = inputHandler;
    this.print = print;
    this.initInterface();
  }

  initInterface() {
    this.getUserName();
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.interface.on("close", () => this.sayGoodbye());
    this.interface.on("line", (data) => this.inputParser.parseInput(data));
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

  sayHi() {
    this.print(`Welcome to the File Manager, ${this.userName}!`);
  }

  sayGoodbye() {
    this.print(`Thank you for using File Manager, ${this.userName}, goodbye!`);
  }
}

export default new Interface();
