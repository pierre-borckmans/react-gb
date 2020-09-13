import React from 'react';

import classNames from 'classnames';

import './Joypad.css';
import Container from '../../Shared/Container/Container';

const Joypad = props => {
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
    <Container title="Joypad" width={200}>
      {getButton('A', joypad.getAButton())}
      {getButton('B', joypad.getBButton())}
      {getButton('Start', joypad.getStartButton())}
      {getButton('Select', joypad.getSelectButton())}
      {getButton('Up', joypad.getUpButton())}
      {getButton('Down', joypad.getDownButton())}
      {getButton('Right', joypad.getRightButton())}
      {getButton('Left', joypad.getLeftButton())}
    </Container>
  );
};

export default Joypad;
