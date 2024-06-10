import { OPERATION_ERROR_MSG } from "../vars/messages.js";
import path from "path";
import crypto from "crypto";
import { createReadStream } from "fs";

class Hash {
  constructor(appInstance) {
    this.app = appInstance;
  }

  calcHash(args) {
    try {
      const filePath = path.resolve(this.app.navigation.currDir, args[0]);
      const hash = crypto.createHash("sha256");
      hash.setEncoding("hex");

      const readStream = createReadStream(filePath);
      this.app.interface.pause();

      readStream.on("end", () => {
        hash.end();
        this.app.interface.resume();
        this.app.interface.print(hash.read());
        this.app.interface.afterEach();
      });
      readStream.on("error", () => {
        this.app.interface.resume();
        this.app.interface.print(OPERATION_ERROR_MSG);
      });

      readStream.pipe(hash);
    } catch (e) {
      this.app.interface.resume();
      this.app.interface.print(OPERATION_ERROR_MSG);
    }
  }
}

export default Hash;
