import fs from "fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { eol } from "../utils/print.js";

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
      this.app.interface.printError();
    }

    this.app.interface.afterEach();
  }

  cat(args) {
    try {
      const filePath = path.resolve(this.app.navigation.currDir, args[0]);
      const readstream = createReadStream(filePath, "utf-8");
      readstream.pipe(process.stdout);
      readstream.on("end", () => {
        this.app.interface.print(eol);
        this.app.interface.afterEach();
      });
      readstream.on("error", () => this.app.interface.printError());
    } catch (error) {
      this.app.interface.printError();
    }
  }

  async add(args) {
    try {
      const filePath = path.resolve(this.app.navigation.currDir, args[0]);
      await fs.writeFile(filePath, "", { flag: "wx" });
      this.app.interface.afterEach();
    } catch (error) {
      this.app.interface.printError();
    }
  }

  async rn(args) {
    try {
      const oldFilePath = path.resolve(this.app.navigation.currDir, args[0]);
      const newFilePath = path.resolve(oldFilePath, "..", args[1]);

      try {
        await fs.access(newFilePath);
        this.app.interface.print(`File with such name already exist`);
        this.app.interface.printError();
      } catch {
        await fs.rename(oldFilePath, newFilePath);
        this.app.interface.afterEach();
      }
    } catch (error) {
      this.app.interface.printError();
    }
  }
}

export default Files;
