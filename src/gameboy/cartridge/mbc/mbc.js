import cartridge from "../cartridge";
import externalRam from "../../mmu/externalRam/externalRam";

import { format } from "../../../utils/utils";

const EXTERNAL_RAM_TOGGLE_START_ADDR = 0x0000;
const EXTERNAL_RAM_TOGGLE_END_ADDR = 0x1fff;

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

const SIMPLE_ROM_BANKING_MODE = 0;
const RAM_AND_ADVANCED_ROM_BANKING_MODE = 1;

let registers = {};

const getRomBank = () => {
  let romBank = (registers.bankHighBits << 5) | registers.bankLowBits;
  if ((romBank & 0x1f) === 0) {
    romBank++;
  }
  return romBank & (cartridge.getROMSizeAndBanks()[1] - 1);
};

const getRom0Bank = () => {
  return registers.bankingMode === RAM_AND_ADVANCED_ROM_BANKING_MODE
    ? (registers.bankHighBits * 0x20) & (cartridge.getROMSizeAndBanks()[1] - 1)
    : 0;
};

const getRamBank = () => {
  return registers.bankingMode === RAM_AND_ADVANCED_ROM_BANKING_MODE
    ? registers.bankHighBits
    : 0;
};

const getRom0Offset = () => {
  return getRom0Bank() * ROM_BANK_SIZE;
};

const getRomOffset = () => {
  return getRomBank() * ROM_BANK_SIZE;
};

const getRamOffset = () => {
  return getRamBank() * RAM_BANK_SIZE;
};

const read = (address) => {
  if (address >= ROM0_START_ADDR && address <= ROM0_END_ADDR) {
    return cartridge.read(address + getRom0Offset());
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
        "hex",
        address,
        16
      )}`
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
    if ([0x1, 0x2, 0x3].includes(cartridge.getTypeNumber())) {
      registers.bankLowBits = value & 0x1f; // keep 5 lower bits only
    }
  } else if (
    address >= RAM_BANK_NUMBER_START_ADDR &&
    address <= RAM_BANK_NUMBER_END_ADDR
  ) {
    if ([0x1, 0x2, 0x3].includes(cartridge.getTypeNumber())) {
      registers.bankHighBits = value & 0x03; // keep bits 0 and 1 only and shift them as bits 6 and 7
    }
  } else if (
    address >= BANKING_MODE_START_ADDR &&
    address <= BANKING_MODE_END_ADDR
  ) {
    registers.bankingMode =
      value & 0x1 ? RAM_AND_ADVANCED_ROM_BANKING_MODE : SIMPLE_ROM_BANKING_MODE;
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
        "hex",
        address,
        16
      )}`
    );
  }
};

const reset = () => {
  registers = {
    type: 0,
    bankLowBits: 1,
    bankHighBits: 0,
    externalRamEnabled: false,
    bankingMode: SIMPLE_ROM_BANKING_MODE,
  };
};

reset();

const setRomBank = (bank) => {
  registers.bankLowBits = bank & 0x1f;
  registers.bankHighBits = (bank & 0x60) >> 5;
};

const getBankingMode = () => registers.bankingMode;
const isExternalRamEnabled = () => registers.externalRamEnabled;

const mbc = {
  read,
  write,
  reset,

  getRomBank,
  getRamBank,
  getBankingMode,
  isExternalRamEnabled,

  setRomBank,
};

export default mbc;
