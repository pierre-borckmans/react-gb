import cpu from '../cpu/cpu';
import { every, find } from 'lodash';

let breakpoints = [];

const getBreakpoints = () => breakpoints;

const addBreakpoint = (breakpoint) => {
  const id = breakpoints.length
    ? Math.max(...breakpoints.map((bp) => bp.id)) + 1
    : 1;
  breakpoints = [
    ...breakpoints,
    {
      id,
      enabled: true,
      address: null,
      opcode: null,
      registers: [],
      flags: [],
      ...breakpoint,
    },
  ].sort((b1, b2) => (b1.address > b2.address ? 1 : -1));
};

const removeBreakpoint = (id) => {
  breakpoints = [...breakpoints.filter((breakpoint) => breakpoint.id !== id)];
};

const toggleBreakpoint = (id) => {
  breakpoints = breakpoints.map((breakpoint) =>
    breakpoint.id !== id
      ? breakpoint
      : { ...breakpoint, enabled: !breakpoint.enabled }
  );
};

const removeAllBreakpoints = () => {
  breakpoints = [];
};

const findMatchingBreakpoint = () => {
  const breakpoint = find(breakpoints, (bp) => {
    if (!bp.enabled) return false;

    const addressMatch = bp.address !== undefined && cpu.getPC() === bp.address;
    const opcodeMatch =
      bp.opcode !== undefined && cpu.readAddress8(cpu.getPC()) === bp.opcode;
    const allRegistersMatch =
      bp.registers.length &&
      every(bp.registers, (register) => {
        if (register.name.length === 1) {
          return cpu.readReg8(bp.register.name) === bp.register.value;
        }
        if (register.name === 'SP') {
          return cpu.getSP() === bp.register.value;
        } else {
          return cpu.readReg16(bp.register.name) === bp.register.value;
        }
      });
    const allFlagsMatch =
      bp.flags.length &&
      every(bp.flags, (flag) => cpu.getFlag(flag.name) === flag.value);
    return addressMatch || opcodeMatch || allRegistersMatch || allFlagsMatch;
  });
  return breakpoint;
};

const breakpoints_ = {
  addBreakpoint,
  toggleBreakpoint,
  getBreakpoints,
  removeBreakpoint,
  removeAllBreakpoints,
  findMatchingBreakpoint,
};

export default breakpoints_;
