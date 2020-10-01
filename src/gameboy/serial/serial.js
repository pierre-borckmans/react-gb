import { format } from '../../utils/utils';
import interrupts from '../interrupts/interrupts';

const SERIAL_TRANSFER_DATA_ADDR = 0xff01;
const SERIAL_IO_CONTROL_ADDR = 0xff02;

const TRANSFER_START_FLAG_BIT = 7;
const CLOCK_SPEED_BIT = 1; // 0=normal, 1=fast
const SHIFT_CLOCK_BIT = 0; // 1=internal (8192 Hz), 0=external (up to 500kHz max)

// INTERRUPT RST 58 when data transfer complete

let registers = {};
let data = {};

const reset = () => {
  registers = {
    SB: 0x00,
    SC: 0x00,
  };
  data = {
    cycles: 0,
    sentBytes: [],
  };
};

reset();

const read = address => {
  if (address === SERIAL_TRANSFER_DATA_ADDR) {
    return registers.SB;
  } else if (address === SERIAL_IO_CONTROL_ADDR) {
    return registers.SC;
  } else {
    throw new Error(
      `Trying to read invalid serial address ${format('hex', address, 16)}`,
    );
  }
};

const write = (address, value) => {
  if (address === SERIAL_TRANSFER_DATA_ADDR) {
    registers.SB = value;
  } else if (address === SERIAL_IO_CONTROL_ADDR) {
    registers.SC = value;
  } else {
    throw new Error(
      `Trying to write invalid serial address ${format('hex', address, 16)}`,
    );
  }
};

const transferInProgress = () => registers.SC & TRANSFER_START_FLAG_BIT;

const getFrequency = () => {
  const clockSpeed = (registers.SC & CLOCK_SPEED_BIT) >> CLOCK_SPEED_BIT;
  const useInternalClock = registers.SC & SHIFT_CLOCK_BIT;

  if (useInternalClock) {
    return clockSpeed ? 262144 : 8192;
    // TODO double speed mode
    // return clockSpeed ? 524288 : 16384;
  } else {
    return 0;
  }
};

const getSentBytes = () => data.sentBytes;

const step = stepMachineCycles => {
  if (transferInProgress()) {
    data.cycles += stepMachineCycles;

    if (data.cycles >= getFrequency() / 4) {
      interrupts.setSerialInterruptFlag();
      data.cycles = 0;
      data.sentBytes.push(registers.SB);
      registers.SB = 0xff;
      registers.SC = registers.SC & ~TRANSFER_START_FLAG_BIT;
    }
  }
};

const serial = {
  read,
  write,
  reset,
  step,

  getSentBytes,
};

export default serial;
