import React, { Fragment } from 'react';

import './Cartridge.css';

const Cartridge = (props) => {
  const { cartridge } = props;
  return (
    <Fragment>
      <div className="cartridge">
        <div>Title: {cartridge.getTitle()}</div>
        <div>Manufacturer: {cartridge.getManufacturer()}</div>
      </div>
    </Fragment>
  );
};

export default Cartridge;
