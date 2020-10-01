const SELECT_BUTTON_KEYS_BIT = 5;
const SELECT_DIRECTION_KEYS_BIT = 4;
const DOWN_START_BIT = 3;
const UP_SELECT_BIT = 2;
const LEFT_B_BIT = 1;
const RIGHT_A_BIT = 0;

let registers = {};

const reset = () => {
  registers = {
    joypad: 0x00,
    buttonKeysSelected: false,
    directionKeysSelected: false,
    downButtonPressed: false,
    upButtonPressed: false,
    leftButtonPressed: false,
    rightButtonPressed: false,
    selectButtonPressed: false,
    startButtonPressed: false,
    aButtonPressed: false,
    bButtonPressed: false,
  };
};

reset();

const getAButton = () => registers.aButtonPressed;
const getBButton = () => registers.bButtonPressed;
const getStartButton = () => registers.startButtonPressed;
const getSelectButton = () => registers.selectButtonPressed;
const getLeftButton = () => registers.leftButtonPressed;
const getRightButton = () => registers.rightButtonPressed;
const getUpButton = () => registers.upButtonPressed;
const getDownButton = () => registers.downButtonPressed;

const setStartButton = pressed => {
  registers.startButtonPressed = pressed;
};

const setSelectButton = pressed => {
  registers.selectButtonPressed = pressed;
};

const setAButton = pressed => {
  registers.aButtonPressed = pressed;
};

const setBButton = pressed => {
  registers.bButtonPressed = pressed;
};

const setUpButton = pressed => {
  registers.upButtonPressed = pressed;
};

const setDownButton = pressed => {
  registers.downButtonPressed = pressed;
};

const setLeftButton = pressed => {
  registers.leftButtonPressed = pressed;
};

const setRightButton = pressed => {
  registers.rightButtonPressed = pressed;
};

const read = () => {
  if (registers.buttonKeysSelected) {
    return (
      (0 << SELECT_BUTTON_KEYS_BIT) |
      (1 << SELECT_DIRECTION_KEYS_BIT) |
      ((registers.aButtonPressed ? 0 : 1) << RIGHT_A_BIT) |
      ((registers.bButtonPressed ? 0 : 1) << LEFT_B_BIT) |
      ((registers.startButtonPressed ? 0 : 1) << DOWN_START_BIT) |
      ((registers.selectButtonPressed ? 0 : 1) << UP_SELECT_BIT)
    );
  } else if (registers.directionKeysSelected) {
    return (
      (1 << SELECT_BUTTON_KEYS_BIT) |
      (0 << SELECT_DIRECTION_KEYS_BIT) |
      ((registers.rightButtonPressed ? 0 : 1) << RIGHT_A_BIT) |
      ((registers.leftButtonPressed ? 0 : 1) << LEFT_B_BIT) |
      ((registers.downButtonPressed ? 0 : 1) << DOWN_START_BIT) |
      ((registers.upButtonPressed ? 0 : 1) << UP_SELECT_BIT)
    );
  } else {
    return 0xff;
  }
};

const write = value => {
  registers.buttonKeysSelected = !(value & (1 << SELECT_BUTTON_KEYS_BIT));
  registers.directionKeysSelected = !(value & (1 << SELECT_DIRECTION_KEYS_BIT));

  // ignore the 4 lowest bits as they are read only
  if (value & 0xf) {
    console.error('Trying to write to read-only joypad register bits 0-4');
  }
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

  setAButton,
  setBButton,
  setSelectButton,
  setStartButton,
  setRightButton,
  setLeftButton,
  setUpButton,
  setDownButton,

  reset,
  read,
  write,
};

export default joypad;
