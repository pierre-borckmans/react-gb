import React, { Fragment } from 'react';

import './Serial.css';

const Serial = (props) => {
  const { serial } = props;
  return (
    <Fragment>
      <div className="serial">
        <div className="section">
          <span>Serial</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Serial;
