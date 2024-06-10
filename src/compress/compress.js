import path from "path";
import zlib from "zlib";
import stream from "stream";
import fs from "fs";
import { mkdir } from "fs/promises";

class Compress {
  constructor(appInstance) {
    this.app = appInstance;
  }

  async compress(args) {
    try {
      const currFilePath = path.resolve(
        this.app.navigation.getCurrDir(),
        args[0]
      );
      const archiveFilePath = path.resolve(
        this.app.navigation.getCurrDir(),
        args[1]
      );
      const parsedArchiveFilePath = path.parse(archiveFilePath);
      if (!parsedArchiveFilePath.ext) {
        this.app.interface.print(
          'You should pass path with filename and extension in second argument. Example "C:/new-archive.br" or ./new-archive.br'
        );
        this.app.interface.printError();
        return;
      }
      const archiveStream = zlib.createBrotliCompress();

      await mkdir(parsedArchiveFilePath.dir, { recursive: true });
      const readStream = fs.createReadStream(currFilePath);
      const writeStream = fs.createWriteStream(archiveFilePath, {
        flags: "wx",
      });

      stream.pipeline(readStream, archiveStream, writeStream, (e) => {
        if (e && e.code !== "EEXIST") {
          fs.unlink(archiveFilePath, () => this.app.interface.printError());
        } else if (e) {
          this.app.interface.print("File already exist");
          this.app.interface.printError();
        }
      });

      writeStream.on("finish", () => this.app.interface.afterEach());
    } catch (e) {
      this.app.interface.printError();
    }
  }

  async decompress(args) {
    try {
      const currArchiveFilePath = path.resolve(
        this.app.navigation.getCurrDir(),
        args[0]
      );
      const decompressedFilePath = path.resolve(
        this.app.navigation.getCurrDir(),
        args[1]
      );
      const parsedDecompressedFilePath = path.parse(decompressedFilePath);
      if (!parsedDecompressedFilePath.ext) {
        this.app.interface.print(
          'You should pass path with filename and extension in second argument. Example "C:/decompressed.txt" or ./decompressed.txt'
        );
        this.app.interface.printError();
        return;
      }
      const archiveStream = zlib.createBrotliDecompress();

      await mkdir(parsedDecompressedFilePath.dir, { recursive: true });
      const readStream = fs.createReadStream(currArchiveFilePath);
      const writeStream = fs.createWriteStream(decompressedFilePath, {
        flags: "wx",
      });

      readStream.on("error", (e) => console.log("read", e));
      writeStream.on("error", (e) => console.log("write", e));

      stream.pipeline(readStream, archiveStream, writeStream, (e) => {
        if (e && e.code !== "EEXIST") {
          fs.unlink(decompressedFilePath, () =>
            this.app.interface.printError()
          );
        } else if (e) {
          this.app.interface.print("File already exist");
          this.app.interface.printError();
        }
      });

      writeStream.on("finish", () => this.app.interface.afterEach());
    } catch (e) {
      this.app.interface.printError();
    }
  }
}

export default Compress;
