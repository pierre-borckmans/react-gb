import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

import { format } from '../../../utils/utils';
import { getOpcodeLabels } from '../../../gameboy/cpu/opcodes/opcodesMap';

import './CPU.css';

const CPU = (props) => {
  const [base, setBase] = useState('hex');

  const handleClick = () => {
    switch (base) {
      case 'hex':
        setBase('bin');
        break;
      case 'bin':
        setBase('dec');
        break;
      case 'dec':
        setBase('hex');
        break;
      default:
        break;
    }
  };

  const cpu = props.cpu;
  const [
    opcodeLabel,
    opcodeLabelWithPartialValues,
    opcodeLabelWithValues,
  ] = getOpcodeLabels(base, cpu);
  return (
    <Fragment>
      <div className="cpu">
        <div className="registers" onClick={handleClick}>
          <div className="section">
            Registers (8bit)
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
          </div>

          <div className="section">
            Flags
            <div className="flags">
              {['Z', 'N', 'H', 'C'].map((flag) => (
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
          </div>

          <div className="section">
            Registers (16bit)
            <div className="register_16bit">
              PC={format(base, cpu.getPC(), 16)}
            </div>
            <div className="register_16bit">
              SP={format(base, cpu.getSP(), 16)}
            </div>
          </div>

          <div className="section">
            Current opcode
            <div className="operation_label">
              {opcodeLabel}
              <br />
              {opcodeLabelWithPartialValues}
              <br />
              {opcodeLabelWithValues}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CPU;
