import React from 'react';

import './Interrupt.css';
import Container from '../../Shared/Container/Container';

const Interrupt = props => {
  const { interrupts } = props;
  return (
    <Container title="Interrupts" width={200}>
      <div className="subsection">Interrupt enable</div>
      <div>VBlank: {interrupts.getVBlankInterruptEnable()}</div>
      <div>LCDStat: {interrupts.getLCDStatInterruptEnable()}</div>
      <div>Timer: {interrupts.getTimerInterruptEnable()}</div>
      <div>Serial: {interrupts.getSerialInterruptEnable()}</div>
      <div>Joypad: {interrupts.getJoypadInterruptEnable()}</div>
      <div className="subsection">Interrupt flags</div>
      <div>VBlank: {interrupts.getVBlankInterruptFlag()}</div>
      <div>LCDStat: {interrupts.getLCDStatInterruptFlag()}</div>
      <div>Timer: {interrupts.getTimerInterruptFlag()}</div>
      <div>Serial: {interrupts.getSerialInterruptFlag()}</div>
      <div>Joypad: {interrupts.getJoypadInterruptFlag()}</div>
    </Container>
  );
};

export default Interrupt;
