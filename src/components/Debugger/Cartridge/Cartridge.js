import React, { Fragment } from 'react';

import './Cartridge.css';

const Cartridge = (props) => {
  const { cartridge } = props;
  return (
    <Fragment>
      <div className="cartridge">
        <div className="section">
          <span>Cartridge</span>
          <div>Title: {cartridge.getTitle()}</div>
          <div>Manufacturer: {cartridge.getManufacturer()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cartridge;
