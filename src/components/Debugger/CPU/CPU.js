import React, { useState } from 'react';
import classNames from 'classnames';

import { format } from '../../../utils/utils';
import { getOpcodeLabels } from '../../../gameboy/cpu/opcodes/opcodesMap';

import './CPU.css';
import Container from '../../Shared/Container/Container';

const bases = ['hex', 'bin', 'dec'];

const CPU = props => {
  const [base, setBase] = useState(bases[0]);

  const handleClick = () => {
    setBase(bases[(bases.indexOf(base) + 1) % bases.length]);
  };

  const jumpToPC = () => {
    const address = prompt('Enter new PC address');
    if (!isNaN(parseInt(address))) {
      cpu.setPC(parseInt(address));
    }
    props.onDebuggerChange();
  };

  const skipBootRom = () => {
    cpu.skipBootRom();
    props.onDebuggerChange();
  };

  const cpu = props.cpu;
  const [
    opcodeLabel,
    opcodeLabelWithPartialValues,
    opcodeLabelWithValues,
  ] = getOpcodeLabels(base, cpu);
  return (
    <Container title="CPU" width={240}>
      <div className="cpu" onClick={handleClick}>
        <div className="subsection">Registers (8bit)</div>
        <div className="registers_pair">
          <div className="register_8bit">
            A={format(base, cpu.readReg8('A'))}
          </div>
          <div className="register_8bit">
            F={format(base, cpu.readReg8('F'))}
          </div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">
            B={format(base, cpu.readReg8('B'))}
          </div>
          <div className="register_8bit">
            C={format(base, cpu.readReg8('C'))}
          </div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">
            D={format(base, cpu.readReg8('D'))}
          </div>
          <div className="register_8bit">
            E={format(base, cpu.readReg8('E'))}
          </div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">
            H={format(base, cpu.readReg8('H'))}
          </div>
          <div className="register_8bit">
            L={format(base, cpu.readReg8('L'))}
          </div>
        </div>

        <div className="subsection">Flags</div>
        <div className="flags">
          {['Z', 'N', 'H', 'C'].map(flag => (
            <div
              key={flag}
              className={classNames('flag', {
                flag_active: cpu.getFlag(flag),
              })}
            >
              {flag}
            </div>
          ))}
        </div>

        <div className="subsection">Registers (16bit)</div>
        <div
          className="register_16bit"
          onContextMenu={e => {
            e.preventDefault();
            jumpToPC();
          }}
        >
          PC={format(base, cpu.getPC(), 16)}
        </div>
        <div className="register_16bit">SP={format(base, cpu.getSP(), 16)}</div>

        <div className="subsection">Interrupts</div>
        <div className="register_16bit">
          IME={cpu.getInterruptMasterEnable() ? 1 : 0}
        </div>

        <div className="subsection">Current opcode</div>
        <div className="operation_label">
          {opcodeLabel}
          <br />
          {opcodeLabelWithPartialValues}
          <br />
          {opcodeLabelWithValues}
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            skipBootRom();
          }}
        >
          Skip boot ROM
        </button>
        <div>HALTED: {cpu.getHalt() ? 'YES' : 'NO'}</div>
      </div>
    </Container>
  );
};

export default CPU;
