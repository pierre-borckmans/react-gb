import React, { Fragment } from 'react';
import './MBC.css';

const MBC = (props) => {
  const { cartridge, mbc } = props;
  return (
    <div className="mbc">
      <div className="section">MBC</div>
      <div>Rom type: {mbc.getType()}</div>
      <div>ROM bank: {mbc.getRomBank()}</div>
      <div>Mode: {mbc.getMode() === mbc.ROM_MODE ? 'ROM' : 'RAM'}</div>
      <div>
        External ram: {mbc.isExternalRamEnabled() ? 'ENABLED' : 'DISABLED'}
      </div>
      <div>RAM bank: {mbc.getRamBank()}</div>
    </div>
  );
};

export default MBC;
