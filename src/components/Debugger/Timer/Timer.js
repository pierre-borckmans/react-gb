import React, { Fragment } from 'react';

import './Timer.css';

const Timer = (props) => {
  const { timer } = props;
  return (
    <Fragment>
      <div className="timer">
        <div className="section">Timer</div>
      </div>
    </Fragment>
  );
};

export default Timer;
