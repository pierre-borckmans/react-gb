import timer from '../../timer/timer';

const SIZE = 0x80;
const data = new Uint8Array(SIZE).fill(0);

const START_TIMER_ADDR = 0xff04;
const END_TIMER_ADDR = 0xff07;

const read = (address) => {
  if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    return timer.read(address);
  } else {
    return data[address];
  }
};

const write = (address, value) => {
  if (address >= START_TIMER_ADDR && address <= END_TIMER_ADDR) {
    timer.write(address, value);
  } else {
    data[address] = value;
  }
};

const reset = () => {
  for (let i = 0; i < SIZE; i++) {
    data[i] = 0x00;
  }
};

const io = {
  read,
  write,
  reset,
};

export default io;
