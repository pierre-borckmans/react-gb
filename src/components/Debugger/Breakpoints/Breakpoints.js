import React, { useState } from 'react';
import classNames from 'classnames';

import { format } from '../../../utils/utils';

import './Breakpoints.css';
import Container from '../../Shared/Container/Container';

const Breakpoints = props => {
  const [breakpointType, setBreakpointType] = useState('address');
  const [breakpointValue, setBreakpointValue] = useState('');

  const debugger_ = props.debugger_;
  const breakpoints = debugger_.getBreakpoints();

  const currentBreakpoint = debugger_.getCurrentBreakpoint();

  const removeAllBreakpoints = () => {
    debugger_.removeAllBreakpoints();
    props.onDebuggerChange();
  };

  const addBreakPoint = () => {
    debugger_.addBreakpoint({
      address: breakpointType === 'address' ? parseInt(breakpointValue) : null,
      opcode: breakpointType === 'opcode' ? parseInt(breakpointValue) : null,
      registers: breakpointType.startsWith('reg_')
        ? [
            {
              name: breakpointType.split('_')[1],
              value: parseInt(breakpointValue),
            },
          ]
        : [],
      flags: breakpointType.startsWith('flag_')
        ? [
            {
              name: breakpointType.split('_')[1],
              value: parseInt(breakpointValue),
            },
          ]
        : [],
      interrupts: breakpointType.startsWith('interrupt_')
        ? [
            {
              name: breakpointType.split('_')[1],
              value: parseInt(breakpointValue),
            },
          ]
        : [],
    });
    props.onDebuggerChange();
  };

  const getBreakpoint = bp => (
    <div
      key={bp.id}
      className={classNames(
        'breakpoint',
        { disabled: !bp.enabled },
        { highlighted: currentBreakpoint && bp.id === currentBreakpoint.id },
      )}
    >
      <button
        onClick={() => {
          debugger_.removeBreakpoint(bp.id);
          props.onDebuggerChange();
        }}
      >
        x
      </button>
      <button
        onClick={() => {
          debugger_.toggleBreakpoint(bp.id);
          props.onDebuggerChange();
        }}
      >
        toggle
      </button>
      <div className={classNames('breakpoint_details')}>
        {bp.address !== null ? (
          <div>Address:{format('hex', bp.address, 16)}</div>
        ) : null}
        {bp.opcode !== null ? (
          <div>Opcode:{format('hex', bp.opcode, 16)}</div>
        ) : null}
        {bp.registers.length ? (
          <div>
            Register [{bp.registers[0].name}]:
            {format(
              'hex',
              bp.registers[0].value,
              bp.registers[0].name.length === 1 ? 8 : 16,
            )}
          </div>
        ) : null}
        {bp.flags.length ? (
          <div>
            Flag [{bp.flags[0].name}]:{bp.flags[0].value}
          </div>
        ) : null}
        {bp.interrupts.length ? (
          <div>Interrupt [{bp.interrupts[0].name}]</div>
        ) : null}
      </div>
    </div>
  );

  return (
    <Container title="Breakpoints" width={478}>
      <div>
        <div>
          <select
            defaultValue={breakpointType}
            onChange={e => setBreakpointType(e.target.value)}
          >
            <option value="address">Address</option>
            <option value="opcode">Opcode</option>
            <option value="reg_AF">Register AF</option>
            <option value="reg_A">Register A</option>
            <option value="reg_F">Register F</option>
            <option value="reg_H">Register H</option>
            <option value="reg_L">Register L</option>
            <option value="reg_B">Register B</option>
            <option value="reg_C">Register C</option>
            <option value="reg_D">Register D</option>
            <option value="reg_E">Register E</option>
            <option value="flag_Z">Flag Z</option>
            <option value="flag_N">Flag N</option>
            <option value="flag_H">Flag H</option>
            <option value="flag_C">Flag C</option>
            <option value="interrupt_vblank">Interrupt VBlank</option>
            <option value="interrupt_lcdstat">Interrupt LCDStat</option>
            <option value="interrupt_timer">Interrupt Timer</option>
            <option value="interrupt_serial">Interrupt Serial</option>
            <option value="interrupt_joypad">Interrupt Joypad</option>
          </select>
          <input
            defaultValue=""
            onChange={e => setBreakpointValue(e.target.value)}
          />
        </div>
        <button onClick={addBreakPoint}>Add breakpoint</button>
        <button onClick={removeAllBreakpoints}>Remove all breakpoints</button>
      </div>
      {breakpoints.map(getBreakpoint)}
    </Container>
  );
};

export default Breakpoints;
