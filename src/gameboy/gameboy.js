import config from './config';
import cpu from './cpu/cpu';
import mmu from './mmu/mmu';
import ppu from './ppu/ppu';
import cartridge from './cartridge/cartridge';
import debugger_ from './debugger/debugger';

const getConfig = () => config;
const getDebugger = () => debugger_;
const getCpu = () => cpu;
const getMmu = () => mmu;
const getPpu = () => ppu;
const getCartridge = () => cartridge;

const gameboy = {
  getDebugger,
  getCpu,
  getMmu,
  getPpu,
  getCartridge,
  getConfig,
};

export default gameboy;
