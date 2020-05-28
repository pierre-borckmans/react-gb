import joypad from '../../gameboy/joypad/joypad';

let eventCallback = null;

const init = () => {
  requestAnimationFrame(refreshButtonsLoop);
};

const refreshButtonsLoop = () => {
  const gamepadDevice = navigator.getGamepads()[0];
  if (gamepadDevice) {
    joypad.setAButton(gamepadDevice.buttons[0].value);
    joypad.setBButton(gamepadDevice.buttons[2].value);
    joypad.setStartButton(gamepadDevice.buttons[9].value);
    joypad.setSelectButton(gamepadDevice.buttons[8].value);
    joypad.setUpButton(gamepadDevice.buttons[12].value);
    joypad.setDownButton(gamepadDevice.buttons[13].value);
    joypad.setRightButton(gamepadDevice.buttons[15].value);
    joypad.setLeftButton(gamepadDevice.buttons[14].value);
  }
  requestAnimationFrame(refreshButtonsLoop);
};

const gamepad = { init };

export default gamepad;
