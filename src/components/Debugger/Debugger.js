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
      const newCPU = cpu.step();
      setCPU({ ...newCPU, /* hack to get a new object */ x: 0 });
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
