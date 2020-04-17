const SIZE = 0x2000;
const data = new Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const externalRam = {
  read,
  write,
};

export default externalRam;
