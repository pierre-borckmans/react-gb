import React, { Fragment } from 'react';

import './Timer.css';

const Timer = (props) => {
  const { timer } = props;
  return (
    <Fragment>
      <div className="timer">
        <div className="section">
          <span>Timer</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Timer;
