function substringReplace(
  str: string,
  repl: string,
  init: number,
  length: number
): string {
  if (init < 0) {
    init += str.length;
  }

  length = length !== undefined ? length : str.length;
  if (length < 0) {
    length = length + str.length - init;
  }

  return [
    str.slice(0, init),
    repl.substr(0, length),
    repl.slice(length),
    str.slice(init + length),
  ].join("");
}

export { substringReplace };
