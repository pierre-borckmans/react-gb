import cartridge from '../cartridge/cartridge';

import { range } from 'lodash';

const MEMORY_SIZE = 0xffff;

const START_CARTRIDGE = 0x0000;
const END_CARTRIDGE = 0x7fff;
const START_VIDEO_RAM = 0x8000;
const END_VIDEO_RAM = 0x9fff;
const START_EXTERNAL_RAM = 0xa000;
const END_EXTERNAL_RAM = 0xbfff;
const START_WORK_RAM = 0xc000;
const END_WORK_RAM = 0xdfff;
const START_MIRROR_RAM = 0xe000;
const END_MIRROR_RAM = 0xfdff;
const START_OAM = 0xfe00;
const END_OAM = 0xfe9f;
const START_IO_MAPPING = 0xff00;
const END_IO_MAPPING = 0xff7f;
const START_HIGH_RAM = 0xff80;
const END_HIGH_RAM = 0xfffe;
const INTERRUPT_SWITCH = 0xffff;

const read = (address) => {
  if (address >= START_CARTRIDGE && address <= END_CARTRIDGE) {
    // CARTRIDGE
    return cartridge.read(address - START_CARTRIDGE);
  } else if (address >= START_VIDEO_RAM && address <= END_VIDEO_RAM) {
    // VIDEO RAM
    return 0;
  } else if (address >= START_EXTERNAL_RAM && address <= END_EXTERNAL_RAM) {
    // EXTERNAL RAM
    return 0;
  } else if (
    (address >= START_WORK_RAM && address <= END_WORK_RAM) ||
    (address >= START_MIRROR_RAM && address <= END_MIRROR_RAM)
  ) {
    // WORK RAM
    return 0;
  } else if (address >= START_OAM && address <= END_OAM) {
    // OAM (Sprite Attribute Table)
    return 0;
  } else if (address >= START_IO_MAPPING && address <= END_IO_MAPPING) {
    // I/O MAPPING
    return 0;
  } else if (address >= START_HIGH_RAM && address <= END_HIGH_RAM) {
    // HIGH RAM
    return 0;
  } else if (address === INTERRUPT_SWITCH) {
    // INTERRUPT SWITCH
    return 0;
  } else {
    console.error(`Invalid memory address accessed: ${address}`);
    return 0;
    // throw new Error(`Invalid memory address accessed: ${address}`);
  }
};

const write = (address, value) => {
  if (address >= START_CARTRIDGE && address <= END_CARTRIDGE) {
    // CARTRIDGE
    return cartridge.write(address - START_CARTRIDGE, value);
  } else if (address >= START_VIDEO_RAM && address <= END_VIDEO_RAM) {
    // VIDEO RAM
  } else if (address >= START_EXTERNAL_RAM && address <= END_EXTERNAL_RAM) {
    // EXTERNAL RAM
  } else if (
    (address >= START_WORK_RAM && address <= END_WORK_RAM) ||
    (address >= START_MIRROR_RAM && address <= END_MIRROR_RAM)
  ) {
    // WORK RAM
  } else if (address >= START_OAM && address <= END_OAM) {
    // OAM (Sprite Attribute Table)
  } else if (address >= START_IO_MAPPING && address <= END_IO_MAPPING) {
    // I/O MAPPING
  } else if (address >= START_HIGH_RAM && address <= END_HIGH_RAM) {
    // HIGH RAM
  } else if (address === INTERRUPT_SWITCH) {
    // INTERRUPT SWITCH
  } else {
    console.error(`Invalid memory address accessed: ${address}`);
    // throw new Error(`Invalid memory address accessed: ${address}`);
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
};

export default mmu;
