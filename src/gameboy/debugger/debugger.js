import breakpoints from './breakpoints';

import cpu from '../cpu/cpu';
import mmu from '../mmu/mmu';
import ppu from '../ppu/ppu';
import apu from '../apu/apu';
import timer from '../timer/timer';
import joypad from '../joypad/joypad';
import serial from '../serial/serial';

const MACHINE_CYCLES_PER_FRAME = 17556;

let running = false;
let totalSteps = 0;
let stepsPerSecond = 0;
let machineCyclesPerSecond = 0;

const getStepsPerSecond = () => stepsPerSecond;
const getMachineCyclesPerSecond = () => machineCyclesPerSecond;
const getTotalSteps = () => totalSteps;

let currentBreakpoint = null;
const getCurrentBreakpoint = () => currentBreakpoint;

const run = (mod, callback) => {
  if (running) return;
  running = true;
  let frames = 0;
  let steps = 0;

  const startMachineCycles = cpu.getMachineCycles();
  const startPC = cpu.getPC();

  totalSteps = 0;
  stepsPerSecond = 0;
  machineCyclesPerSecond = 0;

  currentBreakpoint = null;

  let startTime = null;
  const frame = (timestamp) => {
    if (!startTime) startTime = timestamp;
    frames++;
    const targetMachineCycles =
      cpu.getMachineCycles() + MACHINE_CYCLES_PER_FRAME;
    while (cpu.getMachineCycles() < targetMachineCycles && running) {
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
    const machineCycles = cpu.getMachineCycles() - startMachineCycles;
    if (elapsedTime > 0) {
      stepsPerSecond = (steps / elapsedTime) * 1000;
      machineCyclesPerSecond = (machineCycles / elapsedTime) * 1000;
    }

    if (frames % mod === 0 || !running) {
      callback && callback();
    }

    if (running) {
      requestAnimationFrame(frame);
    } else {
      console.log(cpu.getSteps().join('\n'));
    }
  };
  callback && callback();
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
  mmu.reset();
  timer.reset();
  apu.reset();
  ppu.reset();
  joypad.reset();
  serial.reset();

  running = false;
  totalSteps = 0;
  stepsPerSecond = 0;
  machineCyclesPerSecond = 0;
  currentBreakpoint = null;
};

const debugger_ = {
  run,
  pause,
  step,
  isRunning,
  getStepsPerSecond,
  getMachineCyclesPerSecond,
  getTotalSteps,
  reset,
  getCurrentBreakpoint,

  ...breakpoints,
};

export default debugger_;
