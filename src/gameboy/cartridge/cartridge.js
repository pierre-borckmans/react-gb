import mmu from '../mmu/mmu';
import mbc from './mbc/mbc';

import rom from '../../assets/roms/rom1.gb';

import testRomCpu1 from '../../assets/roms/tests/cpu_instrs/01-special.gb';
import testRomCpu2 from '../../assets/roms/tests/cpu_instrs/02-interrupts.gb';
import testRomCpu3 from '../../assets/roms/tests/cpu_instrs/03-op sp,hl.gb';
import testRomCpu4 from '../../assets/roms/tests/cpu_instrs/04-op r,imm.gb';
import testRomCpu5 from '../../assets/roms/tests/cpu_instrs/05-op rp.gb';
import testRomCpu6 from '../../assets/roms/tests/cpu_instrs/06-ld r,r.gb';
import testRomCpu7 from '../../assets/roms/tests/cpu_instrs/07-jr,jp,call,ret,rst.gb';
import testRomCpu8 from '../../assets/roms/tests/cpu_instrs/08-misc instrs.gb';
import testRomCpu9 from '../../assets/roms/tests/cpu_instrs/09-op r,r.gb';
import testRomCpu10 from '../../assets/roms/tests/cpu_instrs/10-bit ops.gb';
import testRomCpu11 from '../../assets/roms/tests/cpu_instrs/11-op a,(hl).gb';
import testRomCpuAll from '../../assets/roms/tests/cpu_instrs.gb';
import testRomInstrTimingAll from '../../assets/roms/tests/instr_timing.gb';
import testRomMemTiming1 from '../../assets/roms/tests/mem_timing/01-read_timing.gb';
import testRomMemTiming2 from '../../assets/roms/tests/mem_timing/02-write_timing.gb';
import testRomMemTiming3 from '../../assets/roms/tests/mem_timing/03-modify_timing.gb';
import testRomMemTimingAll from '../../assets/roms/tests/mem_timing.gb';
import testRomMemTiming2All from '../../assets/roms/tests/mem_timing2.gb';
import testRomInterruptTiming from '../../assets/roms/tests/interrupt_time.gb';
import testRomHaltBug from '../../assets/roms/tests/halt_bug.gb';

import { range } from 'lodash';

const testRoms = {
  'test cpu: 1 special': testRomCpu1,
  'test cpu: 2 interrupts': testRomCpu2,
  'test cpu: 3 op sp,hl': testRomCpu3,
  'test cpu: 4 op r,imm': testRomCpu4,
  'test cpu: 5 op rp': testRomCpu5,
  'test cpu: 6 ld r,r': testRomCpu6,
  'test cpu: 7 jr,jp,call,ret,rst': testRomCpu7,
  'test cpu: 8 misc': testRomCpu8,
  'test cpu: 9 op r,r': testRomCpu9,
  'test cpu: 10 bit ops': testRomCpu10,
  'test cpu: 11 op a,(hl)': testRomCpu11,
  'test cpu: all': testRomCpuAll,
  'test timing: instr': testRomInstrTimingAll,
  'test timing: mem: 1 read': testRomMemTiming1,
  'test timing: mem: 2 write': testRomMemTiming2,
  'test timing: mem: 3 modify': testRomMemTiming3,
  'test timing: mem: all': testRomMemTimingAll,
  'test timing: mem2: all': testRomMemTiming2All,
  'test timing: interrupt': testRomInterruptTiming,
  'test bug: halt': testRomHaltBug,
};

const SIZE = 0x80000;

// const NINTENDO_LOGO_START_ADDR = 0x104;
// const NINTENDO_LOGO_END_ADDR = 0x133;
const TITLE_START_ADDR = 0x134;
const TITLE_END_ADDR = 0x142;
const GB_OR_CGB_ADDR = 0x143; // CGB if 0x80
const GB_OR_SGB_ADDR = 0x146; // SGB if 0x80

const CARTRIDGE_TYPE_ADDR = 0x147;
// 00 ROM ONLY                              11 ROM + MB3
// 01 ROM + MBC1                            12 ROM + MBC3 + RAM
// 02 ROM + MBC1 + RAM                      13 ROM + MBC3 + RAM + BATTERY
// 03 ROM + MBC1 + RAM + BATTERY            19 ROM + MBC5
// 05 ROM + MBC2                            1A ROM + MBC5 + RAM
// 06 ROM + MBC2 + BATTERY                  1B ROM + MBC5 + RAM + BATTERY
// 08 ROM + RAM                             1C ROM + MBC5 + RUMBLE
// 09 ROM + RAM + BATTERY                   1D ROM + MBC5 + RUMBLE + SRAM
// 0B ROM + MMM01                           1E ROM + MBC5 + RUMBLE + SRAM + BATTERY
// 0C ROM + MMM01 + SRAM                    1F POCKET CAMERA
// 0D ROM + MMM01 + SRAM + BATTERY          FD BANDAI TAMA5
// 0F ROM + MBC3 + TIMER + BATTERY          FE HUDSON HUC3
// 10 ROM + MBC3 + TIMER + RAM + BATTERY    FF HUDSON HUC1

const ROM_SIZE_ADDR = 0x148;
// 00   32 KByte -   2 banks
// 01   64 KByte -   4 banks
// 02  128 KByte -   8 banks
// 03  256 KByte -  16 banks
// 04  512 KByte -  32 banks
// 05 1024 KByte -  64 banks
// 06 2048 KByte - 128 banks
// 52 1152 KByte -  72 banks
// 53 1280 KByte -  80 banks
// 54 1536 KByte -  96 banks

