import joypad from '../../gameboy/joypad/joypad';

let eventCallback = null;

const init = () => {
  document.addEventListener('keydown', keyDownListener, false);
  document.addEventListener('keyup', keyUpListener, false);
};

const keyDownListener = event => {
  if (event.code === 'KeyA') {
    joypad.setLeftButton(true);
  }
  if (event.code === 'KeyS') {
    joypad.setDownButton(true);
  }
  if (event.code === 'KeyD') {
    joypad.setRightButton(true);
  }
  if (event.code === 'KeyW') {
    joypad.setUpButton(true);
  }
  if (event.code === 'KeyH') {
    joypad.setSelectButton(true);
  }
  if (event.code === 'KeyJ') {
    joypad.setStartButton(true);
  }
  if (event.code === 'KeyK') {
    joypad.setBButton(true);
  }
  if (event.code === 'KeyL') {
    joypad.setAButton(true);
  }
  eventCallback && eventCallback();
};

const keyUpListener = event => {
  if (event.code === 'KeyA') {
    joypad.setLeftButton(false);
  }
  if (event.code === 'KeyS') {
    joypad.setDownButton(false);
  }
  if (event.code === 'KeyD') {
    joypad.setRightButton(false);
  }
  if (event.code === 'KeyW') {
    joypad.setUpButton(false);
  }
  if (event.code === 'KeyH') {
    joypad.setSelectButton(false);
  }
  if (event.code === 'KeyJ') {
    joypad.setStartButton(false);
  }
  if (event.code === 'KeyK') {
    joypad.setBButton(false);
  }
  if (event.code === 'KeyL') {
    joypad.setAButton(false);
  }
  eventCallback && eventCallback();
};

const onKeyEvent = callback => (eventCallback = callback);

const keyboard = { init, onKeyEvent };

export default keyboard;
