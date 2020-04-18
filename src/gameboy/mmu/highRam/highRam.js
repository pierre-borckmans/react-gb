const SIZE = 0x7f;
const data = new Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};
const highRam = {
  read,
  write,
  reset,
};

export default highRam;
