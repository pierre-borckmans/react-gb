import React, { Fragment } from 'react';

import './Cartridge.css';

const Cartridge = (props) => {
  const { cartridge } = props;
  return (
    <Fragment>
      <div className="cartridge">
        <div className="section">Cartridge</div>
        <div>Title: {cartridge.getTitle()}</div>
        <div>Type: {cartridge.getType()}</div>
        <div>Region: {cartridge.getRegion()}</div>
        <div>Color: {cartridge.getCGB() ? 'Yes' : 'No'}</div>
        <div>Super GameBoy: {cartridge.getSGB() ? 'Yes' : 'No'}</div>
        <div>ROM size: {cartridge.getROMSizeAndBanks()[0]} KBytes</div>
        <div>ROM banks: {cartridge.getROMSizeAndBanks()[1]} banks</div>
        <div>RAM size: {cartridge.getRAMSizeAndBanks()[0]} KBytes</div>
        <div>RAM banks: {cartridge.getRAMSizeAndBanks()[1]} banks</div>
      </div>
    </Fragment>
  );
};

export default Cartridge;
