// JR r8
// - - - -
const JR_r8 = (cpu) => {
  const r8 = cpu.readSignedImmediate8();
  cpu.incPC(r8);
  cpu.clock.c += 12;
};

// JR NF,r8
// - - - -
const JR_NF_r8 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    const r8 = cpu.readSignedImmediate8();
    cpu.incPC(r8);
    cpu.clock.c += 12;
  } else {
    cpu.incPC(2);
    cpu.clock.c += 8;
  }
};

// JR F,r8
// - - - -
const JR_F_r8 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    const r8 = cpu.readSignedImmediate8();
    cpu.incPC(r8);
    cpu.clock.c += 12;
  } else {
    cpu.incPC(2);
    cpu.clock.c += 8;
  }
};

// JP a16
// - - - -
const JP_a16 = (cpu) => {
  const a16 = cpu.readImmediate16();
  cpu.setPC(a16);
  cpu.clock.c += 16;
};

// JP NF,a16
// - - - -
const JP_NF_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    const a16 = cpu.readImmediate16();
    cpu.setPC(a16);
    cpu.clock.c += 16;
  } else {
    cpu.incPC(3);
    cpu.clock.c += 12;
  }
};

// JP F,a16
// - - - -
const JP_F_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    const a16 = cpu.readImmediate16();
    cpu.setPC(a16);
    cpu.clock.c += 16;
  } else {
    cpu.incPC(3);
    cpu.clock.c += 12;
  }
};

// JP (RR)
// - - - -
const JP_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);

  cpu.setPC(address);
  cpu.clock.c += 4;
};

// RST XXH
// - - - -
const RST_XXH = (cpu, XX) => {
  cpu.stackPush(cpu.getPC());

  cpu.setPC(XX);
  cpu.clock.c += 16;
};

// RET
// - - - -
const RET = (cpu) => {
  const popValue = cpu.stackPop(cpu);
  cpu.setPC(popValue);
  cpu.clock.c += 16;
};

// RETI
// - - - -
const RETI = (cpu) => {
  const popValue = cpu.stackPop(cpu);
  cpu.setPC(popValue);
  cpu.setIME();
  cpu.clock.c += 16;
};

// RET F
// - - - -
const RET_F = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    const popValue = cpu.stackPop(cpu);
    cpu.setPC(popValue);
    cpu.clock.c += 20;
  } else {
    cpu.incPC(1);
    cpu.clock.c += 8;
  }
};

// RET NF
// - - - -
const RET_NF = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    const popValue = cpu.stackPop(cpu);
    cpu.setPC(popValue);
    cpu.clock.c += 20;
  } else {
    cpu.incPC(1);
    cpu.clock.c += 8;
  }
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
