import prefixCBOpcodesMap from '../opcodes/prefixCBOpcodesMap';

// NOP
// - - - -
const NOP = (cpu) => {
  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// STOP 0
// - - - -
const STOP = (cpu) => {
  cpu.incPC(2);
};

// HALT
// - - - -
const HALT = (cpu) => {
  cpu.setHalt(true);

  /* Check halt bug */
  const interruptEnabledFlag = cpu.getInterruptEnabledFlag();
  const interruptFlag = cpu.getInterruptFlag();
  if (!cpu.getIME() && interruptFlag & interruptEnabledFlag & 0x1f) {
    cpu.setHaltBug(true);
  }

  cpu.incPC(1);
};

// PREFIX CB
// - - - -
const PREFIX_CB = (cpu) => {
  const opcode = cpu.readImmediate8();
  prefixCBOpcodesMap[opcode](cpu);
};

// DI
// - - - -
const DI = (cpu) => {
  cpu.setIME(false);
  cpu.incPC(1);
  cpu.incClockCycles(4);
};

// EI
// - - - -
const EI = (cpu) => {
  cpu.setIME(true);
  cpu.incPC(1);
  cpu.incClockCycles(4);
};

const miscControlOperations = {
  NOP,
  STOP,
  HALT,
  PREFIX_CB,
  DI,
  EI,
};

export default miscControlOperations;
