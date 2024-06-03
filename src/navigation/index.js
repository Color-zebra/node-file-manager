import os from "os";
import path from "path";

class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.baseDir = os.homedir();
    this.currDir = this.baseDir;
  }

  getBaseDir() {
    return this.baseDir;
  }

  getCurrDir() {
    return this.currDir;
  }
}

export default new Navigation();
