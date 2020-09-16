const SIZE = 0xa0;
const data = new Uint8Array(SIZE).fill(0x0);

const read = address => data[address];
const write = (address, value) => {
  data[address] = value;
};

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};

const oam = {
  read,
  write,
  reset,
};

export default oam;
