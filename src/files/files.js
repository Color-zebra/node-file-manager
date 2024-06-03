import navigation from "../navigation/index.js";
import fs from "fs/promises";
import { printTable } from "../utils/print.js";
import { OPERATION_ERROR_MSG } from "../vars/messages.js";

class Files {
  constructor(interfaceInstance) {
    this.navigation = navigation;
    this.interface = interfaceInstance;
    this.getFileList();
  }

  async getFileList() {
    try {
      let list = await fs.readdir(this.navigation.getCurrDir(), {
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
      this.interface.printTable(res);
    } catch (error) {
      this.interface.print(OPERATION_ERROR_MSG);
    }

    this.interface.afterEach();
  }
}

export default Files;
