import prefixCBOpcodesMap from '../opcodes/prefixCBOpcodesMap';

// NOP
// - - - -
const NOP = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// STOP 0
// - - - -
const STOP = (cpu) => {
  cpu.incPC(2);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// HALT
// - - - -
const HALT = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
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
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
};

// EI
// - - - -
const EI = (cpu) => {
  cpu.incPC(1);
  cpu.clock.c += 4;
  // TODO: IMPLEMENT
  alert('not implemented');
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
