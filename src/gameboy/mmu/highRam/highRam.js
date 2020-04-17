const SIZE = 0x7f;
const data = new Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const highRam = {
  read,
  write,
};

export default highRam;
