import cpu from './cpu/cpu';
import mmu from './mmu/mmu';
import cartridge from './cartridge/cartridge';
import debugger_ from './debugger/debugger';

const getDebugger = () => debugger_;
const getCpu = () => cpu;
const getMmu = () => mmu;
const getCartridge = () => cartridge;

const gameboy = {
  getDebugger,
  getCpu,
  getMmu,
  getCartridge,
};

export default gameboy;
