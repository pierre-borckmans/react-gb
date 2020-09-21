import React from 'react';
import './MBC.css';
import Container from '../../Shared/Container/Container';

const MBC = props => {
  const { mbc } = props;
  return (
    <Container title="MBC" width={240}>
      <div>Rom type: {mbc.getType()}</div>
      <div
        onClick={() => {
          mbc.setRomBank(prompt('ROM bank'));
        }}
      >
        ROM bank: {mbc.getRomBank()}
      </div>
      <div>Mode: {mbc.getMode() === mbc.ROM_MODE ? 'ROM' : 'RAM'}</div>
      <div>
        External ram: {mbc.isExternalRamEnabled() ? 'ENABLED' : 'DISABLED'}
      </div>

      <div>RAM bank: {mbc.getRamBank()}</div>
    </Container>
  );
};

export default MBC;
