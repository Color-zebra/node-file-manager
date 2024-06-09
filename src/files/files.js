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

  async cp(args) {
    try {
      const currFilePath = path.resolve(this.app.navigation.currDir, args[0]);
      const fileName = path.parse(currFilePath).base;
      const newDirectoryPath = path.resolve(
        this.app.navigation.currDir,
        args[1]
      );
      const newFilePath = path.resolve(newDirectoryPath, fileName);

      try {
        await fs.mkdir(newDirectoryPath, { recursive: true });
      } catch (error) {
        this.app.interface.printError();
      }

      const readStream = createReadStream(currFilePath);
      readStream.on("error", () => {
        this.app.interface.print(
          `You should use this command only for existing files`
        );
        this.app.interface.printError();
      });

      const writeStream = createWriteStream(newFilePath, { flags: "wx" });
      writeStream.on("error", (e) => {
        this.app.interface.print(`Wrong new path`);
        this.app.interface.printError();
      });
      writeStream.on("finish", () => this.app.interface.afterEach());
      readStream.pipe(writeStream);
    } catch (error) {
      this.app.interface.printError();
    }
  }

  async mv(args) {
    try {
      const currFilePath = path.resolve(this.app.navigation.currDir, args[0]);
      const fileName = path.parse(currFilePath).base;
      const newDirectoryPath = path.resolve(
        this.app.navigation.currDir,
        args[1]
      );
      const newFilePath = path.resolve(newDirectoryPath, fileName);

      try {
        await fs.mkdir(newDirectoryPath, { recursive: true });
      } catch (error) {
        this.app.interface.printError();
      }

      const readStream = createReadStream(currFilePath);
      readStream.on("error", () => {
        this.app.interface.print(
          `You should use this command only for existing files`
        );
        this.app.interface.printError();
      });

      const writeStream = createWriteStream(newFilePath, { flags: "wx" });
      writeStream.on("error", (e) => {
        this.app.interface.print(`Wrong new path`);
        this.app.interface.printError();
      });
      writeStream.on("finish", () => {
        fs.rm(currFilePath).then(() => {
          this.app.interface.afterEach();
        });
      });
      readStream.pipe(writeStream);
    } catch (error) {
      this.app.interface.printError();
    }
  }

  async rm(args) {
    try {
      const filePath = path.resolve(this.app.navigation.currDir, args[0]);
      await fs.rm(filePath);
      this.app.interface.afterEach();
    } catch (error) {
      this.app.interface.printError();
    }
  }
}

export default Files;
