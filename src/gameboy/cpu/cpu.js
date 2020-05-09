import opcodesMap from './opcodes/opcodesMap';
import mmu from '../mmu/mmu';
import timer from '../timer/timer';

import { format, readBit } from '../../utils/utils';
import { getOpcodeLabels } from './opcodes/opcodesMap';
import interrupts from '../interrupts/interrupts';
import jumpCallOperations from './operations/jumpCallOperations';

let registers = {};

let cycles = {};

let halt = false;
let haltBug = false;

let steps = [];

const skipBootRom = () => {
  registers = {
    A: 0x01,
    F: 0xb0,
    B: 0x00,
    C: 0x13,
    D: 0x00,
    E: 0xd8,
    H: 0x01,
    L: 0x4d,
    // TODO: set to 0x0000 again after cpu tests are ok
    PC: 0x0100,
    SP: 0xfffe,

    interruptMasterEnable: 1,
  };
};

const reset = () => {
  steps = [];
  registers = {
    A: 0x00,
    F: 0x00,
    B: 0x00,
    C: 0x00,
    D: 0x00,
    E: 0x00,
    H: 0x00,
    L: 0x00,
    PC: 0x0000,
    SP: 0x0000,

    interruptMasterEnable: 1,
  };

  cycles = { clock: 0, machine: 0 };

  //TODO remove
  skipBootRom();
};
reset();

const getFlag = (flag) => {
  switch (flag.toUpperCase()) {
    case 'C':
      return (registers.F & 0x10) === 0x10 ? 1 : 0;
    case 'H':
      return (registers.F & 0x20) === 0x20 ? 1 : 0;
    case 'N':
      return (registers.F & 0x40) === 0x40 ? 1 : 0;
    case 'Z':
      return (registers.F & 0x80) === 0x80 ? 1 : 0;
    default:
      throw new Error(`Invalid flag name ${flag}`);
  }
};

const setFlags = (Z, N, H, C) => {
  registers.F =
    ((Z ? 1 : Z === 0 ? 0 : (registers.F & 0x80) >> 7) << 7) |
    ((N ? 1 : N === 0 ? 0 : (registers.F & 0x40) >> 6) << 6) |
    ((H ? 1 : H === 0 ? 0 : (registers.F & 0x20) >> 5) << 5) |
    ((C ? 1 : C === 0 ? 0 : (registers.F & 0x10) >> 4) << 4);
};

const setFlag = (flag, value) => {
  const bit = value ? 1 : 0;
  switch (flag) {
    case 'Z':
      registers.F = registers.F | (bit << 7);
      break;
    case 'N':
      registers.F = registers.F | (bit << 6);
      break;
    case 'H':
      registers.F = registers.F | (bit << 5);
      break;
    case 'C':
      registers.F = registers.F | (bit << 4);
      break;
    default:
      throw new Error(`Invalid flag ${flag}`);
  }
};

const readReg8 = (reg8) => {
  if (reg8.length !== 1) {
    throw new Error(`Invalid 8bit Register ${reg8}`);
  }
  return registers[reg8];
};

const writeReg8 = (reg8, value) => {
  if (reg8.length !== 1) {
    throw new Error(`Invalid 8bit Register ${reg8}`);
  }
  registers[reg8] = value & 0xff;
};

const readReg16 = (reg16) => {
  if (reg16.length !== 2) {
    throw new Error(`Invalid 16bit Register ${reg16}`);
  }
  const reg1 = reg16[0];
  const reg2 = reg16[1];
  return (registers[reg1] << 8) | registers[reg2];
};

const writeReg16 = (reg16, value) => {
  if (reg16.length !== 2) {
    throw new Error(`Invalid 16bit Register ${reg16}`);
  }
  const reg1 = reg16[0];
  const reg2 = reg16[1];

  const newValue = value & 0xffff;

  registers[reg1] = (newValue & 0xff00) >> 8;
  registers[reg2] = newValue & 0x00ff;
};

const getPC = () => registers.PC;
const setPC = (PC) => (registers.PC = PC);
const incPC = (inc) => (registers.PC = Math.min(0xffff, registers.PC + inc));
const decPC = (dec) => (registers.PC = Math.max(0x0000, registers.PC - dec));

const getSP = () => registers.SP;
const setSP = (SP) => (registers.SP = SP);
const incSP = (inc) => (registers.SP += inc);
const decSP = (dec) => (registers.SP -= dec);

const getClockCycles = () => cycles.clock;
const getMachineCycles = () => cycles.machine;
const incClockCycles = (inc) => {
  cycles.clock += inc;
  cycles.machine = Math.floor(cycles.clock / 4);
};
const incMachineCycles = (inc) => {
  cycles.machine += inc;
  cycles.clocl += inc * 4;
};

const setInterruptMasterEnable = (active) =>
  (registers.interruptMasterEnable = active);
