import cpu from '../cpu/cpu';
import { find } from 'lodash';

let breakpoints = [];
let running = false;
let totalSteps = 0;
let stepsPerSecond = 0;

const getStepsPerSecond = () => stepsPerSecond;
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

const run = (callback) => {
  running = true;
  const startPC = cpu.getPC();
  let prevStartTime = new Date().getTime();
  let stepsCount = 0;
  stepsPerSecond = 0;

  const runLoop = () => {
    for (let i = 0; i < 10000; i++) {
      const now = new Date().getTime();
      stepsCount++;
      totalSteps++;
      if (now - prevStartTime > 2000) {
        stepsPerSecond = (stepsCount / (now - prevStartTime)) * 1000;
        stepsCount = 0;
        prevStartTime = now;
      }

      const breakpoint = find(
        breakpoints,
        (bp) => cpu.getPC() > startPC && cpu.getPC() === bp.address
      );
      if (breakpoint && (!breakpoint.condition || breakpoint.condition(cpu))) {
        running = false;
        break;
      }
      const result = cpu.step();
      if (result === -1) {
        running = false;
        break;
      }
    }
    callback();
    if (running) setTimeout(runLoop, 0);
  };
  runLoop();
};

const pause = () => {
  running = false;
};

const step = (callback) => {
  cpu.step();
  callback();
};

const isRunning = () => running;

const reset = () => {
  cpu.reset();
  running = false;
  totalSteps = 0;
  stepsPerSecond = 0;
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
  getTotalSteps,
  reset,
};

export default debugger_;
