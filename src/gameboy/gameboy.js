import cpu from './cpu/cpu';
import mmu from './mmu/mmu';
import debugger_ from './debugger/debugger';

const getDebugger = () => debugger_;
const getCpu = () => cpu;
const getMmu = () => mmu;

const gameboy = {
  getDebugger,
  getCpu,
  getMmu,
};

export default gameboy;
