import readline from "readline/promises";
import { eol, print, printTable } from "../utils/print.js";
import InputHandler from "../inputHandler/index.js";
import navigation from "../navigation/index.js";

class Interface {
  constructor() {
    this.newLineSymbol = eol;
    this.inputParser = new InputHandler(this);
    this.print = print;
    this.printTable = printTable;
    this.navigation = navigation;
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

  afterEach() {
    this.print(`You are currently in ${this.navigation.getCurrDir()}`);
  }

  sayHi() {
    this.print(`Welcome to the File Manager, ${this.userName}!`);
    this.afterEach();
  }

  sayGoodbye() {
    this.print(`Thank you for using File Manager, ${this.userName}, goodbye!`);
  }
}

export default new Interface();
