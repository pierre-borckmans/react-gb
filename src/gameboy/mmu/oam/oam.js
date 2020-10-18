import dma from '../../ppu/dma/dma';

const SIZE = 0xa0;
const data = new Uint8Array(SIZE).fill(0x0);

const read = address => {
  if (dma.isInProgress()) {
    return 0xff;
  } else {
    return data[address];
  }
};
const write = (address, value) => {
  data[address] = value;
};

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};
reset();

const oam = {
  read,
  write,
  reset,
};

export default oam;
