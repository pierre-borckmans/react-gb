const INTERRUPT_ENABLE_ADDR = 0xffff;
const INTERRUPT_FLAGS_ADDR = 0xff0f;

let registers = {};
const reset = () => {
  registers = {
    interruptEnable: 0x00,
    interruptFlags: 0x00,
  };
};

const getInterruptEnable = () => registers.interruptEnable;
const setInterruptEnable = (value) => (registers.interruptEnable = value);

const getInterruptFlags = () => registers.interruptFlags;
const setInterruptFlags = (flags) => (registers.interruptFlags = flags);

const read = (address) => {
  switch (address) {
    case INTERRUPT_ENABLE_ADDR:
      return getInterruptEnable();
    case INTERRUPT_FLAGS_ADDR:
      return getInterruptFlags();
  }
};

const write = (address, value) => {
  switch (address) {
    case INTERRUPT_ENABLE_ADDR:
      return setInterruptEnable(value);
    case INTERRUPT_FLAGS_ADDR:
      return setInterruptFlags(value);
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
};

export default interrupts;
