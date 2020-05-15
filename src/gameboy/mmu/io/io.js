import ppu from '../../ppu/ppu';
import apu from '../../apu/apu';
import joypad from '../../joypad/joypad';
import timer from '../../timer/timer';
import interrupts from '../../interrupts/interrupts';
import serial from '../../serial/serial';

import { format } from '../../../utils/utils';

const JOYPAD_ADDR = 0xff00;
const START_SERIAL_ADDR = 0xff01;
const END_SERIAL_ADDR = 0xff02;
const START_TIMER_ADDR = 0xff04;
const END_TIMER_ADDR = 0xff07;
const INTERRUPT_FLAGS_ADDR = 0xff0f;
const START_APU_ADDR = 0xff10;
const END_APU_ADDR = 0xff3f;
const START_PPU_ADDR = 0xff40;
const END_PPU_ADDR = 0xff4b;
const INTERRUPT_ENABLE_ADDR = 0xffff;

const read = (address) => {
  if (false) {
  } else if (address === JOYPAD_ADDR) {
    return joypad.read();
  } else if (address >= START_SERIAL_ADDR && address <= END_SERIAL_ADDR) {
    return serial.read(address);
  } else if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    return timer.read(address);
  } else if (address === INTERRUPT_FLAGS_ADDR) {
    return interrupts.read(address);
  } else if (address >= START_APU_ADDR && address <= END_APU_ADDR) {
    return apu.read(address);
  } else if (address >= START_PPU_ADDR && address <= END_PPU_ADDR) {
    return ppu.read(address);
  } else if (address === INTERRUPT_ENABLE_ADDR) {
    return interrupts.read(address);
  } else {
    return '--';
  }
};

const write = (address, value) => {
  if (address === JOYPAD_ADDR) {
    return joypad.write(value);
  } else if (address >= START_SERIAL_ADDR && address <= END_SERIAL_ADDR) {
    return serial.write(address, value);
  } else if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    timer.write(address, value);
  } else if (address === INTERRUPT_FLAGS_ADDR) {
    return interrupts.write(address, value);
  } else if (address >= START_APU_ADDR && address <= END_APU_ADDR) {
    return apu.write(address, value);
  } else if (address >= START_PPU_ADDR && address <= END_PPU_ADDR) {
    return ppu.write(address, value);
  } else if (address === INTERRUPT_ENABLE_ADDR) {
    return interrupts.write(address, value);
  } else {
    console.error(
      `Trying to write to invalid I/O address ${format('hex', address, 16)}`
    );
  }
};

const io = {
  read,
  write,
};

export default io;
