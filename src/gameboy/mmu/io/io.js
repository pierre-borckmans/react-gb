const SIZE = 0x80;
const data = new Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const io = {
  read,
  write,
};

export default io;
