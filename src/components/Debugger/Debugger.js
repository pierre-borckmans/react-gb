import React, { Fragment, useEffect, useState } from 'react';

import MMU from './MMU/MMU';
import CPU from './CPU/CPU';
import PPU from './PPU/PPU';
import Cartridge from './Cartridge/Cartridge';
import Joypad from './Joypad/Joypad';

import dbg from '../../gameboy/debugger/debugger';
import './Debugger.css';

const Debugger = (props) => {
  const gameboy = props.gameboy;
  const [debugger_, setDebugger] = useState(dbg);
  const [stepsPerSecond, setStepsPerSecond] = useState(0);
  const [cpu, setCPU] = useState(gameboy.getCpu());
  const mmu = gameboy.getMmu();
  const ppu = gameboy.getPpu();

  const handleCPUChange = () => {
    setCPU({ ...cpu });
    setStepsPerSecond(debugger_.getStepsPerSecond());
  };

  const handleDebuggerChange = () => setDebugger({ ...debugger_ });

  const removeAllBreakBoints = () => {
    debugger_.removeAllBreakpoints();
    setDebugger({ ...debugger_ });
  };

  const run = () => {
    debugger_.run(handleCPUChange);
  };

  const pause = () => {
    debugger_.pause();
    setCPU({ ...cpu });
  };

  const step = () => {
    debugger_.step(handleCPUChange);
  };

  const reset = () => {
    debugger_.reset();
    handleCPUChange();
  };

  const keyListener = (event) => {
    document.activeElement.blur();
    if (event.code === 'Space') {
      if (!debugger_.isRunning()) {
        debugger_.run(handleCPUChange);
      } else {
        debugger_.pause();
      }
      return;
    }

    if (event.code === 'Enter') {
      step();
    }

    if (event.code === 'Backspace') {
      reset();
    }
  };

  const loadROM = async () => {
    await gameboy.getCartridge().loadROM();
    handleDebuggerChange();
  };

  useEffect(() => {
    document.addEventListener('keydown', keyListener, false);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  });

  return (
    <Fragment>
      <div className="debugger">
        <div className="debugger_controls">
          <button onClick={run}>Run</button>
          <button onClick={pause}>Pause</button>
          <button onClick={step}>Step</button>
          <div className="spacer" />
          <button onClick={reset}>Reset</button>
          <button onClick={removeAllBreakBoints}>Remove all breakpoints</button>
          <div className="spacer" />
          <span className="steps_per_second">{`${cpu.getCycles()} cycles`}</span>
          <div className="spacer" />
          <span className="steps_per_second">{`${stepsPerSecond.toFixed(
            2
          )} ops/s`}</span>
          <div className="spacer" />
          <button onClick={loadROM}>Load rom</button>
        </div>
        <div className="debugger_row">
          <MMU
            debugger_={debugger_}
            cpu={cpu}
            mmu={mmu}
            onCPUChange={handleCPUChange}
            onDebuggerChange={handleDebuggerChange}
          />
          <CPU
            cpu={cpu}
            onCPUChange={handleCPUChange}
            onDebuggerChange={handleDebuggerChange}
          />
          <PPU
            config={gameboy.getConfig()}
            ppu={ppu}
            onDebuggerChange={handleDebuggerChange}
          />
          <Cartridge cartridge={gameboy.getCartridge()} />
          <Joypad joypad={gameboy.getJoypad()} />
        </div>
      </div>
      SPACE=Run until next breakpoint, ENTER=Step
    </Fragment>
  );
};

export default Debugger;
