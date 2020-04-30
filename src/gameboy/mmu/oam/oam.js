import { format } from '../../../utils/utils';

const SIZE = 0xa0;
const data = new Uint8Array(SIZE).fill(0);

const read = (address) => data[address];
const write = (address, value) => (data[address] = value);

const POSITION_X_BIT = 0;
const POSITION_Y_BIT = 1;
const TILE_NUMBER_BIT = 2;

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
