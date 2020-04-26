import React, { Fragment } from 'react';
import classNames from 'classnames';

import './Breakpoints.css';

const Breakpoints = (props) => {
  const debugger_ = props.debugger_;
  const breakpoints = debugger_.getBreakpoints();

  const getBreakpoint = (bp) => (
    <div key={bp.id} className="breakpoint">
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
      <span
        className={classNames('test', { disabled: !bp.enabled })}
      >{`${bp.id} ${bp.address}`}</span>
    </div>
  );

  return (
    <Fragment>
      <div className="section">Breakpoints</div>
      {breakpoints.map(getBreakpoint)}
    </Fragment>
  );
};

export default Breakpoints;
