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
    { ...breakpoint, id, enabled: true },
  ].sort((b1, b2) => (b1.address > b2.address ? 1 : -1));
};

const removeBreakpoint = (id) => {
  breakpoints = [...breakpoints.filter((breakpoint) => breakpoint.id !== id)];
};

const toggleBreakpoint = (id) => {
  const breakpoint = breakpoints.find((bp) => bp.id === id);
  breakpoints = [
    ...breakpoints.filter((breakpoint) => breakpoint.id !== id),
    { ...breakpoint, enabled: !breakpoint.enabled },
  ];
  console.log(breakpoints);
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
    const allRegistersMatch = every(bp.registers, (register) => {
      if (register.name.length === 1) {
        return cpu.readReg8(bp.register.name) === bp.register.value;
      }
      if (register.name === 'SP') {
        return cpu.getSP() === bp.register.value;
      } else {
        return cpu.readReg16(bp.register.name) === bp.register.value;
      }
    });
    const allFlagsMatch = every(
      bp.flags,
      (flag) => cpu.getFlag(flag.name) === flag.value
    );
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
