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
  } else if (address == INTERRUPT_SWITCH) {
    // INTERRUPT SWITCH
  } else {
  }
};

const write = (address, value) => {
  if (address >= START_CARTRIDGE && address <= END_CARTRIDGE) {
    // CARTRIDGE
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
  } else if (address == INTERRUPT_SWITCH) {
    // INTERRUPT SWITCH
  } else {
  }
};

const mmu = {
  read,
  write,
};

export default mmu;
