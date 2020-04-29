const DIVIDER_ADDR = 0xff04; // Counts up at a fixed 16384Hz; reset to 0 whenever written to
const TIMER_COUNTER_ADDR = 0xff05; // Counts up at the specified rate; triggers INT 0x50 when going 255->0
const TIMER_MODULO_ADDR = 0xff06; // When Counter overflows to 0, it's reset to start at Modulo
const TIMER_CONTROL_ADDR = 0xff07;

const TIMER_CONTROL_INPUT_CLOCK_SELECT_BITS = 3; // bits 1 and 0
// Clock speeds:
// 01 - 262144Hz -   4
// 10 -  65536Hz -  16
// 11 -  16384Hz -  64
// 00 -   4096Hz - 128
const TIMER_CONTROL_START_BIT = 2; // 1 to run timer, 0 to stop

let cycles = {};
let registers = {};

const reset = () => {
  cycles = {
    DIV: 0,
    TIMA: 0,
  };
  registers = {
    DIV: 0x00,
    TIMA: 0x00,
    TMA: 0x00,
    TAC: 0x00 & 7,
  };
};

reset();

const step = (stepCycles) => {
  cycles.DIV += stepCycles;
  cycles.TIMA += stepCycles;

  // CPU freq = 1024*1024 = 1.048.576 Hz
  // DIV works at 16384Hz -> increment DIV every 64 cycles
  if (cycles.DIV >= 64) {
    cycles.DIV -= 64;
    registers.DIV = (registers.DIV + 1) & 0xff;
  }

  let timaThreshold;
  if (registers.TAC & TIMER_CONTROL_START_BIT) {
    switch (registers.TAC & TIMER_CONTROL_INPUT_CLOCK_SELECT_BITS) {
      case 0b00:
        timaThreshold = 256;
        break; // 4096Hz
      case 0b01:
        timaThreshold = 4;
        break; // 262144Hz
      case 0b10:
        timaThreshold = 16;
        break; // 65536Hz
      case 0b11:
        timaThreshold = 64;
        break; // 16384Hz
      default:
        throw new Error(`Invalid value for timer control ${registers.TAC}`);
    }

    if (cycles.TIMA >= timaThreshold) {
      cycles.TIMA -= timaThreshold;
      registers.TIMA++;

      if (registers.TIMA > 0xff) {
        registers.TIMA = registers.TMA;

        // TODO: trigger interrupt
      }
    }
  }
};

const read = (address) => {
  switch (address) {
    case DIVIDER_ADDR:
      return registers.DIV;
    case TIMER_COUNTER_ADDR:
      return registers.TIMA;
    case TIMER_MODULO_ADDR:
      return registers.TMA;
    case TIMER_CONTROL_ADDR:
      return registers.TAC;
    default:
      throw new Error(`Trying to read from invalid timer address ${address}`);
  }
};

const write = (address, value) => {
  switch (address) {
    case DIVIDER_ADDR:
      registers.DIV = 0;
      break;
    case TIMER_COUNTER_ADDR:
      registers.TIMA = value;
      break;
    case TIMER_MODULO_ADDR:
      registers.TMA = value;
      break;
    case TIMER_CONTROL_ADDR:
      registers.TAC = value & 7;
      break;
    default:
      throw new Error(`Trying to write to invalid timer address ${address}`);
  }
};

const getDIV = () => registers.DIV;
const getTIMA = () => registers.TIMA;
const getTMA = () => registers.TMA;
const getTAC = () => registers.TAC;

const timer = {
  read,
  write,

  getDIV,
  getTIMA,
  getTMA,
  getTAC,

  reset,
  step,
};

export default timer;
