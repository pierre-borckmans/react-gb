import cartridge from '../cartridge/cartridge';

import { range } from 'lodash';

const MEMORY_SIZE = 0xffff;

const ROM0 = 'ROM0';
const ROM1 = 'ROM1';
const VIDEO_RAM = 'VRAM';
const EXTERNAL_RAM = 'XRAM';
const WORK_RAM = 'WRAM';
const ECHO_RAM = 'ECHO';
const OAM = 'OAM';
const IO = 'I/O';
const HIGH_RAM = 'HRAM';
const INTERRUPT_SWITCH = 'ITSW';
const INVALID = 'INVALID';

const START_ROM0 = 0x0000;
const END_ROM0 = 0x3fff;
const START_ROM1 = 0x4000;
const END_ROM1 = 0x7fff;
const START_VIDEO_RAM = 0x8000;
const END_VIDEO_RAM = 0x9fff;
const START_EXTERNAL_RAM = 0xa000;
const END_EXTERNAL_RAM = 0xbfff;
const START_WORK_RAM = 0xc000;
const END_WORK_RAM = 0xdfff;
const START_ECHO_RAM = 0xe000;
const END_ECHO_RAM = 0xfdff;
const START_OAM = 0xfe00;
const END_OAM = 0xfe9f;
const START_IO_MAPPING = 0xff00;
const END_IO_MAPPING = 0xff7f;
const START_HIGH_RAM = 0xff80;
const END_HIGH_RAM = 0xfffe;
const INTERRUPT_SWITCH_ADDR = 0xffff;

const read = (address) => {
  switch (getMemoryType(address)) {
    case ROM0:
      return cartridge.read(address - START_ROM0);
    case ROM1:
      return cartridge.read(address - START_ROM0);
    case VIDEO_RAM:
      return 0;
    case EXTERNAL_RAM:
      return 0;
    case WORK_RAM:
      return 0;
    case ECHO_RAM:
      return 0;
    case OAM:
      return 0;
    case IO:
      return 0;
    case HIGH_RAM:
      return 0;
    case INTERRUPT_SWITCH:
      return 0;
    default:
      console.error(`Trying to read from invalid memory address: ${address}`);
      return 0;
  }
};

const write = (address, value) => {
  switch (getMemoryType(address)) {
    case ROM0:
      return cartridge.write(address - START_ROM0, value);
    case ROM1:
      return cartridge.write(address - START_ROM0, value);
    case VIDEO_RAM:
      return 0;
    case EXTERNAL_RAM:
      return 0;
    case WORK_RAM:
      return 0;
    case ECHO_RAM:
      return 0;
    case OAM:
      return 0;
    case IO:
      return 0;
    case HIGH_RAM:
      return 0;
    case INTERRUPT_SWITCH:
      return 0;
    default:
      console.error(`Trying to write to invalid memory address: ${address}`);
      return 0;
  }
};

const getMemoryType = (address) => {
  if (address >= START_ROM0 && address <= END_ROM0) {
    return ROM0;
  } else if (address >= START_ROM1 && address <= END_ROM1) {
    return ROM1;
  } else if (address >= START_VIDEO_RAM && address <= END_VIDEO_RAM) {
    return VIDEO_RAM;
  } else if (address >= START_EXTERNAL_RAM && address <= END_EXTERNAL_RAM) {
    return EXTERNAL_RAM;
  } else if (
    (address >= START_WORK_RAM && address <= END_WORK_RAM) ||
    (address >= START_ECHO_RAM && address <= END_ECHO_RAM)
  ) {
    return WORK_RAM;
  } else if (address >= START_OAM && address <= END_OAM) {
    // OAM (Sprite Attribute Table)
    return OAM;
  } else if (address >= START_IO_MAPPING && address <= END_IO_MAPPING) {
    // I/O MAPPING
    return IO;
  } else if (address >= START_HIGH_RAM && address <= END_HIGH_RAM) {
    // HIGH RAM
    return HIGH_RAM;
  } else if (address === INTERRUPT_SWITCH_ADDR) {
    return INTERRUPT_SWITCH;
  } else {
    return INVALID;
  }
};

const getMemoryPage = (page) => {
  const memoryRange = page
    ? range(page * 256, (page + 1) * 256)
    : range(0, 256);
  return memoryRange.map((i) => mmu.read(i));
};

const mmu = {
  MEMORY_SIZE,
  read,
  write,
  getMemoryPage,
  getMemoryType,
};

export default mmu;
