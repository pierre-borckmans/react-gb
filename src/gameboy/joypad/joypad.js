import mmu from '../mmu/mmu';

const JOYPAD_ADDR = 0xff00;
const BUTTON_KEYS_BIT = 5;
const DIRECTION_KEYS_BIT = 4;
const DOWN_START_BIT = 3;
const UP_SELECT_BIT = 2;
const LEFT_B_BIT = 1;
const RIGHT_A_BIT = 0;

const getAButton = () =>
  mmu.readBit(JOYPAD_ADDR, BUTTON_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, RIGHT_A_BIT);

const getBButton = () =>
  mmu.readBit(JOYPAD_ADDR, BUTTON_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, LEFT_B_BIT);

const getSelectButton = () =>
  mmu.readBit(JOYPAD_ADDR, BUTTON_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, UP_SELECT_BIT);

const getStartButton = () =>
  mmu.readBit(JOYPAD_ADDR, BUTTON_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, DOWN_START_BIT);

const getRightButton = () =>
  mmu.readBit(JOYPAD_ADDR, DIRECTION_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, RIGHT_A_BIT);

const getLeftButton = () =>
  mmu.readBit(JOYPAD_ADDR, DIRECTION_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, LEFT_B_BIT);

const getUpButton = () =>
  mmu.readBit(JOYPAD_ADDR, DIRECTION_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, UP_SELECT_BIT);

const getDownButton = () =>
  mmu.readBit(JOYPAD_ADDR, DIRECTION_KEYS_BIT) &&
  mmu.readBit(JOYPAD_ADDR, DOWN_START_BIT);

const joypad = {
  getAButton,
  getBButton,
  getSelectButton,
  getStartButton,
  getRightButton,
  getLeftButton,
  getUpButton,
  getDownButton,
};

export default joypad;
