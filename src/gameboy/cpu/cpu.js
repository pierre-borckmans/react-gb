import instructions from './operations/cpuInstructions';
import memory from '../mmu/mmu';

const registers = {
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
};

const cpu = {
  instructions,

  reset: () => {
    registers.A = 0x00;
    registers.F = 0x00;
    registers.B = 0x00;
    registers.C = 0x00;
    registers.D = 0x00;
    registers.E = 0x00;
    registers.H = 0x00;
    registers.L = 0x00;
    registers.PC = 0x0000;
    registers.SP = 0x0000;
  },

  getFlag: (flag) => {
    switch (flag.toUpperCase()) {
      case 'C':
        return (F & 0x10) === 0x10;
      case 'H':
        return (F & 0x20) === 0x20;
      case 'N':
        return (F & 0x40) === 0x40;
      case 'Z':
        return (F & 0x80) === 0x80;
    }
  },

  setFlags: (Z, N, H, C) => {
    F =
      ((Z ? 1 : Z === 0 ? 0 : (F & 0x80) >> 7) << 7) |
      ((N ? 1 : N === 0 ? 0 : (F & 0x40) >> 6) << 6) |
      ((H ? 1 : H === 0 ? 0 : (F & 0x20) >> 5) << 5) |
      ((C ? 1 : C === 0 ? 0 : (F & 0x10) >> 4) << 4);
  },

  readReg8(reg8) {
    return registers[reg8];
  },

  writeReg8(reg8, value) {
    cpu[reg8] = value & 0xff;
  },

  readReg16(reg16) {
    const reg1 = reg16[0];
    const reg2 = reg16[1];
    return registers[reg1] >> 8 && registers[reg2];
  },

  writeReg16: (reg16, value) => {
    const reg1 = reg16[0];
    const reg2 = reg16[1];

    const newValue = value & 0xffff;

    registers[reg1] = (newValue & 0xff00) >> 8;
    registers[reg2] = newValue & 0x00ff;
  },

  readImmediate8() {
    return mmu.read(PC + 1);
  },

  readImmediate16() {
    return (mmu.read(PC + 1) >> 8) & mmu.read(PC + 2);
  },

  readAddress8(add8) {
    return mmu.read(add8);
  },

  readAddress16(add16) {
    return (mmu.read(add16) >> 8) & mmu.read(add16 + 1);
  },

  writeAddress8(add8, value) {
    mmu.write(add8, value & 0xff);
  },

  writeAddress16(add16) {
    mmu.write(add16, (value & 0xff00) >> 8);
    mmu.write(add16 + 1, value & 0x00ff);
  },

  step() {
    const fetchOpcode = () => {};
    const decodeOpcode = (opcode) => opcodeToFunctionsMap[opcode];

    const opcode = fetchOpcode();
    const opcodeFn = decodeOpcode(opcode);

    const instructionsIncrement = opcodeFn();

    pc++;
    instructions += instructionsIncrement;
  },
};

const rom = Rom.loadRom();

export default CPU;
