import React, { Fragment } from 'react';

import './APU.css';

const APU = (props) => {
  const { apu } = props;
  return (
    <Fragment>
      <div className="apu">
        <div className="section">
          <span>APU</span>
        </div>
      </div>
    </Fragment>
  );
};

export default APU;
