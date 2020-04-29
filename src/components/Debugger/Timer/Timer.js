import React, { Fragment } from 'react';

import './Timer.css';

const Timer = (props) => {
  const { timer } = props;
  return (
    <Fragment>
      <div className="timer">
        <div className="section">Timer</div>
        <div>DIV: {timer.getDIV()}</div>
        <div>TIMA: {timer.getTIMA()}</div>
        <div>TMA: {timer.getTMA()}</div>
        <div>TAC: {timer.getTAC()}</div>
      </div>
    </Fragment>
  );
};

export default Timer;
