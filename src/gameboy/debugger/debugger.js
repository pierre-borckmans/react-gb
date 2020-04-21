import cpu from '../cpu/cpu';
import { find } from 'lodash';

let breakpoints = [];
let running = false;
let totalSteps = 0;
let stepsPerSecond = 0;
let cyclesPerSecond = 0;

const getStepsPerSecond = () => stepsPerSecond;
const getCyclesPerSecond = () => cyclesPerSecond;
const getTotalSteps = () => totalSteps;

const getBreakpoints = () => breakpoints;

const setBreakpoint = (address, condition) => {
  breakpoints = [
    ...breakpoints.filter((breakpoint) => breakpoint.address !== address),
    {
      address,
      condition,
    },
  ].sort((b1, b2) => (b1.address > b2.address ? 1 : -1));
};

const removeBreakpoint = (address) => {
  breakpoints = [
    ...breakpoints.filter((breakpoint) => breakpoint.address !== address),
  ];
};

const removeAllBreakpoints = () => {
  breakpoints = [];
};

const run = (mod, callback) => {
  if (running) return;
  running = true;
  let frames = 0;
  let steps = 0;
  let cycles = 0;

  const startPC = cpu.getPC();

  totalSteps = 0;
  stepsPerSecond = 0;

  let startTime;
  const frame = (timestamp) => {
    if (!startTime) startTime = timestamp;
    frames++;
    const targetClock = cpu.getCycles() + 17556;
    while (cpu.getCycles() < targetClock && running) {
      const breakpoint = find(
        breakpoints,
        (bp) => cpu.getPC() > startPC && cpu.getPC() === bp.address
      );
      if (breakpoint && (!breakpoint.condition || breakpoint.condition(cpu))) {
        running = false;
        break;
      }
      const result = step();
      if (result === -1) {
        running = false;
        break;
      }
      steps++;
    }
    const elapsedTime = timestamp - startTime;
    cycles = cpu.getCycles();
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
  running = false;
  totalSteps = 0;
  stepsPerSecond = 0;
  cyclesPerSecond = 0;
};

const debugger_ = {
  getBreakpoints,
  setBreakpoint,
  removeBreakpoint,
  removeAllBreakpoints,
  run,
  pause,
  step,
  isRunning,
  getStepsPerSecond,
  getCyclesPerSecond,
  getTotalSteps,
  reset,
};

export default debugger_;
