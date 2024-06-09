import path from "path";

const resolvePath = (string) => {
  const [command, ...args] = string.split(" ");

  const argsWithHandledCommas = [];
  const possibleCommas = [`\``, "'", '"'];
  let strInsideCommaAccum = "";
  let currComma = null;

  for (let i = 0; i < args.length; i++) {
    const firstSymbol = args[i][0];
    const lastSymbol = args[i][args[i].length - 1];

    if (currComma) {
      if (lastSymbol === currComma) {
        const arg = strInsideCommaAccum + " " + args[i].slice(0, -1);
        argsWithHandledCommas.push(arg);
        currComma = null;
        strInsideCommaAccum = "";
      } else {
        strInsideCommaAccum += " " + args[i];
      }
      continue;
    }

    if (possibleCommas.includes(firstSymbol)) {
      if (lastSymbol === firstSymbol) {
        argsWithHandledCommas.push(args[i].slice(1, -1));
      } else {
        currComma = firstSymbol;
        strInsideCommaAccum += args[i].slice(1);
      }
      continue;
    }

    argsWithHandledCommas.push(args[i]);
  }

  return {
    command,
    args: argsWithHandledCommas,
  };
};

const mockPath = [
  'cd "../название с пробелом" названиеБезПробела',
  'cd "../название с пробелом" "название с пробелом"',
  "cd '../название с пробелом' \"название с пробелом\"",
  "cd '../название с пробелом' 'название с пробелом'",
  'cd `../название с пробелом` "название с пробелом"',
  "cd `../название с пробелом` `название с пробелом`",
  "cd name1 name2",
  "cd",
];

mockPath.forEach((data) => {
  console.log(resolvePath(data));
});
