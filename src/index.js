class App {
  constructor() {
    this.getUserName();
    this.sayHi();
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
    process.stdout.write(`Welcome to the File Manager, ${this.userName}!`);
  }
}

new App();
