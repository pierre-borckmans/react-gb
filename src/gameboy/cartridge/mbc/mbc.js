import cartridge from '../cartridge';
import mmu from '../../mmu/mmu';
import externalRam from '../../mmu/externalRam/externalRam';

import { format } from '../../../utils/utils';

// TOGGLE EXTERNAL RAM - write 0x0A to enable, any other value to disable
const START_EXTERNAL_RAM_TOGGLE_ADDR = 0x0000;
const END_EXTERNAL_RAM_TOGGLE_ADDR = 0x1fff;
// ROM BANK = 0x0yyxxxxx
//                 ----- -> [1-31] bank within selected bank (0 is remapped to 1)
//               --      -> [0-3]  if MODE is ROM_MODE ==> change ROM bank set to: [1-31],[33-63],[65-95],[97-127]
//                                 if MODE is RAM_MODE ==> switch RAM bank to: [0-3]
const START_ROM_BANK_LOW_ADDR = 0x2000;
const END_ROM_BANK_LOW_ADDR = 0x3fff;
const START_ROM_BANK_HIGH_ADDR = 0x4000;
const END_ROM_BANK_HIGH_ADDR = 0x5fff;
const START_MODE_ADDR = 0x6000;
const END_MODE_ADDR = 0x7fff;

const ROM_BANK_SIZE = 0x4000;
const RAM_BANK_SIZE = 0x2000;

const ROM_MODE = 0;
const RAM_MODE = 1;

let registers = {};

const getRomOffset = () => {
  return registers.romBank * ROM_BANK_SIZE;
};

const getRamOffset = () => {
  return registers.ramBank * RAM_BANK_SIZE;
};

const read = (address) => {
  if (address >= mmu.START_ROM0 && address <= mmu.END_ROM0) {
    return cartridge.read(address);
  } else if (address >= mmu.START_ROM1 && address <= mmu.END_ROM1) {
    return cartridge.read(getRomOffset() + (address - ROM_BANK_SIZE));
  } else if (
    address >= mmu.START_EXTERNAL_RAM &&
    address <= mmu.END_EXTERNAL_RAM
  ) {
    if (registers.externalRamEnabled) {
      return externalRam.read(getRamOffset() + (address - RAM_BANK_SIZE));
    } else {
      return 0xff;
    }
  } else {
    throw new Error(
      `Trying to read from invalid ROM or RAM address ${format(
        'hex',
        address,
        16
      )}`
    );
  }
};

const write = (address, value) => {
  if (
    address >= START_EXTERNAL_RAM_TOGGLE_ADDR &&
    address <= END_EXTERNAL_RAM_TOGGLE_ADDR
  ) {
    registers.externalRamEnabled = (value & 0x0f) === 0x0a; // take the 4 lower bits and check if they equal 0x0a
  } else if (
    address >= START_ROM_BANK_LOW_ADDR &&
    address <= END_ROM_BANK_LOW_ADDR
  ) {
    if ([0x1, 0x2, 0x3].includes(registers.type)) {
      const romBankLowBits = value & 0x1f || 1; // keep 5 lower bits only, and set to 1 if is zero
      const romBankHighBits = registers.romBank & 0x60; // keep bits 6 and 7
      registers.romBank = romBankHighBits | romBankLowBits;
    }
  } else if (
    address >= START_ROM_BANK_HIGH_ADDR &&
    address <= END_ROM_BANK_HIGH_ADDR
  ) {
    if ([0x1, 0x2, 0x3].includes(registers.type)) {
      if (registers.mode === ROM_MODE) {
        const romBankHighBits = (value & 0x03) << 5; // keep bits 1 and 2 only and shift them as bits 6 and 7
        const romBankLowBits = registers.romBank & 0x1f; // keep 5 lower bits
        registers.romBank = romBankHighBits | romBankLowBits;
      }
      if (registers.MODE === RAM_MODE) {
        registers.rambank = value & 0x3; // keep 2 lower bits
      }
    }
  } else if (address >= START_MODE_ADDR && address <= END_MODE_ADDR) {
    registers.mode = value & 0x1 ? ROM_MODE : RAM_MODE;
  } else if (
    address >= mmu.START_EXTERNAL_RAM &&
    address <= mmu.END_EXTERNAL_RAM
  ) {
    if (registers.externalRamEnabled) {
      externalRam.write(getRamOffset() + (address - RAM_BANK_SIZE), value);
    }
  } else {
    throw new Error(
      `Trying to write to invalid ROM or RAM address ${format(
        'hex',
        address,
        16
      )}`
    );
  }
};

const reset = () => {
  registers = {
    type: 0,
    romBank: 1,
    ramBank: 0,
    externalRamEnabled: false,
    mode: ROM_MODE,
  };
};

reset();

const setType = (type) => {
  registers.type = type;
};

const getRomBank = () => registers.romBank;
const getRamBank = () => registers.ramBank;
const getType = () => registers.type;
const getMode = () => registers.mode;
const isExternalRamEnabled = () => registers.externalRamEnabled;

const mbc = {
  ROM_MODE,
  RAM_MODE,

  read,
  write,
  reset,

  setType,
  getRomBank,
  getRamBank,
  getType,
  getMode,
  isExternalRamEnabled,
};

export default mbc;
