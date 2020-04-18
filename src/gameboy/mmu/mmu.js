import cartridge from '../cartridge/cartridge';
import videoRam from './videoRam/videoRam';
import externalRam from './externalRam/externalRam';
import workRam from './workRam/workRam';
import oam from './oam/oam';
import io from './io/io';
import highRam from './highRam/highRam';

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
const INVALID = '----';

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
      return videoRam.read(address - START_VIDEO_RAM);
    case EXTERNAL_RAM:
      return externalRam.read(address - START_EXTERNAL_RAM);
    case WORK_RAM:
      return workRam.read(address - START_WORK_RAM);
    case ECHO_RAM:
      return workRam.read(address - START_ECHO_RAM);
    case OAM:
      return oam.read(address - START_OAM);
    case IO:
      return io.read(address - START_IO_MAPPING);
    case HIGH_RAM:
      return highRam.read(address - START_HIGH_RAM);
    case INTERRUPT_SWITCH:
      // TODO
      return 0;
    default:
      // console.error(`Trying to read from invalid memory address: ${address}`);
      return '--';
  }
};

const write = (address, value) => {
  switch (getMemoryType(address)) {
    case ROM0:
      return cartridge.write(address - START_ROM0, value);
    case ROM1:
      return cartridge.write(address - START_ROM0, value);
    case VIDEO_RAM:
      return videoRam.write(address - START_VIDEO_RAM, value);
    case EXTERNAL_RAM:
      return externalRam.write(address - START_EXTERNAL_RAM, value);
    case WORK_RAM:
      return workRam.write(address - START_WORK_RAM, value);
    case ECHO_RAM:
      return workRam.write(address - START_ECHO_RAM, value);
    case OAM:
      return oam.write(address - START_OAM, value);
    case IO:
      return io.write(address - START_IO_MAPPING, value);
    case HIGH_RAM:
      return highRam.write(address - START_HIGH_RAM, value);
    case INTERRUPT_SWITCH:
      // TODO
      return 0;
    default:
      // console.error(`Trying to write to invalid memory address: ${address}`);
      return '?';
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
  } else if (address >= START_WORK_RAM && address <= END_WORK_RAM) {
    return WORK_RAM;
  }
  if (address >= START_ECHO_RAM && address <= END_ECHO_RAM) {
    return ECHO_RAM;
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

const reset = () => {
  cartridge.reset();
  videoRam.reset();
  externalRam.reset();
  workRam.reset();
  oam.reset();
  io.reset();
  highRam.reset();
};

const mmu = {
  MEMORY_SIZE,
  START_ROM0,
  START_ROM1,
  START_VIDEO_RAM,
  START_EXTERNAL_RAM,
  START_WORK_RAM,
  START_ECHO_RAM,
  START_OAM,
  START_IO_MAPPING,
  START_HIGH_RAM,
  read,
  write,
  getMemoryPage,
  getMemoryType,
  reset,
};

export default mmu;
