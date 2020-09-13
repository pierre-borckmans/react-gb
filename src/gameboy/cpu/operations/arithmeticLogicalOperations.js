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
  cpu.incClockCycles(8);
};

// INC SP
// - - - -
const INC16_SP = cpu => {
  const value = cpu.getSP();
  const newValue = (value + 1) & 0xffff;
  cpu.setSP(newValue);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// DEC RR
// - - - -
const DEC16_RR = (cpu, reg16) => {
  const value = cpu.readReg16(reg16);
  const newValue = (value - 1) & 0xffff;
  cpu.writeReg16(reg16, newValue);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// DEC SP
// - - - -
const DEC16_SP = cpu => {
  const value = cpu.getSP();
  const newValue = (value - 1) & 0xffff;
  cpu.setSP(newValue);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// ADD RR,RR
// - 0 H C
const ADD16_RR_RR = (cpu, reg1, reg2) => {
  const sum = cpu.readReg16(reg1) + cpu.readReg16(reg2);

  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = (cpu.readReg16(reg1) & 0xfff) > (sum & 0xfff) ? 1 : 0;
  const C = sum > 0xffff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg16(reg1, sum & 0xffff);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// ADD RR,SP
// - 0 H C
const ADD16_RR_SP = (cpu, reg16) => {
  const sum = cpu.readReg16(reg16) + cpu.getSP();

  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = (cpu.readReg16(reg16) & 0xfff) > (sum & 0xfff) ? 1 : 0;
  const C = sum > 0xffff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg16(reg16, sum & 0xffff);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// ADD SP,r8
// 0 0 H C
const ADD16_SP_r8 = cpu => {
  const r8 = cpu.readSignedImmediate8();
  const sum = cpu.getSP() + r8;

  const Z = 0;
  const N = 0;
  const H = (cpu.getSP() & 0xf) + (r8 & 0xf) > 0xf ? 1 : 0;
  const C = (cpu.getSP() & 0xff) + (r8 & 0xff) > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.setSP(sum & 0xffff);

  cpu.incPC(2);
  cpu.incClockCycles(16);
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
  const H = (value & 0x0f) + 1 > 0x0f ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// INC (RR)
// Z 0 H -
const INC8_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);
  cpu.incClockCycles(4);
  const newValue = (value + 1) & 0xff;
  cpu.writeAddress8(address, newValue);
  cpu.incClockCycles(4);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = (value & 0x0f) + 1 > 0x0f ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incClockCycles(4);
  cpu.incPC(1);
};

// DEC R
// Z 1 H -
const DEC8_R = (cpu, reg8) => {
  const value = cpu.readReg8(reg8);
  const newValue = (value - 1) & 0xff;
  cpu.writeReg8(reg8, newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 1;
  const H = (value & 0x0f) - 1 < 0 ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// DEC (RR)
// Z 1 H -
const DEC8_$RR = (cpu, reg16) => {
  const address = cpu.readReg16(reg16);
  const value = cpu.readAddress8(address);
  cpu.incClockCycles(4);
  const newValue = (value - 1) & 0xff;
  cpu.writeAddress8(address, newValue);
  cpu.incClockCycles(4);

  const Z = newValue === 0 ? 1 : 0;
  const N = 1;
  const H = (value & 0x0f) - 1 < 0 ? 1 : 0;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incClockCycles(4);
  cpu.incPC(1);
};

// ADD R,R
// Z O H C
const ADD8_R_R = (cpu, reg1, reg2) => {
  const sum = cpu.readReg8(reg1) + cpu.readReg8(reg2);

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H = (sum & 0xf) < (cpu.readReg8(reg1) & 0xf) ? 1 : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg1, sum & 0xff);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// ADD R,(RR)
// Z O H C
const ADD8_R_$RR = (cpu, reg8, reg16) => {
  const sum = cpu.readReg8(reg8) + cpu.readAddress8(cpu.readReg16(reg16));

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H = (sum & 0xf) < (cpu.readReg8(reg8) & 0xf) ? 1 : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg8, sum & 0xff);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// ADD R,d8
// Z O H C
const ADD8_R_d8 = (cpu, reg8) => {
  const sum = cpu.readReg8(reg8) + cpu.readImmediate8();

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H = (sum & 0xf) < (cpu.readReg8(reg8) & 0xf) ? 1 : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg8, sum & 0xff);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// ADC R,R
// Z O H C
const ADC8_R_R = (cpu, reg1, reg2) => {
  const sum = cpu.readReg8(reg1) + cpu.readReg8(reg2) + cpu.getFlag('C');

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H =
    (cpu.readReg8(reg1) & 0xf) + (cpu.readReg8(reg2) & 0xf) + cpu.getFlag('C') >
    0xf
      ? 1
      : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg1, sum & 0xff);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// ADC R,(RR)
// Z O H C
const ADC8_R_$RR = (cpu, reg8, reg16) => {
  const sum =
    cpu.readReg8(reg8) +
    cpu.readAddress8(cpu.readReg16(reg16)) +
    cpu.getFlag('C');

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H =
    (cpu.readReg8(reg8) & 0xf) +
      (cpu.readAddress8(cpu.readReg16(reg16)) & 0xf) +
      cpu.getFlag('C') >
    0xf
      ? 1
      : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg8, sum & 0xff);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// ADC R,d8
// Z O H C
const ADC8_R_d8 = (cpu, reg8) => {
  const sum = cpu.readReg8(reg8) + cpu.readImmediate8() + cpu.getFlag('C');

  const Z = (sum & 0xff) === 0 ? 1 : 0;
  const N = 0;
  const H =
    (cpu.readReg8(reg8) & 0xf) +
      (cpu.readImmediate8() & 0xf) +
      cpu.getFlag('C') >
    0xf
      ? 1
      : 0;
  const C = sum > 0xff ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.writeReg8(reg8, sum & 0xff);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// SUB R
// Z 1 H C
const SUB8_R = (cpu, reg8) => {
  const regAValue = cpu.readReg8('A');
  const reg8Value = cpu.readReg8(reg8);
  const newValue = regAValue - reg8Value;
  cpu.writeReg8('A', newValue & 0xff);

  const Z = newValue === 0 ? 1 : 0;
  const N = 1;
  const H = (regAValue & 0xf) < (newValue & 0xf) ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// SUB (RR)
// Z 1 H C
const SUB8_$RR = (cpu, reg16) => {
  const regAValue = cpu.readReg8('A');
  const address = cpu.readReg16(reg16);
  const $RR = cpu.readAddress8(address);
  const newValue = regAValue - $RR;
  cpu.writeReg8('A', newValue & 0xff);

  const Z = newValue === 0 ? 1 : 0;
  const N = 1;
  const H = (regAValue & 0xf) < (newValue & 0xf) ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// SUB d8
// Z 1 H C
const SUB8_d8 = cpu => {
  const regAValue = cpu.readReg8('A');
  const d8 = cpu.readImmediate8();
  const newValue = regAValue - d8;
  cpu.writeReg8('A', newValue & 0xff);

  const Z = newValue === 0 ? 1 : 0;
  const N = 1;
  const H = (regAValue & 0xf) < (newValue & 0xf) ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// SBC R,R
// Z 1 H C
const SBC8_R_R = (cpu, reg1, reg2) => {
  const reg1Value = cpu.readReg8(reg1);
  const reg2Value = cpu.readReg8(reg2);
  const newValue = reg1Value - reg2Value - cpu.getFlag('C');
  cpu.writeReg8(reg1, newValue & 0xff);

  const Z = (newValue & 0xff) === 0 ? 1 : 0;
  const N = 1;
  const H =
    (reg1Value & 0xf) - (reg2Value & 0xf) - cpu.getFlag('C') < 0 ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// SBC R,(RR)
// Z 1 H C
const SBC8_R_$RR = (cpu, reg8, reg16) => {
  const reg8Value = cpu.readReg8(reg8);
  const address = cpu.readReg16(reg16);
  const $RR = cpu.readAddress8(address);
  const newValue = reg8Value - $RR - cpu.getFlag('C');
  cpu.writeReg8(reg8, newValue & 0xff);

  const Z = (newValue & 0xff) === 0 ? 1 : 0;
  const N = 1;
  const H = (reg8Value & 0xf) - ($RR & 0xf) - cpu.getFlag('C') < 0 ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// SBC R,d8
// Z 1 H C
const SBC8_R_d8 = (cpu, reg8) => {
  const reg8Value = cpu.readReg8(reg8);
  const d8 = cpu.readImmediate8();
  const newValue = reg8Value - d8 - cpu.getFlag('C');
  cpu.writeReg8(reg8, newValue & 0xff);

  const Z = (newValue & 0xff) === 0 ? 1 : 0;
  const N = 1;
  const H = (reg8Value & 0xf) - (newValue & 0xf) - cpu.getFlag('C') < 0 ? 1 : 0;
  const C = newValue < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// AND R
// Z 0 1 0
const AND8_R = (cpu, reg8) => {
  const regAValue = cpu.readReg8('A');
  const reg8Value = cpu.readReg8(reg8);
  const newValue = regAValue & reg8Value;
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 1;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// AND (RR)
// Z 0 1 0
const AND8_$RR = (cpu, reg16) => {
  const regAValue = cpu.readReg8('A');
  const address = cpu.readReg16(reg16);
  const $RR = cpu.readAddress8(address);
  const newValue = regAValue & $RR;
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 1;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// AND d8
// Z 0 1 0
const AND8_d8 = cpu => {
  const regAValue = cpu.readReg8('A');
  const r8 = cpu.readImmediate8();
  const newValue = regAValue & r8;
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 1;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// XOR A,R
// Z 0 0 0
const XOR8_A_R = (cpu, reg8) => {
  const newValue = cpu.readReg8('A') ^ cpu.readReg8(reg8);
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// XOR (RR)
// Z 0 0 0
const XOR8_$RR = (cpu, reg16) => {
  const newValue = cpu.readReg8('A') ^ cpu.readAddress8(cpu.readReg16(reg16));
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// XOR d8
// Z 0 0 0
const XOR8_d8 = cpu => {
  const newValue = cpu.readReg8('A') ^ cpu.readImmediate8();
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// OR R
// Z 0 0 0
const OR8_R = (cpu, reg8) => {
  const newValue = cpu.readReg8('A') | cpu.readReg8(reg8);
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// OR (RR)
// Z 0 0 0
const OR8_$RR = (cpu, reg16) => {
  const newValue = cpu.readReg8('A') | cpu.readAddress8(cpu.readReg16(reg16));
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// OR d8
// Z 0 0 0
const OR8_d8 = cpu => {
  const newValue = cpu.readReg8('A') | cpu.readImmediate8();
  cpu.writeReg8('A', newValue);

  const Z = newValue === 0 ? 1 : 0;
  const N = 0;
  const H = 0;
  const C = 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// CP R
// Z 1 H C
const CP8_R = (cpu, reg8) => {
  const regAValue = cpu.readReg8('A');
  const reg8Value = cpu.readReg8(reg8);
  const sum = regAValue - reg8Value;

  const Z = sum === 0 ? 1 : 0;
  const N = 1;
  const H = (sum & 0xf) > (regAValue & 0xf) ? 1 : 0;
  const C = sum < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// CP (RR)
// Z 1 H C
const CP8_$RR = (cpu, reg16) => {
  const regAValue = cpu.readReg8('A');
  const address = cpu.readReg16(reg16);
  const $RR = cpu.readAddress8(address);
  const sum = regAValue - $RR;

  const Z = sum === 0 ? 1 : 0;
  const N = 1;
  const H = (sum & 0xf) > (regAValue & 0xf) ? 1 : 0;
  const C = sum < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(8);
};

// CP d8
// Z 1 H C
const CP8_d8 = cpu => {
  const regAValue = cpu.readReg8('A');
  const d8 = cpu.readImmediate8();
  const sum = regAValue - d8;

  const Z = sum === 0 ? 1 : 0;
  const N = 1;
  const H = (sum & 0xf) > (regAValue & 0xf) ? 1 : 0;
  const C = sum < 0 ? 1 : 0;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(2);
  cpu.incClockCycles(8);
};

// DAA
// Z - 0 C
const DAA8 = cpu => {
  let A = cpu.readReg8('A');
  let correction = 0;

  let setFlagC = 0;
  if (cpu.getFlag('H') || (!cpu.getFlag('N') && (A & 0xf) > 9)) {
    correction |= 0x6;
  }

  if (cpu.getFlag('C') || (!cpu.getFlag('N') && A > 0x99)) {
    correction |= 0x60;
    setFlagC = 1;
  }

  A += cpu.getFlag('N') ? -correction : correction;
  A &= 0xff;
  cpu.writeReg8('A', A);

  const Z = A === 0 ? 1 : 0;
  const N = cpu.getFlag('N');
  const H = 0;
  const C = setFlagC;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// TODO compare with below implementation and see why it is not the same
// const DAA8 = (cpu) => {
//   const A = cpu.readReg8('A');
//   let newA = A;

//   if (cpu.getFlag('N') === 1) {
//     if (cpu.getFlag('H') === 1) {
//       newA = (newA - 0x06) & 0xff;
//     }

//     if (cpu.getFlag('C') === 1) {
//       newA -= 0x60;
//     }
//   } else {
//     if (cpu.getFlag('C') === 1 || newA > 0x99) {
//       newA += 0x60;
//     }

//     if (cpu.getFlag('H') === 1 || (newA & 0x0f) > 0x09) {
//       newA += 0x06;
//     }
//   }
//   cpu.writeReg8('A', newA & 0xff);

//   const Z = (newA & 0xff) === 0 ? 1 : 0;
//   const N = cpu.getFlag('N');
//   const H = 0;
//   const C = newA & 0x100 ? 1 : 0;
//   cpu.setFlags(Z, N, H, C);

//   cpu.incPC(1);
//   cpu.incClockCycles(4);
// };

// CPL
// - 1 1 -
const CPL8 = cpu => {
  cpu.writeReg8('A', cpu.readReg8('A') ^ 0xff);

  const Z = cpu.getFlag('Z');
  const N = 1;
  const H = 1;
  const C = cpu.getFlag('C');
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// SCF
// - 0 0 1
const SCF8 = cpu => {
  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = 0;
  const C = 1;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// CCF
// - 0 0 C
const CCF8 = cpu => {
  const Z = cpu.getFlag('Z');
  const N = 0;
  const H = 0;
  const C = cpu.getFlag('C') ^ 1;
  cpu.setFlags(Z, N, H, C);

  cpu.incPC(1);
  cpu.incClockCycles(4);
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
