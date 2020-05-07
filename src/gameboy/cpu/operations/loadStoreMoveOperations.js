// --------------------------------------------------------------------------------
// 16 bits operations -------------------------------------------------------------
// --------------------------------------------------------------------------------

// LD RR,d16
// - - - -
const LD16_RR_d16 = (cpu, reg16) => {
  const d16 = cpu.readImmediate16();
  cpu.writeReg16(reg16, d16);

  cpu.incPC(3);
  cpu.incClockCycles(12);
};

// LD SP,d16
// - - - -
const LD16_SP_d16 = (cpu) => {
  const d16 = cpu.readImmediate16();
  cpu.setSP(d16);

  cpu.incPC(3);
  cpu.incClockCycles(12);
};

// LD SP,RR
// - - - -
const LD16_SP_RR = (cpu, reg16) => {
  const rr = cpu.readReg16(reg16);
  cpu.setSP(rr);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD RR,SP+r8
// 0 0 H C
const LD16_RR_SPpr8 = (cpu, reg16) => {
  const SP = cpu.getSP();
  const r8 = cpu.readSignedImmediate8();
  const value = SP + r8;

  cpu.writeReg16(reg16, value);

  const Z = 0;
  const N = 0;
  const H = ((SP ^ r8 ^ value) & 0x10) === 0x10 ? 1 : 0;
  const C = ((SP ^ r8 ^ value) & 0x100) === 0x100 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(12);
};

// LD (a16), SP
// - - - -
const LD16_$a16_SP = (cpu) => {
  const a16 = cpu.readImmediate16();
  const SP = cpu.getSP();
  cpu.writeAddress16(a16, SP);

  cpu.incPC(3);
  cpu.incClockCycles(20);
};

// PUSH RR
// - - - -
const PUSH16_RR = (cpu, reg16) => {
  const reg16Value = cpu.readReg16(reg16);
  cpu.stackPush(reg16Value);

  cpu.incPC(1);
  cpu.incClockCycles(16);
};

// POP RR
// - - - -
const POP16_RR = (cpu, reg16) => {
  const stackValue = cpu.stackPop();
  cpu.writeReg16(reg16, stackValue);

  cpu.incPC(1);
  cpu.incClockCycles(12);
};

// --------------------------------------------------------------------------------
// 8 bits operations --------------------------------------------------------------
// --------------------------------------------------------------------------------

// LD R,d8
// - - - -
const LD8_R_d8 = (cpu, reg8) => {
  const d8 = cpu.readImmediate8();
  cpu.writeReg8(reg8, d8);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// LD R,R
// - - - -
const LD8_R_R = (cpu, reg1, reg2) => {
  cpu.writeReg8(reg1, cpu.readReg8(reg2));

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// LD R,(RR)
// - - - -
const LD8_R_$RR = (cpu, reg8, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD (RR),r
// - - - -
const LD8_$RR_R = (cpu, reg16, reg8) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readReg8(reg8);
  cpu.writeAddress8(address, value);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD (RR),d8
// - - - -
const LD8_$RR_d8 = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const d8 = cpu.readImmediate8();
  cpu.writeAddress8(address, d8);

  cpu.incPC(2);
  cpu.incClockCycles(12);
};

// LD R,(a16)
// - - - -
const LD8_R_$a16 = (cpu, reg8) => {
  const address = cpu.readImmediate16();
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);

  cpu.incPC(3);
  cpu.incClockCycles(16);
};

// LD (RR+),R
// - - - -
const LD8_$RRp_R = (cpu, reg16, reg8) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readReg8(reg8);
  cpu.writeAddress8(address, value);
  cpu.writeReg16(reg16, cpu.readReg16(reg16) + 1);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD (RR-),R
// - - - -
const LD8_$RRm_R = (cpu, reg16, reg8) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readReg8(reg8);
  cpu.writeAddress8(address, value);
  cpu.writeReg16(reg16, cpu.readReg16(reg16) - 1);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD R,(RR+)
// - - - -
const LD8_R_$RRp = (cpu, reg8, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);
  cpu.writeReg16(reg16, cpu.readReg16(reg16) + 1);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD R,(RR-)
// - - - -
const LD8_R_$RRm = (cpu, reg8, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);
  cpu.writeReg16(reg16, cpu.readReg16(reg16) - 1);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LDH (a8),R
// - - - -
const LD8H_$a8_R = (cpu, reg8) => {
  const address = 0xff00 + cpu.readImmediate8();
  const value = cpu.readReg8(reg8);
  cpu.writeAddress8(address, value);

  cpu.incPC(2);
  cpu.incClockCycles(12);
};

// LDH R,(a8)
// - - - -
const LD8H_R_$a8 = (cpu, reg8) => {
  const address = 0xff00 + cpu.readImmediate8();
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);

  cpu.incPC(2);
  cpu.incClockCycles(12);
};

// LD (R),R
// - - - -
const LD8_$R_R = (cpu, reg1, reg2) => {
  const address = 0xff00 + cpu.readReg8(reg1);
  const value = cpu.readReg8(reg2);
  cpu.writeAddress8(address, value);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD R,(R)
// - - - -
const LD8_R_$R = (cpu, reg1, reg2) => {
  const address = 0xff00 + cpu.readReg8(reg2);
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg1, value);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// LD (a16),R
// - - - -
const LD8_$a16_R = (cpu, reg8) => {
  const address = cpu.readImmediate16();
  const value = cpu.readReg8(reg8);

  cpu.writeAddress8(address, value);

  cpu.incPC(3);
  cpu.incClockCycles(16);
};

const loadStoreMoveOperations = {
  LD16_RR_d16,
  LD16_$a16_SP,
  LD16_SP_d16,
  LD16_SP_RR,
  LD16_RR_SPpr8,

  POP16_RR,
  PUSH16_RR,

  LD8_$RR_R,
  LD8_R_$RR,
  LD8_R_R,
  LD8_R_d8,
  LD8_$RRp_R,
  LD8_$RRm_R,
  LD8_R_$RRp,
  LD8_R_$RRm,
  LD8_$RR_d8,
  LD8H_$a8_R,
  LD8H_R_$a8,
  LD8_$R_R,
  LD8_R_$R,
  LD8_$a16_R,
  LD8_R_$a16,
};

export default loadStoreMoveOperations;
