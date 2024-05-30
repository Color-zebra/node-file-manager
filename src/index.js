import readline from "readline/promises";

class App {
  constructor() {
    this.init();
  }

  init() {
    this.newLineSymbol = "\r\n";
    this.initInterface();
    this.getUserName();
    this.sayHi();
  }

  initInterface() {
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.interface.on("close", () => this.sayGoodbye());
  }

  getUserName() {
    const possibleName = process.argv.slice(2)[0];

    if (possibleName && possibleName.startsWith("--username")) {
      this.userName = possibleName.slice(possibleName.indexOf("=") + 1);
    } else {
      process.stdout.write("You didn't pass your nickname, so... ");
      this.userName = "Anonymous";
    }
  }

  sayHi() {
    this.interface.write(
      `Welcome to the File Manager, ${this.userName}!${this.newLineSymbol}`
    );
  }

  sayGoodbye() {
    this.interface.write(
      `Thank you for using File Manager, ${this.userName}, goodbye!${this.newLineSymbol}`
    );
  }
}

new App();
