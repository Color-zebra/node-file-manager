import os from "os";

class Navigation {
  constructor(appInstance) {
    this.app = appInstance;
    this.baseDir = null;
    this.currDir = null;
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

export default Navigation;
