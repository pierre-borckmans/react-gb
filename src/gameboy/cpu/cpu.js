import opcodesMap from './opcodes/opcodesMap';
import mmu from '../mmu/mmu';

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
  clock: {
    c: 0,
  },

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
        return (registers.F & 0x10) === 0x10;
      case 'H':
        return (registers.F & 0x20) === 0x20;
      case 'N':
        return (registers.F & 0x40) === 0x40;
      case 'Z':
        return (registers.F & 0x80) === 0x80;
      default:
        throw new Error(`Invalid flag name ${flag}`);
    }
  },

  setFlags: (Z, N, H, C) => {
    registers.F =
      ((Z ? 1 : Z === 0 ? 0 : (registers.F & 0x80) >> 7) << 7) |
      ((N ? 1 : N === 0 ? 0 : (registers.F & 0x40) >> 6) << 6) |
      ((H ? 1 : H === 0 ? 0 : (registers.F & 0x20) >> 5) << 5) |
      ((C ? 1 : C === 0 ? 0 : (registers.F & 0x10) >> 4) << 4);
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

  getPC: () => registers.PC,
  setPC: (PC) => (registers.PC = PC),
  incPC: (inc) => (registers.PC = Math.min(0xffff, registers.PC + inc)),
  decPC: (dec) => (registers.PC = Math.max(0x0000, registers.PC - dec)),

  getSP: () => registers.SP,
  setSP: (SP) => (registers.SP = SP),
  incSP: (inc) => (registers.SP += inc),
  decSP: (dec) => (registers.SP -= dec),

  readImmediate8() {
    return mmu.read(registers.PC + 1);
  },

  readSignedImmediate8() {
    // TODO: IMPLEMENT
    return mmu.read(registers.PC + 1);
  },

  readImmediate16() {
    return (mmu.read(registers.PC + 1) >> 8) & mmu.read(registers.PC + 2);
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

  writeAddress16(add16, value) {
    mmu.write(add16, (value & 0xff00) >> 8);
    mmu.write(add16 + 1, value & 0x00ff);
  },

  step() {
    const fetchOpcode = () => this.readAddress8(registers.PC);
    const decodeOpcode = (opcode) => opcodesMap[opcode];

    const opcode = fetchOpcode();
    const executeOpcodeFn = decodeOpcode(opcode);

    executeOpcodeFn(this);
    return this;
  },

  debugAllOpcodes() {
    for (let opcode = 0; opcode < 0xff; opcode++) {
      const decodeOpcode = (opcode) => opcodesMap[opcode];
      const executeOpcodeFn = decodeOpcode(opcode);

      console.log(`Opcode ${opcode}`);
      executeOpcodeFn(this);
    }
  },
};

export default cpu;
