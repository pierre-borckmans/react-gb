import React, { useEffect, useState } from 'react';

import Container from '../../Shared/Container/Container';

import './Cartridge.css';

const Cartridge = (props) => {
  const { cartridge } = props;

  const [selectedRom, setSelectedRom] = useState(null);

  const testRoms = cartridge.getTestRoms();

  const loadSelectedRom = async () => {
    await cartridge.loadROM(selectedRom);
    props.onDebuggerChange();
  };

  const keyListener = (event) => {
    if (event.code === 'KeyR') {
      loadSelectedRom();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyListener);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, [selectedRom]);

  return (
    <Container title="Cartridge" width={240}>
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
          defaultValue="placeholder"
          onChange={(e) => setSelectedRom(e.target.value)}
        >
          <option disabled value="placeholder">
            -- select a rom --
          </option>
          {testRoms.map((rom) => (
            <option value={rom} key={rom}>
              {rom}
            </option>
          ))}
        </select>
        <button disabled={!selectedRom} onClick={loadSelectedRom}>
          Load...
        </button>
      </div>
    </Container>
  );
};

export default Cartridge;
