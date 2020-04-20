import React, { Fragment } from 'react';

import classNames from 'classnames';

import './Joypad.css';

const Joypad = (props) => {
  const { joypad } = props;

  const getButton = (name, value) => (
    <div
      className={classNames('button', {
        button_pressed: value,
      })}
    >
      {name}
    </div>
  );
  return (
    <Fragment>
      <div className="joypad">
        <div className="section">
          <span>Buttons</span>
          {getButton('A', joypad.getAButton())}
          {getButton('B', joypad.getBButton())}

          {getButton('Start', joypad.getStartButton())}

          {getButton('Select', joypad.getSelectButton())}

          {getButton('Up', joypad.getUpButton())}
          {getButton('Down', joypad.getDownButton())}

          {getButton('Right', joypad.getRightButton())}

          {getButton('Left', joypad.getLeftButton())}
        </div>
      </div>
    </Fragment>
  );
};

export default Joypad;
