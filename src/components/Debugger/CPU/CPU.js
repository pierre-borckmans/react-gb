import React, { Fragment } from 'react';
import classNames from 'classnames';

import { toHex } from '../../../utils/utils';
import './CPU.css';

const CPU = (props) => {
  const cpu = props.cpu;
  return (
    <Fragment>
      <div className="registers">
        <div className="registers_pair">
          <div className="register_8bit">A={toHex(cpu.readReg8('A'))}</div>
          <div className="register_8bit">F={toHex(cpu.readReg8('F'))}</div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">B={toHex(cpu.readReg8('B'))}</div>
          <div className="register_8bit">C={toHex(cpu.readReg8('C'))}</div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">D={toHex(cpu.readReg8('D'))}</div>
          <div className="register_8bit">E={toHex(cpu.readReg8('E'))}</div>
        </div>
        <div className="registers_pair">
          <div className="register_8bit">H={toHex(cpu.readReg8('H'))}</div>
          <div className="register_8bit">L={toHex(cpu.readReg8('L'))}</div>
        </div>
        <div className="flags">
          {['Z', 'N', 'H', 'C'].map((flag) => (
            <div
              key={flag}
              className={classNames('flag', { flag_active: cpu.getFlag(flag) })}
            >
              {flag}
            </div>
          ))}
        </div>
        <div className="register_16bit">PC={toHex(cpu.getPC(), 4)}</div>
        <div className="register_16bit">SP={toHex(cpu.getSP(), 4)}</div>
      </div>
    </Fragment>
  );
};

export default CPU;
