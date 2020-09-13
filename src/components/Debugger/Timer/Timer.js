import React from 'react';

import './Timer.css';
import Container from '../../Shared/Container/Container';

const Timer = props => {
  const { timer } = props;
  return (
    <Container title="Timer">
      <div>DIV: {timer.getDIV()}</div>
      <div>TIMA: {timer.getTIMA()}</div>
      <div>TMA: {timer.getTMA()}</div>
      <div>TAC: {timer.getTAC()}</div>
    </Container>
  );
};

export default Timer;
