import os from "os";

export const eol = os.EOL;

export const print = (data) => {
  process.stdout.write(`${data}${eol}`);
};
