import React, { Fragment, useEffect, useState } from 'react';

import Memory from './Memory/Memory';
import CPU from './CPU/CPU';

import './Debugger.css';

const Debugger = (props) => {
  const gameboy = props.gameboy;
  const [cpu, setCPU] = useState(gameboy.getCpu());
  const mmu = gameboy.getMmu();

  const keyListener = (event) => {
    if (event.code === 'Space') {
      cpu.step();
      setCPU({ ...cpu });
    }
    if (event.code === 'PageDown') {
      cpu.incPC(256);
      setCPU({ ...cpu });
    }
    if (event.code === 'PageUp') {
      cpu.decPC(256);
      setCPU({ ...cpu });
    }
    if (event.code === 'Home') {
      cpu.setPC(0);
      setCPU({ ...cpu });
    }
    if (event.code === 'End') {
      cpu.setPC(0xffff);
      setCPU({ ...cpu });
    }
    if (event.code === 'ArrowDown') {
      cpu.incPC(16);
      setCPU({ ...cpu });
    }
    if (event.code === 'ArrowUp') {
      cpu.decPC(16);
      setCPU({ ...cpu });
    }
    if (event.code === 'ArrowRight') {
      cpu.incPC(1);
      setCPU({ ...cpu });
    }
    if (event.code === 'ArrowLeft') {
      cpu.decPC(1);
      setCPU({ ...cpu });
    }
    if (event.code === 'Enter') {
      cpu.debugAllOpcodes();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyListener, false);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  });

  return (
    <Fragment>
      {cpu ? (
        <div className="debugger">
          <Memory cpu={cpu} mmu={mmu}></Memory>
          <CPU cpu={cpu}></CPU>
        </div>
      ) : null}
      SPACE=step, ENTER=test all opcodes
    </Fragment>
  );
};

export default Debugger;
