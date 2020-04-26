// --------------------------------------------------------------------------------
// 16 bits operations -------------------------------------------------------------
// --------------------------------------------------------------------------------

// INC RR
// - - - -
const INC16_RR = (cpu, reg16) => {
  const value = cpu.readReg16(reg16);
  const newValue = (value + 1) & 0xffff;
  cpu.writeReg16(reg16, newValue);

  cpu.incPC(1);
  cpu.incCycles(8);
};

// INC SP
// - - - -
const INC16_SP = (cpu) => {
  const value = cpu.sp;
  const newValue = (value + 1) & 0xffff;
  cpu.setSP(newValue);

  cpu.incPC(1);
  cpu.incCycles(8);
};

// DEC RR
// - - - -
const DEC16_RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// DEC SP
// - - - -
const DEC16_SP = (cpu) => {
  const value = cpu.sp;
  const newValue = (value - 1) & 0xffff;
  cpu.setSP(newValue);

  cpu.incPC(1);
  cpu.incCycles(8);
};

// ADD RR,RR
// - 0 H C
const ADD16_RR_RR = (cpu, reg1, reg2) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// ADD RR,SP
// - 0 H C
const ADD16_RR_SP = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// ADD SP,r8
// 0 0 H C
const ADD16_SP_r8 = (cpu) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// --------------------------------------------------------------------------------
// 8 bits operations --------------------------------------------------------------
// --------------------------------------------------------------------------------

// INC R
// Z 0 H -
const INC8_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const newValue = (value + 1) & 0xff;
  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = (((value & 0xf) + 1) & 0xf) === 0x10 ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);
  cpu.incPC(1);
  cpu.incCycles(4);
};

// INC (RR)
// Z 0 H -
const INC8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(12);
  // TODO: IMPLEMENT
  return -1;
};

// DEC R
// Z 1 H -
const DEC8_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const newValue = (value - 1) & 0xff;
  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = (value & 0xf) < 1 ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);
  cpu.incPC(1);
  cpu.incCycles(4);
};

// DEC (RR)
// Z 1 H -
const DEC8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(12);
  // TODO: IMPLEMENT
  return -1;
};

// ADD R,R
// Z O H C
const ADD8_R_R = (cpu, reg1, reg2) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// ADD R,(RR)
// Z O H C
const ADD8_R_$RR = (cpu, reg8, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// ADD R,d8
// Z O H C
const ADD8_R_d8 = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// ADC R,R
// Z O H C
const ADC8_R_R = (cpu, reg1, reg2) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// ADC R,(RR)
// Z O H C
const ADC8_R_$RR = (cpu, reg8, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// ADC R,d8
// Z O H C
const ADC8_R_d8 = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SUB R
// Z 1 H C
const SUB8_R = (cpu, reg8) => {
  const regAValue = cpu.readReg8('A');
  const reg8Value = cpu.readReg8(reg8);
  const newValue = (regAValue - reg8Value) & 0xff;
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0;
  const N = 1;
  const H = 0; // TODO fix this
  const C = cpu.getFlag('C');

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);

  // TODO: CHECK
};

// SUB (RR)
// Z 1 H C
const SUB8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SUB d8
// Z 1 H C
const SUB8_d8 = (cpu) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SBC R,R
// Z 1 H C
const SBC8_R_R = (cpu, reg1, reg2) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// SBC R,(RR)
// Z 1 H C
const SBC8_R_$RR = (cpu, reg8, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SBC R,d8
// Z 1 H C
const SBC8_R_d8 = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// AND R
// Z 0 1 0
const AND8_R = (cpu, reg8) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// AND (RR)
// Z 0 1 0
const AND8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// AND d8
// Z 0 1 0
const AND8_d8 = (cpu) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// XOR A,R
// Z 0 0 0
const XOR8_A_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8) ^ cpu.readReg8(reg8);
  cpu.writeReg8(value);

  cpu.setFlag('Z', value === 0);

  cpu.incPC(1);
  cpu.incCycles(4);
};

// XOR (RR)
// Z 0 0 0
const XOR8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// XOR d8
// Z 0 0 0
const XOR8_d8 = (cpu) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// OR R
// Z 0 0 0
const OR8_R = (cpu, reg8) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// OR (RR)
// Z 0 0 0
const OR8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// OR d8
// Z 0 0 0
const OR8_d8 = (cpu) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// CP R
// Z 0 0 0
const CP8_R = (cpu, reg8) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// CP (RR)
// Z 1 H C
const CP8_$RR = (cpu, reg16) => {
  cpu.incPC(1);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// CP d8
// Z 1 H C
const CP8_d8 = (cpu) => {
  const d8 = cpu.readImmediate8();
  const A = cpu.readReg8('A');

  const Z = A === d8 ? 1 : 0;
  const H = (A & 0x0f) < (d8 & 0x0f) ? 1 : 0;
  const C = A < d8 ? 1 : 0;
  cpu.setFlags(Z, 1, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);

  // TODO: check
};

// DAA
// Z - 0 C
const DAA8 = (cpu) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// CPL
// - 1 1 -
const CPL8 = (cpu) => {
  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO: IMPLEMENT
  return -1;
};

// SCF
// - 0 0 1
const SCF8 = (cpu) => {
  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = 0;
  const C = 1;
  cpu.setFlag(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO check
};

// CCF
// - 0 0 C
const CCF8 = (cpu) => {
  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = 0;
  const C = cpu.getFlag('Z') ^ 1;
  cpu.setFlag(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);
  // TODO check
};

const arithmeticLogicalOperations = {
  INC16_RR,
  INC16_SP,
  DEC16_RR,
  DEC16_SP,
  ADD16_RR_RR,
  ADD16_RR_SP,
  ADD16_SP_r8,

  INC8_R,
  INC8_$RR,
  DEC8_R,
  DEC8_$RR,
  ADD8_R_R,
  ADD8_R_$RR,
  ADD8_R_d8,
  ADC8_R_R,
  ADC8_R_$RR,
  ADC8_R_d8,
  SUB8_R,
  SUB8_$RR,
  SUB8_d8,
  SBC8_R_R,
  SBC8_R_$RR,
  SBC8_R_d8,
  AND8_R,
  AND8_$RR,
  AND8_d8,
  XOR8_A_R,
  XOR8_$RR,
  XOR8_d8,
  OR8_R,
  OR8_$RR,
  OR8_d8,
  CP8_R,
  CP8_$RR,
  CP8_d8,
  DAA8,
  SCF8,
  CPL8,
  CCF8,
};

export default arithmeticLogicalOperations;
