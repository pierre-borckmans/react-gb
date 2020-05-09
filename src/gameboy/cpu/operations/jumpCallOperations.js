// JR r8
// - - - -
const JR_r8 = (cpu) => {
  const r8 = cpu.readSignedImmediate8();
  cpu.incPC(2);
  cpu.incPC(r8);
  cpu.incClockCycles(12);
};

// JR NF,r8
// - - - -
const JR_NF_r8 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    JR_r8(cpu);
  } else {
    cpu.incPC(2);
    cpu.incClockCycles(8);
  }
};

// JR F,r8
// - - - -
const JR_F_r8 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    JR_r8(cpu);
  } else {
    cpu.incPC(2);
    cpu.incClockCycles(8);
  }
};

// JP a16
// - - - -
const JP_a16 = (cpu) => {
  const a16 = cpu.readImmediate16();
  cpu.setPC(a16);
  cpu.incClockCycles(16);
};

// JP NF,a16
// - - - -
const JP_NF_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    JP_a16(cpu);
  } else {
    cpu.incPC(3);
    cpu.incClockCycles(12);
  }
};

// JP F,a16
// - - - -
const JP_F_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    JP_a16(cpu);
  } else {
    cpu.incPC(3);
    cpu.incClockCycles(12);
  }
};

// JP (RR)
// - - - -
const JP_$RR = (cpu, reg16) => {
  // TODO check
  const address = cpu.readReg16(reg16);

  cpu.setPC(address);
  cpu.incClockCycles(4);
};

// RST XXH
// - - - -
const RST_XXH = (cpu, XX) => {
  cpu.setInterruptMasterEnable(0);
  cpu.stackPush(cpu.getPC());

  cpu.setPC(XX);
  cpu.incClockCycles(16);
};

// RET
// - - - -
const RET = (cpu) => {
  const popValue = cpu.stackPop(cpu);
  cpu.setPC(popValue);
  cpu.incClockCycles(16);
};

// RETI
// - - - -
const RETI = (cpu) => {
  cpu.setInterruptMasterEnable(1);
  RET(cpu);
};

// RET F
// - - - -
const RET_F = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (flag) {
    RET(cpu);
    // TODO check the extra 4 cycles
    cpu.incClockCycles(4);
  } else {
    cpu.incPC(1);
    cpu.incClockCycles(8);
  }
};

// RET NF
// - - - -
const RET_NF = (cpu, F) => {
  const flag = cpu.getFlag(F);
  if (!flag) {
    RET(cpu);
    // TODO check the extra 4 cycles
    cpu.incClockCycles(4);
  } else {
    cpu.incPC(1);
    cpu.incClockCycles(8);
  }
};

// CALL a16
// - - - -
const CALL_a16 = (cpu) => {
  const a16 = cpu.readImmediate16();
  cpu.incPC(3);

  cpu.stackPush(cpu.getPC());
  cpu.setPC(a16);

  cpu.incClockCycles(24);
};

// CALL F,a16
// - - - -
const CALL_F_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);

  if (flag) {
    CALL_a16(cpu);
  } else {
    cpu.incPC(3);
    cpu.incClockCycles(12);
  }
};

// CALL NF,a16
// - - - -
const CALL_NF_a16 = (cpu, F) => {
  const flag = cpu.getFlag(F);

  if (!flag) {
    CALL_a16(cpu);
  } else {
    cpu.incPC(3);
    cpu.incClockCycles(12);
  }
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
