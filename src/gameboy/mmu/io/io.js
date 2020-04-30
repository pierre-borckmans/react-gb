import ppu from '../../ppu/ppu';
import apu from '../../apu/apu';
import joypad from '../../joypad/joypad';
import timer from '../../timer/timer';

import { format } from '../../../utils/utils';

const SIZE = 0x80;

const JOYPAD_ADDR = 0xff00;
const START_TIMER_ADDR = 0xff04;
const END_TIMER_ADDR = 0xff07;
const START_APU_ADDR = 0xff10;
const END_APU_ADDR = 0xff26;
const START_PPU_ADDR = 0xff40;
const END_PPU_ADDR = 0xff4b;

const read = (address) => {
  if (false) {
  } else if (address === JOYPAD_ADDR) {
    return joypad.read();
  } else if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    return timer.read(address);
  } else if (address >= START_APU_ADDR && address <= END_APU_ADDR) {
    return apu.read(address);
  } else if (address >= START_PPU_ADDR && address <= END_PPU_ADDR) {
    return ppu.read(address);
  } else {
    return '--';
  }
};

const write = (address, value) => {
  if (address === JOYPAD_ADDR) {
    return joypad.write(value);
  } else if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    timer.write(address, value);
  } else if (address >= START_APU_ADDR && address <= END_APU_ADDR) {
    return apu.write(address, value);
  } else if (address >= START_PPU_ADDR && address <= END_PPU_ADDR) {
    return ppu.write(address, value);
  } else {
    throw new Error(
      `Trying to write to invalid I/O address ${format('hex', address, 16)}`
    );
  }
};

const reset = () => {};

const io = {
  read,
  write,
  reset,
};

export default io;
