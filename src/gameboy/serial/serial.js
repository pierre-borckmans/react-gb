const SERIAL_TRANSFER_DATA_ADDR = 0xff01;
const SERIAL_IO_CONTROL_ADDR = 0xff02;

const TRANSFER_START_FLAG_BIT = 7;
const SHIFT_CLOCK_BIT = 0; // 1 internal (8192 Hz), 0 external (up to 500kHz max)

// INTERRUPT RST 58 when data transfer complete

const read = () => {
  return 0x00;
  // TODO
};

const write = (value) => {
  // TODO
};

const reset = () => {
  // TODO
};

const serial = {
  read,
  write,
  reset,
};

export default serial;
