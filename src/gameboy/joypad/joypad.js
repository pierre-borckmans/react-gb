import mmu from '../mmu/mmu';
import { readBit } from '../../utils/utils';

const BUTTON_KEYS_BIT = 5;
const DIRECTION_KEYS_BIT = 4;
const DOWN_START_BIT = 3;
const UP_SELECT_BIT = 2;
const LEFT_B_BIT = 1;
const RIGHT_A_BIT = 0;

const registers = {
  joypad: 0x00,
};

const reset = () => {
  registers.joypad = 0x00;
};

const getAButton = () =>
  readBit(registers.joypad, BUTTON_KEYS_BIT) &&
  readBit(registers.joypad, RIGHT_A_BIT);

const getBButton = () =>
  readBit(registers.joypad, BUTTON_KEYS_BIT) &&
  readBit(registers.joypad, LEFT_B_BIT);

const getSelectButton = () =>
  readBit(registers.joypad, BUTTON_KEYS_BIT) &&
  readBit(registers.joypad, UP_SELECT_BIT);

const getStartButton = () =>
  readBit(registers.joypad, BUTTON_KEYS_BIT) &&
  readBit(registers.joypad, DOWN_START_BIT);

const getRightButton = () =>
  readBit(registers.joypad, DIRECTION_KEYS_BIT) &&
  readBit(registers.joypad, RIGHT_A_BIT);

const getLeftButton = () =>
  readBit(registers.joypad, DIRECTION_KEYS_BIT) &&
  readBit(registers.joypad, LEFT_B_BIT);

const getUpButton = () =>
  readBit(registers.joypad, DIRECTION_KEYS_BIT) &&
  readBit(registers.joypad, UP_SELECT_BIT);

const getDownButton = () =>
  readBit(registers.joypad, DIRECTION_KEYS_BIT) &&
  readBit(registers.joypad, DOWN_START_BIT);

const read = () => registers.joypad;

const write = (value) => {
  registers.joypad = value;
};

const joypad = {
  getAButton,
  getBButton,
  getSelectButton,
  getStartButton,
  getRightButton,
  getLeftButton,
  getUpButton,
  getDownButton,

  reset,
  read,
  write,
};

export default joypad;