const RAM_SIZE_ADDR = 0x149;
// 00 None
// 01    2 KByte -  1 bank
// 02    8 Kbyte -  1 bank
// 03   32 KByte -  4 banks
// 04  128 KByte - 16 banks

const DESTINATION_CODE_ADDR = 0x14a;
// 00 Japan
// != 0 NON Japan

// const COMPLEMENT_CHECK_ADDR = 0x14d;

let loadedROM = new Uint8Array(SIZE).fill(0);

// prettier-ignore
const bootROM = [
  0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
  0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
  0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
  0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
  0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
  0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
  0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
  0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
  0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xE2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
  0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
  0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
  0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
  0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
  0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3C, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x3C,
  0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
  0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50,
];

const loadROM = async (romName) => {
  await fetch(romName ? testRoms[romName] : rom)
    .then((raw) => raw.arrayBuffer())
    .then((buffer) => (loadedROM = [...new Uint8Array(buffer)]));

  const romType = loadedROM[CARTRIDGE_TYPE_ADDR];
  mbc.setType(romType);
};

const read = (address) => {
  if (address <= 0xff && !mmu.isBootComplete()) {
    return bootROM[address];
  } else {
    return loadedROM[address];
  }
};

const write = (address, value) => {
  // throw new Error('Trying to write to the ROM');
  // TODO: this should not be allowed, right?
  loadedROM[address] = value;
};

const reset = () => {
  loadedROM = new Array(SIZE).fill(0);
};

const getTitle = () =>
  range(TITLE_START_ADDR, TITLE_END_ADDR)
    .map((addr) => String.fromCharCode(loadedROM[addr]))
    .join('');

const getRegion = () =>
  loadedROM[DESTINATION_CODE_ADDR] ? 'Non-Japan' : 'Japan';

const getCGB = () => loadedROM[GB_OR_CGB_ADDR] === 0x80;

const getSGB = () => loadedROM[GB_OR_SGB_ADDR] === 0x80;

const getROMSizeAndBanks = () => {
  switch (loadedROM[ROM_SIZE_ADDR]) {
    case 0x00:
      return [32, 2];
    case 0x01:
      return [64, 4];
    case 0x02:
      return [128, 8];
    case 0x03:
      return [256, 16];
    case 0x04:
      return [512, 32];
    case 0x05:
      return [1024, 64];
    case 0x06:
      return [2048, 12];
    case 0x52:
      return [1152, 72];
    case 0x53:
      return [1280, 80];
    case 0x54:
      return [1536, 96];
    default:
      return [0, 0];
  }
};

const getRAMSizeAndBanks = () => {
  switch (loadedROM[RAM_SIZE_ADDR]) {
    case 0x00:
      return [0, 0];
    case 0x01:
      return [2, 1];
    case 0x02:
      return [8, 1];
    case 0x03:
      return [32, 4];
    case 0x04:
      return [128, 1];
    default:
      return [0, 0];
  }
};

const getType = () => {
  switch (loadedROM[CARTRIDGE_TYPE_ADDR]) {
    case 0x00:
      return 'ROM ONLY';
    case 0x01:
      return 'ROM + MBC1';
    case 0x02:
      return 'ROM + MBC1 + RAM';
    case 0x03:
      return 'ROM + MBC1 + RAM + BATTERY';
    case 0x05:
      return 'ROM + MBC2';
    case 0x06:
      return 'ROM + MBC2 + BATTERY';
    case 0x08:
      return 'ROM + RAM';
    case 0x09:
      return 'ROM + RAM + BATTERY';
    case 0x0b:
      return 'ROM + MMM01';
    case 0x0c:
      return 'ROM + MMM01 + SRAM';
    case 0x0d:
      return 'ROM + MMM01 + SRAM + BATTERY';
    case 0x0f:
      return 'ROM + MBC3 + TIMER + BATTERY';
    case 0x10:
      return 'ROM + MBC3 + TIMER + RAM + BATTERY';
    case 0x11:
      return 'ROM + MB3';
    case 0x12:
      return 'ROM + MBC3 + RAM';
    case 0x13:
      return 'ROM + MBC3 + RAM + BATTERY';
    case 0x19:
      return 'ROM + MBC5';
    case 0x1a:
      return 'ROM + MBC5 + RAM';
    case 0x1b:
      return 'ROM + MBC5 + RAM + BATTERY';
    case 0x1c:
      return 'ROM + MBC5 + RUMBLE';
    case 0x1d:
      return 'ROM + MBC5 + RUMBLE + SRAM';
    case 0x1e:
      return 'ROM + MBC5 + RUMBLE + SRAM + BATTERY';
    case 0x1f:
      return 'POCKET CAMERA';
    case 0xfd:
      return 'BANDAI TAMA5';
    case 0xfe:
      return 'HUDSON HUC3';
    case 0xff:
      return 'HUDSON HUC1';
    default:
      return 'UNKNOWN?';
  }
};

const getTestRoms = () => {
  return Object.keys(testRoms);
};

const cartridge = {
  loadROM,
  read,
  write,
  reset,

  getTitle,
  getType,
  getRegion,
  getCGB,
  getSGB,
  getROMSizeAndBanks,
  getRAMSizeAndBanks,

  getTestRoms,
};

export default cartridge;
