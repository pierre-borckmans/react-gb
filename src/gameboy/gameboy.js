import config from './config';
import debugger_ from './debugger/debugger';

// gameboy subsystems
import apu from './apu/apu';
import cartridge from './cartridge/cartridge';
import cpu from './cpu/cpu';
import interrupts from './interrupts/interrupts';
import joypad from './joypad/joypad';
import mmu from './mmu/mmu';
import ppu from './ppu/ppu';
import serial from './serial/serial';
import timer from './timer/timer';

// gameboy devices
import screen from '../devices/screen/screen';
import keyboard from '../devices/input/keyboard';
import gamepad from '../devices/input/gamepad';
import serialConsole from '../devices/serial/console';
import speakers from '../devices/speakers/speakers';

const getConfig = () => config;
const getDebugger = () => debugger_;

// gameboy subsystems
const getApu = () => apu;
const getCartridge = () => cartridge;
const getCpu = () => cpu;
const getInterrupts = () => interrupts;
const getJoypad = () => joypad;
const getMmu = () => mmu;
const getPpu = () => ppu;
const getSerial = () => serial;
const getTimer = () => timer;

// gameboy devices
const getScreen = () => screen;
const getKeyboard = () => keyboard;
const getGamepad = () => gamepad;
const getSerialConsole = () => serialConsole;
const getSpeakers = () => speakers;

const gameboy = {
  getConfig,
  getDebugger,

  getApu,
  getCartridge,
  getCpu,
  getInterrupts,
  getJoypad,
  getMmu,
  getPpu,
  getSerial,
  getTimer,

  getScreen,
  getKeyboard,
  getGamepad,
  getSerialConsole,
  getSpeakers,
};

keyboard.init();

export default gameboy;