const getInterruptMasterEnable = () => registers.interruptMasterEnable;

const setHalt = (active) => (halt = active);
const getHalt = () => halt;

const setHaltBug = (active) => (haltBug = active);
const getHaltBug = () => haltBug;

/// --------

const readImmediate8 = () => {
  return mmu.read(registers.PC + 1);
};

const readSignedImmediate8 = () => {
  const unsigned = mmu.read(registers.PC + 1);
  return unsigned > 127 ? -128 + (unsigned ^ (1 << 7)) : unsigned;
};

const readImmediate16 = () => {
  return (mmu.read(registers.PC + 2) << 8) | mmu.read(registers.PC + 1);
};

const readAddress8 = (add8) => {
  return mmu.read(add8);
};

const readAddress16 = (add16) => {
  return (mmu.read(add16 + 1) << 8) | mmu.read(add16);
};

const writeAddress8 = (add8, value) => {
  mmu.write(add8, value & 0xff);
};

const writeAddress16 = (add16, value) => {
  mmu.write(add16 + 1, (value & 0xff00) >> 8);
  mmu.write(add16, value & 0x00ff);
};

const stackPush = (value) => {
  decSP(2);
  writeAddress16(getSP(), value);
};

const stackPop = () => {
  const value = readAddress16(getSP());
  incSP(2);
  return value;
};

const step = () => {
  const fetchOpcode = () => readAddress8(registers.PC);
  const decodeOpcode = (opcode) => opcodesMap[opcode];

  const opcode = fetchOpcode();
  const executeOpcodeFn = decodeOpcode(opcode);

  const previousMachineCycles = getMachineCycles();
  const result = executeOpcodeFn(cpu);

  const elapsedMachineCycles = getMachineCycles() - previousMachineCycles;

  // steps.push(
  //   '[' +
  //     format('hex', cpu.getPC(), 16) +
  //     '] : ' +
  //     getOpcodeLabels('hex', cpu).join('  -  ')
  // );

  timer.step(elapsedMachineCycles);

  // TODO: remove when all opcodes implemented
  if (result === -1) {
    alert(`Opcode ${format('hex', opcode)} not implemented`);
  }

  if (
    getInterruptMasterEnable() &&
    interrupts.getInterruptEnable() &&
    interrupts.getInterruptFlags()
  ) {
    serviceInterrupts();
  }
  return result;
};

const serviceInterrupts = () => {
  const interruptEnable = interrupts.getInterruptEnable();
  const interruptFlags = interrupts.getInterruptFlags();
  if (readBit(interruptEnable, 0) && readBit(interruptFlags, 0)) {
    // Vertical Blank
    interrupts.disableVBlankInterrupt();
    jumpCallOperations.RST_XXH(cpu, 0x40);
  } else if (readBit(interruptEnable, 1) && readBit(interruptFlags, 1)) {
    // LCDC Status
    interrupts.disableLCDStatInterrupt();
    jumpCallOperations.RST_XXH(cpu, 0x48);
  } else if (readBit(interruptEnable, 2) && readBit(interruptFlags, 2)) {
    // Timer Overflow
    interrupts.disableTimerInterrupt();
    jumpCallOperations.RST_XXH(cpu, 0x50);
  } else if (readBit(interruptEnable, 3) && readBit(interruptFlags, 3)) {
    // Serial Transfer Completion
    interrupts.disableSerialInterrupt();
    jumpCallOperations.RST_XXH(cpu, 0x58);
  } else if (readBit(interruptEnable, 4) && readBit(interruptFlags, 4)) {
    // High-to-Low of P10-P13 (Joypad)
    interrupts.disableJoypadInterrupt();
    jumpCallOperations.RST_XXH(cpu, 0x60);
  }
};

const debugAllOpcodes = () => {
  for (let opcode = 0; opcode < 0xff; opcode++) {
    const decodeOpcode = (opcode) => opcodesMap[opcode];
    const executeOpcodeFn = decodeOpcode(opcode);

    console.log(`Opcode ${opcode}`);
    executeOpcodeFn(this);
  }
};

const cpu = {
  getClockCycles,
  getFlag,
  getHalt,
  getHaltBug,
  getInterruptMasterEnable,
  getMachineCycles,
  getPC,
  getSP,
  setFlag,
  setFlags,
  setHalt,
  setHaltBug,
  setInterruptMasterEnable,
  setPC,
  setSP,
  readAddress16,
  readAddress8,
  readImmediate16,
  readImmediate8,
  readReg8,
  readReg16,
  readSignedImmediate8,
  writeAddress16,
  writeAddress8,
  writeReg16,
  writeReg8,
  step,
  incClockCycles,
  incMachineCycles,
  incPC,
  incSP,
  decPC,
  decSP,
  stackPop,
  stackPush,
  debugAllOpcodes,
  reset,

  getSteps: () => steps,
};

export default cpu;
