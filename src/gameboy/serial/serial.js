import { format } from '../../utils/utils';

const SERIAL_TRANSFER_DATA_ADDR = 0xff01;
const SERIAL_IO_CONTROL_ADDR = 0xff02;

// const TRANSFER_START_FLAG_BIT = 7;
// const SHIFT_CLOCK_BIT = 0; // 1 internal (8192 Hz), 0 external (up to 500kHz max)

// INTERRUPT RST 58 when data transfer complete

let sentBytes = [];
let registers = {};

const reset = () => {
  registers = {
    transferData: 0x00,
    transferControl: 0x00,
  };
  sentBytes = [];
};

reset();

const step = () => {
  // TODO implement
};

const read = (address) => {
  if (address === SERIAL_TRANSFER_DATA_ADDR) {
    return registers.transferData;
  } else if (address === SERIAL_IO_CONTROL_ADDR) {
    return registers.transferControl;
  } else {
    throw new Error(
      `Trying to read invalid serial address ${format('hex', address, 16)}`
    );
  }
};

const write = (address, value) => {
  if (address === SERIAL_TRANSFER_DATA_ADDR) {
    registers.transferData = value;
  } else if (address === SERIAL_IO_CONTROL_ADDR) {
    registers.transferControl = value;
    if (value === 0x81) {
      sentBytes.push(registers.transferData);
    }
  } else {
    throw new Error(
      `Trying to write invalid serial address ${format('hex', address, 16)}`
    );
  }
};

const getSentBytes = () => sentBytes;

const serial = {
  read,
  write,
  reset,
  step,

  getSentBytes,
};

export default serial;
