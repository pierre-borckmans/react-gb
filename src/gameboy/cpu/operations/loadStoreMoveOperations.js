// --------------------------------------------------------------------------------
// 16 bits operations -------------------------------------------------------------
// --------------------------------------------------------------------------------

// LD RR,d16
// - - - -
const LD16_RR_d16 = (cpu, reg16) => {
  const bb = cpu.readImmediate16();
  cpu.writeReg16(reg16, bb);

  cpu.PC += 3;
  cpu.clock.c += 12;
};

// LD (a16), SP
// - - - -
const LD16_$a16_SP = (cpu) => {
  const aa = cpu.readImmediate16();
  const value = cpu.SP;
  cpu.writeAddress16(aa, value);

  cpu.PC += 3;
  cpu.clock.c += 20;
};

// LD SP,d16
// - - - -
const LD16_SP_d16 = (cpu) => {
  const bb = cpu.readImmediate16();
  cpu.SP = bb;

  cpu.PC += 3;
  cpu.clock.c += 12;
};

// LD SP,RR
// - - - -
const LD16_SP_RR = (cpu, reg16) => {
  const rr = cpu.readReg16(reg16);
  cpu.SP = rr;

  cpu.PC += 1;
  cpu.clock.c += 8;
};

// LD RR,SP+r8
// 0 0 H C
const LD16_RR_SPpr8 = (cpu, reg16) => {
  const value = cpu.SP + cpu.readSignedImmediate8();

  cpu.writeReg16(reg16, value);

  cpu.PC += 2;
  cpu.clock.c += 12;
};

// POP RR
// - - - -
const POP16_RR = (cpu, reg16) => {
  const val1 = cpu.memory[cpu.SP];
  const val2 = cpu.memory[cpu.SP + 1];
  cpu.writeReg8(reg16[0], val1);
  cpu.writeReg8(reg16[1], val2);

  cpu.SP += 2;

  cpu.PC += 1;
  cpu.clock.c += 12;
};

// PUSH RR
// - - - -
const POP16_RR = (cpu, reg16) => {
  const value = cpu.readReg16(reg16);
  cpu.writeAddress16(cpu.SP, value);

  cpu.SP -= 2;

  cpu.PC += 1;
  cpu.clock.c += 16;
};

// --------------------------------------------------------------------------------
// 8 bits operations --------------------------------------------------------------
// --------------------------------------------------------------------------------

// LD (RR),r
// - - - -
const LD8_$RR_R = (cpu, reg16, reg8) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readReg8(reg8);
  cpu.writeAddress8(address, value);

  cpu.PC += 1;
  cpu.clock.c += 8;
};

// LD R,(RR)
// - - - -
const LD8_r_$RR = (cpu, reg8, reg16) => {
  const address = cpu.readReg8(reg16);
  const value = cpu.readAddress8(address);
  cpu.writeReg8(reg8, value);

  cpu.PC += 1;
  cpu.clock.c += 8;
};

// LD R,R
// - - - -
const LD8_r_r = (cpu, reg1, reg2) => {
  cpu[reg1] = cpu[reg2];
  cpu.PC += 1;
  cpu.clock.c += 4;
};

// LD R,d8
// - - - -
const LD8_R_d8 = (cpu, reg8) => {
  const b = cpu.readImmediate8();
  cpu.writeReg8(reg8, b);

  cpu.PC += 2;
  cpu.clock.c += 8;
};

// LD (RR+),R
// - - - -
const LD8_$RRp_R = (cpu, reg16, reg8) => {
  cpu.PC += 1;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD (RR-),R
// - - - -
const LD8_$RRm_R = (cpu, reg16, reg8) => {
  cpu.PC += 1;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD R,(RR+)
// - - - -
const LD8_R_$RRp = (cpu, reg8, reg16) => {
  cpu.PC += 1;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD R,(RR-)
// - - - -
const LD8_R_$RRm = (cpu, reg8, reg16) => {
  cpu.PC += 1;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD (RR),d8
// - - - -
const LD8_$RR_d8 = (cpu, reg16) => {
  cpu.PC += 2;
  cpu.clock.c += 12;
  // TODO: IMPLEMENT
};

// LDH (a8),R
// - - - -
const LD8H_$a8_R = (cpu) => {
  cpu.PC += 2;
  cpu.clock.c += 12;
  // TODO: IMPLEMENT
};

// LDH R,(a8)
// - - - -
const LD8H_R_$a8 = (cpu) => {
  cpu.PC += 2;
  cpu.clock.c += 12;
  // TODO: IMPLEMENT
};

// LD (R),R
// - - - -
const LD8_$R_R = (cpu) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD R,(R)
// - - - -
const LD8_R_$R = (cpu) => {
  cpu.PC += 2;
  cpu.clock.c += 8;
  // TODO: IMPLEMENT
};

// LD (a16),R
// - - - -
const LD8_$a16_R = (cpu, reg8) => {
  cpu.PC += 3;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
};

// LD R,(a16)
// - - - -
const LD8_R_$a16 = (cpu, reg8) => {
  cpu.PC += 3;
  cpu.clock.c += 16;
  // TODO: IMPLEMENT
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
  LD8_r_$RR,
  LD8_r_r,
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
