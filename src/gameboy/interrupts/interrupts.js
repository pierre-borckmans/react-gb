import { readBit, setBit } from '../../utils/utils';

const INTERRUPT_ENABLE_ADDR = 0xffff;
const INTERRUPT_FLAGS_ADDR = 0xff0f;

const VBLANK_BIT = 0;
const LCDSTAT_BIT = 1;
const TIMER_BIT = 2;
const SERIAL_BIT = 3;
const JOYPAD_BIT = 4;

let registers = {};
const reset = () => {
  registers = {
    interruptEnable: 0x00,
    interruptFlags: 0x00,
  };
};

const getInterruptEnable = () => registers.interruptEnable;
const setInterruptEnable = (value) => (registers.interruptEnable = value);

const getVBlankInterruptEnable = () =>
  readBit(registers.interruptEnable, VBLANK_BIT);
const getLCDStatInterruptEnable = () =>
  readBit(registers.interruptEnable, LCDSTAT_BIT);
const getTimerInterruptEnable = () =>
  readBit(registers.interruptEnable, TIMER_BIT);
const getSerialInterruptEnable = () =>
  readBit(registers.interruptEnable, SERIAL_BIT);
const getJoypadInterruptEnable = () =>
  readBit(registers.interruptEnable, JOYPAD_BIT);
const enableVBlankInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, VBLANK_BIT, 1);
};
const enableLCDStatInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, LCDSTAT_BIT, 1);
};
const enableTimerInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, TIMER_BIT, 1);
};
const enableSerialInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, SERIAL_BIT, 1);
};
const enableJoypadInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, JOYPAD_BIT, 1);
};
const disableVBlankInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, VBLANK_BIT, 0);
};
const disableLCDStatInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, LCDSTAT_BIT, 0);
};
const disableTimerInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, TIMER_BIT, 0);
};
const disableSerialInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, SERIAL_BIT, 0);
};
const disableJoypadInterrupt = () => {
  registers.interruptEnable = setBit(registers.interruptEnable, JOYPAD_BIT, 0);
};

const getInterruptFlags = () => registers.interruptFlags;
const setInterruptFlags = (flags) => (registers.interruptFlags = flags);

const getVBlankInterruptFlag = () =>
  readBit(registers.interruptFlags, VBLANK_BIT);
const getLCDStatInterruptFlag = () =>
  readBit(registers.interruptFlags, LCDSTAT_BIT);
const getTimerInterruptFlag = () =>
  readBit(registers.interruptFlags, TIMER_BIT);
const getSerialInterruptFlag = () =>
  readBit(registers.interruptFlags, SERIAL_BIT);
const getJoypadInterruptFlag = () =>
  readBit(registers.interruptFlags, JOYPAD_BIT);

const setVBlankInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, VBLANK_BIT, 1));
const setLCDStatInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, LCDSTAT_BIT, 1));
const setTimerInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, TIMER_BIT, 1));
const setSerialInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, SERIAL_BIT, 1));
const setJoypadInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, JOYPAD_BIT, 1));

const resetVBlankInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, VBLANK_BIT, 0));
const resetLCDStatInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, LCDSTAT_BIT, 0));
const resetTimerInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, TIMER_BIT, 0));
const resetSerialInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, SERIAL_BIT, 0));
const resetJoypadInterruptFlag = () =>
  (registers.interruptFlags = setBit(registers.interruptFlags, JOYPAD_BIT, 0));

const read = (address) => {
  switch (address) {
    case INTERRUPT_ENABLE_ADDR:
      return getInterruptEnable();
    case INTERRUPT_FLAGS_ADDR:
      return getInterruptFlags();
    default:
  }
};

const write = (address, value) => {
  switch (address) {
    case INTERRUPT_ENABLE_ADDR:
      return setInterruptEnable(value);
    case INTERRUPT_FLAGS_ADDR:
      return setInterruptFlags(value);
    default:
  }
};

const interrupts = {
  read,
  write,
  reset,

  getInterruptEnable,
  setInterruptEnable,
  getInterruptFlags,
  setInterruptFlags,

  getVBlankInterruptEnable,
  getLCDStatInterruptEnable,
  getTimerInterruptEnable,
  getSerialInterruptEnable,
  getJoypadInterruptEnable,
  enableVBlankInterrupt,
  enableLCDStatInterrupt,
  enableTimerInterrupt,
  enableSerialInterrupt,
  enableJoypadInterrupt,
  disableVBlankInterrupt,
  disableLCDStatInterrupt,
  disableTimerInterrupt,
  disableSerialInterrupt,
  disableJoypadInterrupt,

  getVBlankInterruptFlag,
  getLCDStatInterruptFlag,
  getTimerInterruptFlag,
  getSerialInterruptFlag,
  getJoypadInterruptFlag,
  setVBlankInterruptFlag,
  setLCDStatInterruptFlag,
  setTimerInterruptFlag,
  setSerialInterruptFlag,
  setJoypadInterruptFlag,
  resetVBlankInterruptFlag,
  resetLCDStatInterruptFlag,
  resetTimerInterruptFlag,
  resetSerialInterruptFlag,
  resetJoypadInterruptFlag,
};

export default interrupts;
