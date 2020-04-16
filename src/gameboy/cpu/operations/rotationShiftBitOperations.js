// RLCA
// 0 0 0 C
const RLCA = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RRCA
// 0 0 0 C
const RRCA = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RLA
// 0 0 0 C
const RLA = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RCA
// 0 0 0 C
const RRA = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RLC R
// Z 0 0 C
const RLC_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RLC (RR)
// Z 0 0 C
const RLC_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RRC R
// Z 0 0 C
const RRC_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RRC (RR)
// Z 0 0 C
const RRC_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RL R
// Z 0 0 C
const RL_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RL (RR)
// Z 0 0 C
const RL_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RR R
// Z 0 0 C
const RR_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RR (RR)
// Z 0 0 C
const RR_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SLA R
// Z 0 0 C
const SLA_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SLA (RR)
// Z 0 0 C
const SLA_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SRA R
// Z 0 0 0
const SRA_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SRA (RR)
// Z 0 0 0
const SRA_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SWAP R
// Z 0 0 0
const SWAP_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SWAP (RR)
// Z 0 0 0
const SWAP_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SRL R
// Z 0 0 C
const SRL_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SRL (RR)
// Z 0 0 C
const SRL_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// BIT N,R
// Z 0 1 -
const BIT_N_R = (cpu, n, reg8) => {
  const value = cpu.readReg8(reg8);
  const bit = (value & (1 << n)) === 1 << n;

  const Z = bit;
  const N = 0;
  const H = 1;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.clock.c += 8;
};

// BIT N,(RR)
// Z 0 1 -
const BIT_N_$RR = (cpu, n, reg16) => {
  const address = cpu.readReg8(reg16);
  const value = cpu.readAddress8(address);
  const bit = (value & (1 << n)) === 1 << n;

  const Z = bit;
  const N = 0;
  const H = 1;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.clock.c += 16;
};

// RES N,R
// - - - -
const RES_N_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RES N,(RR)
// - - - -
const RES_N_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SET N,R
// - - - -
const SET_N_R = (cpu, reg8) => {
  cpu.incPC(2);
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// SET N,(RR)
// - - - -
const SET_N_$RR = (cpu, reg16) => {
  cpu.incPC(2);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
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
