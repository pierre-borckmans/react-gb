const toHex = (number, pad) =>
  number
    .toString(16)
    .toUpperCase()
    .padStart(pad || 2, '0');

const toBin = (number, pad) =>
  number
    .toString(2)
    .toUpperCase()
    .padStart(pad || 8, '0');

const format = (base, value, length) => {
  switch (base) {
    case 'hex':
      return `0x${toHex(value, length === 8 ? 2 : length === 16 ? 4 : 2)}`;
    case 'bin':
      return `b${toBin(value, length ? length : 8)}`;
    case 'dec':
      return value;
    default:
      return value;
  }
};

const readBit = (value, bitIdx) =>
  (value & (1 << bitIdx)) === 1 << bitIdx ? 1 : 0;

export { toHex, toBin, format, readBit };
