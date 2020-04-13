const toHex = (number, pad) =>
  number
    .toString(16)
    .toUpperCase()
    .padStart(pad || 2, '0');

export { toHex };
