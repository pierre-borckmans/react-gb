import mmu from '../mmu';

const SIZE = 0x80000;
const data = new Uint8Array(SIZE).fill(0);

const read = (address) => data[address - mmu.START_EXTERNAL_RAM];
const write = (address, value) =>
  (data[address - mmu.START_EXTERNAL_RAM] = value);

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};

const externalRam = {
  read,
  write,
  reset,
};

export default externalRam;
