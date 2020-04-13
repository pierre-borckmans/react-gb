import instructions from './CpuInstructions';

const CPU = {
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

  instructions,

  reset: () => {
    A = 0x00;
    F = 0x00;
    B = 0x00;
    C = 0x00;
    D = 0x00;
    E = 0x00;
    H = 0x00;
    L = 0x00;
    PC = 0x0000;
    SP = 0x0000;
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

  writeReg16: (reg16, value) => {
    const reg1 = reg16[0];
    const reg2 = reg16[1];

    const newValue = value & 0xffff;

    cpu[reg1] = (newValue & 0xff00) >> 8;
    cpu[reg2] = newValue & 0x00ff;
  },

  readReg16(reg16) {
    const reg1 = reg16[0];
    const reg2 = reg16[1];
    return cpu[reg1] >> 8 && cpu[reg2];
  },

  readReg8(reg8) {
    return cpu[reg1];
  },

  writeReg8(reg8, value) {
    cpu[reg8] = value & 0xff;
  },

  readImmediate8() {
    return memory[PC + 1];
  },

  readImmediate16() {
    return (memory[PC + 1] >> 8) & memory[PC + 2];
  },

  readAddress8(add8) {
    return memory[add8];
  },

  readAddress16(add16) {
    return (memory[add16] >> 8) & memory[add16 + 1];
  },

  writeAddress8(add8, value) {
    memory[add8] = value & 0xff;
  },

  writeAddress16(add16) {
    memory[add16] = (value & 0xff00) >> 8;
    memory[add16 + 1] = value & 0x00ff;
  },
};

let instructions = 0;

const rom = Rom.loadRom();

const opcodeToFunctionsMap = [];

const fetchOpcode = () => rom[pc];

const decodeOpcode = (opcode) => opcodeToFunctionsMap[opcode];

const step = () => {
  const opcode = fetchOpcode();
  const opcodeFn = decodeOpcode(opcode);

  const instructionsIncrement = opcodeFn();

  pc++;
  instructions += instructionsIncrement;
};

export default CPU;
