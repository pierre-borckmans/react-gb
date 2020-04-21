import React, { Fragment } from 'react';

import './Interrupt.css';

const Interrupt = (props) => {
  const { interrupt } = props;
  return (
    <Fragment>
      <div className="interrupt">
        <div className="section">Interrupt</div>
      </div>
    </Fragment>
  );
};

export default Interrupt;
