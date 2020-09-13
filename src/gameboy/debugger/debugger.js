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

const run = async callback => {
  if (running) return;
  running = true;
  let frames = 0;
  let steps = 0;

  const startMachineCycles = cpu.getMachineCycles();

  totalSteps = 0;
  stepsPerSecond = 0;
  machineCyclesPerSecond = 0;

  currentBreakpoint = null;

  let startTime = null;
  const frame = timestamp => {
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

    callback && callback(frames);

    if (running) {
      requestAnimationFrame(frame);
    } else {
      // console.log(cpu.getSteps().join('\n'));
    }
  };
  callback && callback(frames);
  requestAnimationFrame(frame);

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // while (running) {
  //   const start = new Date().getTime();
  //   frame(start);
  //   const elapsed = new Date().getTime() - start;

  //   if (elapsed < 16) {
  //     // console.log('sleep', 16 - elapsed);
  //     await sleep(0);
  //     const elapsed2 = new Date().getTime() - start;
  //     if (elapsed2 < 16) {
  //       await sleep(1);
  //     }
  //   }
  // }
};

const pause = callback => {
  running = false;
  callback && callback();
};

const step = callback => {
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
