import breakpoints from './breakpoints';

import cpu from '../cpu/cpu';
import ppu from '../ppu/ppu';
import apu from '../apu/apu';
import timer from '../timer/timer';
import joypad from '../joypad/joypad';

let running = false;
let totalSteps = 0;
let stepsPerSecond = 0;
let cyclesPerSecond = 0;

const getStepsPerSecond = () => stepsPerSecond;
const getCyclesPerSecond = () => cyclesPerSecond;
const getTotalSteps = () => totalSteps;

let currentBreakpoint = null;
const getCurrentBreakpoint = () => currentBreakpoint;

const run = (mod, callback) => {
  if (running) return;
  running = true;
  let frames = 0;
  let steps = 0;

  const startCycles = cpu.getCycles();
  const startPC = cpu.getPC();

  totalSteps = 0;
  stepsPerSecond = 0;
  cyclesPerSecond = 0;

  currentBreakpoint = null;

  let startTime = null;
  const frame = (timestamp) => {
    if (!startTime) startTime = timestamp;
    frames++;
    const targetClock = cpu.getCycles() + 17556;
    while (cpu.getCycles() < targetClock && running) {
      const result = step();
      if (result === -1) {
        running = false;
        break;
      }

      const breakpoint = breakpoints.findMatchingBreakpoint();
      if (breakpoint) {
        currentBreakpoint = breakpoint;
        running = false;
        break;
      }

      steps++;
    }
    const elapsedTime = timestamp - startTime;
    const cycles = cpu.getCycles() - startCycles;
    if (elapsedTime > 0) {
      stepsPerSecond = (steps / elapsedTime) * 1000;
      cyclesPerSecond = (cycles / elapsedTime) * 1000;
    }

    if (frames % mod === 0 || !running) {
      callback && callback();
    }

    if (running) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const pause = (callback) => {
  running = false;
  callback && callback();
};

const step = (callback) => {
  cpu.step();
  totalSteps++;
  callback && callback();
};

const isRunning = () => running;

const reset = () => {
  cpu.reset();
  timer.reset();
  apu.reset();
  ppu.reset();
  joypad.reset();

  running = false;
  totalSteps = 0;
  stepsPerSecond = 0;
  cyclesPerSecond = 0;
  currentBreakpoint = null;
};

const debugger_ = {
  // getBreakpoints: breakpoints.getBreakpoints,
  // addBreakpoint: breakpoints.addBreakpoint,
  // removeBreakpoint: breakpoints.removeBreakpoint,
  // removeAllBreakpoints: breakpoints.removeAllBreakpoints,
  run,
  pause,
  step,
  isRunning,
  getStepsPerSecond,
  getCyclesPerSecond,
  getTotalSteps,
  reset,
  getCurrentBreakpoint,

  ...breakpoints,
};

export default debugger_;
