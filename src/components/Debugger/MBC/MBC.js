import React, { Fragment } from 'react';
import './MBC.css';

const MBC = (props) => {
  const { cartridge, mbc } = props;
  return (
    <div className="mbc">
      <div className="section">MBC</div>
      <div>Rom bank: {mbc.getRomBank()}</div>
    </div>
  );
};

export default MBC;
