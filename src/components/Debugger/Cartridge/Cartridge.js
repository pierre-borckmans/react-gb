import React, { Fragment, useState } from 'react';

import './Cartridge.css';

const Cartridge = (props) => {
  const { cartridge } = props;

  const [selectedRom, setSelectedRom] = useState(null);

  const testRoms = cartridge.getTestRoms();

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

        <div className="subsection">
          <select
            defaultValue={null}
            onChange={(e) => setSelectedRom(e.target.value)}
          >
            <option disabled selected value>
              {' '}
              -- select a rom --{' '}
            </option>
            {testRoms.map((rom) => (
              <option value={rom} key={rom}>
                {rom}
              </option>
            ))}
          </select>
          <button
            disabled={!selectedRom}
            onClick={() => cartridge.loadROM(selectedRom)}
          >
            Load...
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Cartridge;
