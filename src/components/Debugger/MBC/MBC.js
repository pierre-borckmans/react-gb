import React from 'react';
import './MBC.css';
import Container from '../../Shared/Container/Container';

const MBC = props => {
  const { mbc } = props;
  return (
    <Container title="MBC" width={240}>
      <div>
        Banking Mode:{' '}
        {mbc.getBankingMode() === mbc.ROM_MODE
          ? 'Simple ROM banking'
          : 'RAM / Advanced ROM banking'}
      </div>
      <div>ROM0 bank: {mbc.getRom0Bank()}</div>
      <div>ROM1 bank: {mbc.getRom1Bank()}</div>
      <div>
        External ram: {mbc.isExternalRamEnabled() ? 'ENABLED' : 'DISABLED'}
      </div>

      <div>RAM bank: {mbc.getRamBank()}</div>
    </Container>
  );
};

export default MBC;
