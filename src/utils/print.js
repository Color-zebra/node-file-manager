import os from "os";

export const eol = os.EOL;

export const print = (data) => {
  process.stdout.write(`${data}${eol}`);
};

export const printTable = (data) => {
  console.table(data);
};
