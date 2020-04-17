const SIZE = 0xa0;
const data = new Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const oam = {
  read,
  write,
};

export default oam;
