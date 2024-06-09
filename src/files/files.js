import fs from "fs/promises";
import { OPERATION_ERROR_MSG } from "../vars/messages.js";

class Files {
  constructor(appInstance) {
    this.app = appInstance;
  }

  async getFileList() {
    try {
      let list = await fs.readdir(this.app.navigation.getCurrDir(), {
        withFileTypes: true,
      });
      let files = [];
      let dirs = [];

      list.forEach((item) => {
        if (item.isDirectory()) {
          dirs.push(item.name);
        } else if (item.isFile) {
          files.push(item.name);
        }
      });

      files = files.sort().map((item) => ({ Name: item, Type: "file" }));
      dirs = dirs.sort().map((item) => ({ Name: item, Type: "directory" }));

      const res = [...dirs, ...files];
      this.app.interface.printTable(res);
    } catch (error) {
      this.app.interface.print(OPERATION_ERROR_MSG);
    }

    this.app.interface.afterEach();
  }
}

export default Files;
