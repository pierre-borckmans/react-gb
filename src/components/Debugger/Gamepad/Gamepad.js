import React, { useEffect, useState } from 'react';

import './Gamepad.css';

const Gamepad = (props) => {
  const [gamepadButtons, setGamepadButtons] = useState({
    A: 0,
    B: 0,
    Start: 0,
    Select: 0,
    Up: 0,
    Down: 0,
    Right: 0,
    Left: 0,
  });

  useEffect(() => {
    const refreshButtonsLoop = () => {
      const gp = navigator.getGamepads()[0];
      gp &&
        setGamepadButtons({
          A: gp.buttons[0].value,
          B: gp.buttons[2].value,
          Start: gp.buttons[9].value,
          Select: gp.buttons[8].value,
          Up: gp.buttons[12].value,
          Down: gp.buttons[13].value,
          Right: gp.buttons[15].value,
          Left: gp.buttons[14].value,
        });
      requestAnimationFrame(refreshButtonsLoop);
    };
    refreshButtonsLoop();
  }, []);

  return (
    <div className="gamepad">
      <div className="section">Gamepad</div>
      {Object.keys(gamepadButtons).map((b) => (
        <div key={b}>{`${b}: ${gamepadButtons[b]}`}</div>
      ))}
    </div>
  );
};

export default Gamepad;
