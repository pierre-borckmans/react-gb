// JR r8
// - - - -
const JR_r8 = (cpu) => {
  cpu.incPC(2);
  cpu.clock.c += 12;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JR NF,r8
// - - - -
const JR_NF_r8 = (cpu, F) => {
  cpu.incPC(2);
  cpu.clock.c += 12 / 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JR F,r8
// - - - -
const JR_F_r8 = (cpu, F) => {
  cpu.incPC(2);
  cpu.clock.c += 12 / 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JP a16
// - - - -
const JP_a16 = (cpu) => {
  cpu.incPC(3);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JP NF,a16
// - - - -
const JP_NF_a16 = (cpu, F) => {
  cpu.incPC(3);
  cpu.clock.c += 16 / 12;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JP F,a16
// - - - -
const JP_F_a16 = (cpu, F) => {
  cpu.incPC(3);
  cpu.clock.c += 16 / 12;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// JP (RR)
// - - - -
const JP_$RR = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RST XXH
// - - - -
const RST_XXH = (cpu, xx) => {
  cpu.incPC(1);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RET
// - - - -
const RET = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RETI
// - - - -
const RETI = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RET F
// - - - -
const RET_F = (cpu, F) => {
  cpu.incPC(1);
  cpu.clock.c += 20 / 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// RET NF
// - - - -
const RET_NF = (cpu, F) => {
  cpu.incPC(1);
  cpu.clock.c += 20 / 8;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// CALL a16
// - - - -
const CALL_a16 = (cpu) => {
  cpu.incPC(3);
  cpu.clock.c += 24;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// CALL F,a16
// - - - -
const CALL_F_a16 = (cpu, F) => {
  cpu.incPC(3);
  cpu.clock.c += 24 / 12;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// CALL NF,a16
// - - - -
const CALL_NF_a16 = (cpu, F) => {
  cpu.incPC(3);
  cpu.clock.c += 24 / 12;
  // TODO: IMPLEMENT
  alert('not implemented');
};

const jumpCallOperations = {
  JR_r8,
  JR_NF_r8,
  JR_F_r8,
  JP_a16,
  JP_NF_a16,
  JP_F_a16,
  JP_$RR,
  RST_XXH,
  RET,
  RETI,
  RET_F,
  RET_NF,
  CALL_a16,
  CALL_F_a16,
  CALL_NF_a16,
};

export default jumpCallOperations;
