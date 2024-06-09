import os from "os";
import path from "path";

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

  cd(str) {
    const newPath = path.resolve()
  }
}

export default Navigation;
