// --------------------------------------------------------------------------------
// Rotation operations ------------------------------------------------------------
// --------------------------------------------------------------------------------

// RLCA
// 0 0 0 C
const RLCA = (cpu) => {
  const value = cpu.readReg8('A');
  const msb = value & 0x80 ? 1 : 0;

  let newValue = value << 1;
  newValue |= msb;

  cpu.writeReg8('A', newValue);

  const Z = 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);
};

// RRCA
// 0 0 0 C
const RRCA = (cpu) => {
  const value = cpu.readReg8('A');
  const lsb = value & 0x01 ? 1 : 0;

  let newValue = value >> 1;
  newValue |= lsb << 7;

  cpu.writeReg8('A', newValue);

  const Z = 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);
};

// RLA
// 0 0 0 C
const RLA = (cpu) => {
  const value = cpu.readReg8('A');
  const msb = value & 0x80 ? 1 : 0;

  let newValue = value << 1;
  newValue |= cpu.getFlag('C');

  cpu.writeReg8('A', newValue);

  const Z = 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incCycles(4);
};

// RCA
// 0 0 0 C
const RRA = (cpu) => {
  const value = cpu.readReg8('A');
  const lsb = value & 0x01 ? 1 : 0;

  let newValue = value >> 1;
  newValue |= cpu.getFlag('C') << 7;

  cpu.writeReg8('A', newValue);

  const Z = 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);
  cpu.incPC(1);
  cpu.incCycles(4);
};

// RLC R
// Z 0 0 C
const RLC_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const msb = value & 0x80 ? 1 : 0;

  let newValue = (value << 1) & 0xff;
  newValue |= msb;

  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);
};

// RLC (RR)
// Z 0 0 C
const RLC_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);

  const msb = value & 0x80 ? 1 : 0;

  let newValue = (value << 1) & 0xff;
  newValue |= msb;

  cpu.writeAddress8(address, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(16);
};

// RRC R
// Z 0 0 C
const RRC_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const lsb = value & 0x01 ? 1 : 0;

  let newValue = (value >> 1) & 0xff;
  newValue |= lsb << 7;

  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);
};

// RRC (RR)
// Z 0 0 C
const RRC_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);

  const lsb = value & 0x01 ? 1 : 0;

  let newValue = (value >> 1) & 0xff;
  newValue |= lsb << 7;

  cpu.writeAddress8(address, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(16);
};

// RL R
// Z 0 0 C
const RL_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const msb = value & 0x80 ? 1 : 0;

  let newValue = (value << 1) & 0xff;

  newValue |= cpu.getFlag('C');

  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);
};

// RL (RR)
// Z 0 0 C
const RL_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);

  const msb = value & 0x80 ? 1 : 0;

  let newValue = (value << 1) & 0xff;
  newValue |= cpu.getFlag('C');

  cpu.writeAddress8(address, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = msb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(16);
};

// RR R
// Z 0 0 C
const RR_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const lsb = value & 0x01 ? 1 : 0;

  let newValue = (value >> 1) & 0xff;
  newValue |= cpu.getFlag('C') << 7;

  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);
};

// RR (RR)
// Z 0 0 C
const RR_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);

  const lsb = value & 0x01 ? 1 : 0;

  let newValue = (value >> 1) & 0xff;
  newValue |= cpu.getFlag('C') << 7;

  cpu.writeAddress8(address, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = lsb;

  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(16);
};

// --------------------------------------------------------------------------------
// Shift operations ------------------------------------------------------------
// --------------------------------------------------------------------------------

// SLA R
// Z 0 0 C
const SLA_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SLA (RR)
// Z 0 0 C
const SLA_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// SRA R
// Z 0 0 0
const SRA_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SRA (RR)
// Z 0 0 0
const SRA_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// SWAP R
// Z 0 0 0
const SWAP_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SWAP (RR)
// Z 0 0 0
const SWAP_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// SRL R
// Z 0 0 C
const SRL_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SRL (RR)
// Z 0 0 C
const SRL_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// BIT N,R
// Z 0 1 -
const BIT_N_R = (cpu, n, reg8) => {
  const value = cpu.readReg8(reg8);
  const bit = (value & (1 << n)) === 1 << n;

  const Z = !bit ? 1 : 0;
  const N = 0;
  const H = 1;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(8);
};

// BIT N,(RR)
// Z 0 1 -
const BIT_N_$RR = (cpu, n, reg16) => {
  const address = cpu.readReg8(reg16);
  const value = cpu.readAddress8(address);
  const bit = (value & (1 << n)) === 1 << n;

  const Z = !bit ? 1 : 0;
  const N = 0;
  const H = 1;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incCycles(16);
};

// RES N,R
// - - - -
const RES_N_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// RES N,(RR)
// - - - -
const RES_N_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

// SET N,R
// - - - -
const SET_N_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.incCycles(8);
  // TODO: IMPLEMENT
  return -1;
};

// SET N,(RR)
// - - - -
const SET_N_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.incCycles(16);
  // TODO: IMPLEMENT
  return -1;
};

const rotationShiftBitOperations = {
  RLCA,
  RRCA,
  RLA,
  RRA,

  RLC_R,
  RLC_$RR,
  RRC_R,
  RRC_$RR,
  RL_R,
  RL_$RR,
  RR_R,
  RR_$RR,

  SLA_R,
  SLA_$RR,
  SRA_R,
  SRA_$RR,
  SRL_R,
  SRL_$RR,

  SWAP_R,
  SWAP_$RR,

  BIT_N_R,
  BIT_N_$RR,

  RES_N_R,
  RES_N_$RR,

  SET_N_R,
  SET_N_$RR,
};

export default rotationShiftBitOperations;
