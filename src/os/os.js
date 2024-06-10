import os from "os";
import { printTable } from "../utils/print.js";
import { INVALID_INPUT } from "../vars/messages.js";

class Os {
  constructor(appInstance) {
    this.app = appInstance;
  }

  eol() {
    this.app.interface.print(JSON.stringify(os.EOL));
    this.app.interface.afterEach();
  }

  cpus() {
    const cores = os.cpus();
    const res = cores.map(({ model, speed }) => ({
      Model: model,
      "Speed (GHz)": speed / 1000,
    }));
    printTable(res);
    this.app.interface.afterEach();
  }

  homedir() {
    this.app.interface.print(this.app.navigation.getBaseDir());
    this.app.interface.afterEach();
  }

  username() {
    this.app.interface.print(os.userInfo().username);
    this.app.interface.afterEach();
  }

  arch() {
    this.app.interface.print(os.arch());
    this.app.interface.afterEach();
  }

  os(args) {
    const flag = args[0];
    switch (flag) {
      case "--EOL":
        this.eol();
        break;
      case "--cpus":
        this.cpus();
        break;
      case "--homedir":
        this.homedir();
        break;
      case "--username":
        this.username();
        break;
      case "--architecture":
        this.arch();
        break;
      default:
        this.app.interface.print("Unknown OS command arg");
        this.app.interface.print(INVALID_INPUT);
    }
  }
}

export default Os;
