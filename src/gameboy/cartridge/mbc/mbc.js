import cartridge from '../cartridge';
import externalRam from '../../mmu/externalRam/externalRam';

import { format } from '../../../utils/utils';

// TOGGLE EXTERNAL RAM - write 0x0A to enable, any other value to disable
// Before external RAM can be read or written, it must be enabled by writing to this address space.
// It is recommended to disable external RAM after accessing it, in order to protect its contents
// from damage during power down of the Game Boy.
// Practically any value with 0Ah in the lower 4 bits enables RAM, and any other value disables RAM.
// RAM is automatically disabled when the gameboy is powered off.
const EXTERNAL_RAM_TOGGLE_START_ADDR = 0x0000;
const EXTERNAL_RAM_TOGGLE_END_ADDR = 0x1fff;

// ROM BANK = 0x0yyxxxxx
//                 ----- -> [1-31] bank within selected bank (0 is remapped to 1)
//               --      -> [0-3]  if MODE is ROM_MODE ==> change ROM bank set to: [1-31],[33-63],[65-95],[97-127]
//                                 if MODE is RAM_MODE ==> switch RAM bank to: [0-3]
const ROM_BANK_NUMBER_START_ADDR = 0x2000;
const ROM_BANK_NUMBER_END_ADDR = 0x3fff;

const RAM_BANK_NUMBER_START_ADDR = 0x4000;
const RAM_BANK_NUMBER_END_ADDR = 0x5fff;

const BANKING_MODE_START_ADDR = 0x6000;
const BANKING_MODE_END_ADDR = 0x7fff;

const ROM0_START_ADDR = 0x0000;
const ROM0_END_ADDR = 0x3fff;
const ROM1_START_ADDR = 0x4000;
const ROM1_END_ADDR = 0x7fff;
const EXTERNAL_RAM_START_ADDR = 0xa000;
const EXTERNAL_RAM_END_ADDR = 0xbfff;

let ROM_BANK_SIZE = 0x4000;
let RAM_BANK_SIZE = 0x2000;

const ROM_MODE = 0;
const RAM_MODE = 1;

let registers = {};

const getRomOffset = () => {
  return registers.romBank * ROM_BANK_SIZE;
};

const getRamOffset = () => {
  return registers.ramBank * RAM_BANK_SIZE;
};

const read = address => {
  if (address >= ROM0_START_ADDR && address <= ROM0_END_ADDR) {
    return cartridge.read(address + registers.rom0Bank * RAM_BANK_SIZE);
  } else if (address >= ROM1_START_ADDR && address <= ROM1_END_ADDR) {
    return cartridge.read(getRomOffset() + (address - ROM_BANK_SIZE));
  } else if (
    address >= EXTERNAL_RAM_START_ADDR &&
    address <= EXTERNAL_RAM_END_ADDR
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
        16,
      )}`,
    );
  }
};

const write = (address, value) => {
  if (
    address >= EXTERNAL_RAM_TOGGLE_START_ADDR &&
    address <= EXTERNAL_RAM_TOGGLE_END_ADDR
  ) {
    registers.externalRamEnabled = (value & 0x0f) === 0x0a; // take the 4 lower bits and check if they equal 0x0a
  } else if (
    address >= ROM_BANK_NUMBER_START_ADDR &&
    address <= ROM_BANK_NUMBER_END_ADDR
  ) {
    if ([0x1, 0x2, 0x3].includes(registers.type)) {
      const romBankLowBits = value & 0x1f || 1; // keep 5 lower bits only, and set to 1 if is zero
      const romBankHighBits = registers.romBank & 0x60; // keep bits 6 and 7
      registers.romBank =
        (romBankHighBits | romBankLowBits) &
        (cartridge.getROMSizeAndBanks()[1] - 1);
      console.log('rom bank', registers.romBank);
    }
    if (registers.type === 0x5) {
      const romBankLowBits = value; // low 8 bits
      const romBankHighBits = registers.romBank & 0x01; // keep bit 9
      registers.romBank = romBankHighBits | romBankLowBits;
    }
  } else if (
    address >= RAM_BANK_NUMBER_START_ADDR &&
    address <= RAM_BANK_NUMBER_END_ADDR
  ) {
    if ([0x1, 0x2, 0x3].includes(registers.type)) {
      if (registers.mode === ROM_MODE) {
        const romBankHighBits = (value & 0x03) << 5; // keep bits 1 and 2 only and shift them as bits 6 and 7
        const romBankLowBits = registers.romBank & 0x1f; // keep 5 lower bits
        registers.romBank =
          (romBankHighBits | romBankLowBits) &
          (cartridge.getROMSizeAndBanks()[1] - 1);
        // console.log(
        //   'high',
        //   value.toString(2),
        //   romBankLowBits.toString(2),
        //   romBankHighBits.toString(2),
        //   registers.romBank,
        // );
        console.log('rom bank', registers.romBank);
      } else if (registers.mode === RAM_MODE) {
        registers.ramBank = value & 0x3; // keep 2 lower bits
        registers.rom0Bank = value << 5;
        console.log('ram bank', value, registers.ramBank);
      }
    }
    if (registers.type === 0x5) {
      if (registers.mode === ROM_MODE) {
        const romBankHighBits = (value & 0x01) << 8; // keep bits 1 and 2 only and shift them as bits 6 and 7
        const romBankLowBits = registers.romBank; // keep 5 lower bits
        registers.romBank = romBankHighBits | romBankLowBits;
      }
      if (registers.MODE === RAM_MODE) {
        registers.ramBank = value & 0x3; // keep 2 lower bits
      }
    }
  } else if (
    address >= BANKING_MODE_START_ADDR &&
    address <= BANKING_MODE_END_ADDR
  ) {
    // console.log('mode:', value);
    registers.mode = value & 0x1 ? RAM_MODE : ROM_MODE;
    if (registers.mode === ROM_MODE) {
      registers.ramBank = 0;
    }
  } else if (
    address >= EXTERNAL_RAM_START_ADDR &&
    address <= EXTERNAL_RAM_END_ADDR
  ) {
    if (registers.externalRamEnabled) {
      externalRam.write(getRamOffset() + (address - RAM_BANK_SIZE), value);
    }
  } else {
    throw new Error(
      `Trying to write to invalid ROM or RAM address ${format(
        'hex',
        address,
        16,
      )}`,
    );
  }
};

const reset = () => {
  registers = {
    type: 0,
    rom0Bank: 0,
    romBank: 1,
    ramBank: 0,
    externalRamEnabled: false,
    mode: ROM_MODE,
  };
};

reset();

const setType = type => {
  registers.type = type;
};

const setRomBank = bank => (registers.romBank = bank);

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

  setRomBank,
};

export default mbc;
