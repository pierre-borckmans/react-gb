import config from './config';

import apu from './apu/apu';
import cartridge from './cartridge/cartridge';
import cpu from './cpu/cpu';
import interrupts from './interrupts/interrupts';
import joypad from './joypad/joypad';
import mmu from './mmu/mmu';
import ppu from './ppu/ppu';
import serial from './serial/serial';
import timer from './timer/timer';

import debugger_ from './debugger/debugger';

const getConfig = () => config;

const getApu = () => apu;
const getCartridge = () => cartridge;
const getCpu = () => cpu;
const getInterrupts = () => interrupts;
const getJoypad = () => joypad;
const getMmu = () => mmu;
const getPpu = () => ppu;
const getSerial = () => serial;
const getTimer = () => timer;

const getDebugger = () => debugger_;

const gameboy = {
  getConfig,

  getApu,
  getCartridge,
  getCpu,
  getInterrupts,
  getJoypad,
  getMmu,
  getPpu,
  getSerial,
  getTimer,

  getDebugger,
};

export default gameboy;
