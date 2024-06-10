import { INVALID_INPUT } from "../vars/messages.js";

class InputHandler {
  constructor(appInstance) {
    this.app = appInstance;
  }

  parseInput(string) {
    const [command, ...args] = string.split(" ");

    const argsWithHandledCommas = [];
    const possibleCommas = [`\``, "'", '"'];
    let strInsideCommaAccum = "";
    let currComma = null;

    for (let i = 0; i < args.length; i++) {
      const firstSymbol = args[i][0];
      const lastSymbol = args[i][args[i].length - 1];

      if (currComma) {
        if (lastSymbol === currComma) {
          const arg = strInsideCommaAccum + " " + args[i].slice(0, -1);
          argsWithHandledCommas.push(arg);
          currComma = null;
          strInsideCommaAccum = "";
        } else {
          strInsideCommaAccum += " " + args[i];
        }
        continue;
      }

      if (possibleCommas.includes(firstSymbol)) {
        if (lastSymbol === firstSymbol) {
          argsWithHandledCommas.push(args[i].slice(1, -1));
        } else {
          currComma = firstSymbol;
          strInsideCommaAccum += args[i].slice(1);
        }
        continue;
      }

      argsWithHandledCommas.push(args[i]);
    }

    return {
      command,
      args: argsWithHandledCommas,
    };
  }

  executeInput(string) {
    const { command, args } = this.parseInput(string);

    switch (command) {
      case "ls":
        this.app.files.getFileList();
        break;
      case "up":
        this.app.navigation.up();
        break;
      case "cd":
        this.app.navigation.cd(args);
        break;
      case "cat":
        this.app.files.cat(args);
        break;
      case "add":
        this.app.files.add(args);
        break;
      case "rn":
        this.app.files.rn(args);
        break;
      case "cp":
        this.app.files.cp(args);
        break;
      case "mv":
        this.app.files.mv(args);
        break;
      case "rm":
        this.app.files.rm(args);
        break;
      case "os":
        this.app.os.os(args);
        break;
      case "hash":
        this.app.hash.calcHash(args);
        break;
      case "compress":
        this.app.compress.compress(args);
        break;
      case "decompress":
        this.app.compress.decompress(args);
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
