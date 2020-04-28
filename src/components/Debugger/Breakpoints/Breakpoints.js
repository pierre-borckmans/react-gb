import React, { Fragment } from 'react';
import classNames from 'classnames';

import { format } from '../../../utils/utils';

import './Breakpoints.css';

const Breakpoints = (props) => {
  const debugger_ = props.debugger_;
  const breakpoints = debugger_.getBreakpoints();

  const currentBreakpoint = debugger_.getCurrentBreakpoint();

  const getBreakpoint = (bp) => (
    <div
      key={bp.id}
      className={classNames(
        'breakpoint',
        { disabled: !bp.enabled },
        { highlighted: currentBreakpoint && bp.id === currentBreakpoint.id }
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
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="breakpoints">
        <div className="section">Breakpoints</div>
        {breakpoints.map(getBreakpoint)}
        <div>
          <button>Add breakpoint</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Breakpoints;
