// RLCA
// 0 0 0 C
const RLCA = (cpu) => {
  cpu.PC += 1;
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
};

// RRCA
// 0 0 0 C
const RRCA = (cpu) => {
  cpu.PC += 1;
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
};

// RLA
// 0 0 0 C
const RLA = (cpu) => {
  cpu.PC += 1;
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
};

// RCA
// 0 0 0 C
const RRA = (cpu) => {
  cpu.PC += 1;
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
};

// RLC R
// Z 0 0 C
const RLC_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// RLC (RR)
// Z 0 0 C
const RLC_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// RRC R
// Z 0 0 C
const RRC_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// RRC (RR)
// Z 0 0 C
const RRC_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// RL R
// Z 0 0 C
const RL_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// RL (RR)
// Z 0 0 C
const RL_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// RR R
// Z 0 0 C
const RR_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// RR (RR)
// Z 0 0 C
const RR_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// SLA R
// Z 0 0 C
const SLA_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// SLA (RR)
// Z 0 0 C
const SLA_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// SRA R
// Z 0 0 0
const SRA_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// SRA (RR)
// Z 0 0 0
const SRA_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// SWAP R
// Z 0 0 0
const SWAP_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// SWAP (RR)
// Z 0 0 0
const SWAP_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// SRL R
// Z 0 0 C
const SRL_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// SRL (RR)
// Z 0 0 C
const SRL_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// BIT N,R
// Z 0 1 -
const BIT_N_R = (cpu, n, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// BIT N,(RR)
// Z 0 1 -
const BIT_N_$RR = (cpu, n, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// RES N,R
// - - - -
const RES_N_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// RES N,(RR)
// - - - -
const RES_N_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// SET N,R
// - - - -
const SET_N_R = (cpu, reg8) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// SET N,(RR)
// - - - -
const SET_N_$RR = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
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
