import React, { Fragment } from 'react';

import './Serial.css';

const Serial = (props) => {
  const { serial } = props;
  return (
    <Fragment>
      <div className="serial">
        <div className="section">Serial</div>
      </div>
    </Fragment>
  );
};

export default Serial;