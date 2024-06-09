import os from "os";
import path from "path";
import fs from "fs/promises";

class Navigation {
  constructor(appInstance) {
    this.app = appInstance;
    this.baseDir = null;
    this.currDir = null;
    this.rootDir = null;
    this.init();
  }

  init() {
    this.baseDir = os.homedir();
    this.currDir = this.baseDir;
    this.rootDir = path.parse(this.baseDir).root;
  }

  getBaseDir() {
    return this.baseDir;
  }

  getCurrDir() {
    return this.currDir;
  }

  up() {
    this.currDir = path.resolve(this.currDir, "..");
    this.app.interface.afterEach();
  }

  async cd(args) {
    try {
      const newPath = path.resolve(this.currDir, args[0]);
      const pathStat = await fs.stat(newPath);
      if (!pathStat.isDirectory()) {
        this.app.interface.print("There is no such directory");
        this.app.interface.afterEach();
      }
      this.currDir = newPath;
      this.app.interface.afterEach();
    } catch (error) {
      this.app.interface.printError();
    }
  }
}

export default Navigation;
