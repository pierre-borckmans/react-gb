import mmu from '../mmu';
import ppu from '../../ppu/ppu';

const SIZE = 0x2000;
const data = new Uint8Array(SIZE).fill(0);

const read = address => data[address - mmu.START_VIDEO_RAM];
const write = (address, value) => {
  data[address - mmu.START_VIDEO_RAM] = value;

  if (address >= ppu.START_TILESET1_ADDR && address <= ppu.END_TILESET0_ADDR) {
    const tileIdx = (address - ppu.START_TILESET1_ADDR) >> 4;
    ppu.updateTile(tileIdx);
  }
};

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};

const videoRam = {
  read,
  write,
  reset,
};

export default videoRam;
