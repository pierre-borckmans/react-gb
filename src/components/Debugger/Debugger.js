import React, { Fragment, useEffect, useState } from 'react';

import Breakpoints from './Breakpoints/Breakpoints';

import APU from './APU/APU';
import Cartridge from './Cartridge/Cartridge';
import CPU from './CPU/CPU';
import Interrupt from './Interrupt/Interrupt';
import Joypad from './Joypad/Joypad';
import MMU from './MMU/MMU';
import PPU from './PPU/PPU';
import Tiles from './PPU/Tiles/Tiles';
import Serial from './Serial/Serial';
import Timer from './Timer/Timer';

import Gamepad from './Gamepad/Gamepad';

import dbg from '../../gameboy/debugger/debugger';
import './Debugger.css';

const Debugger = (props) => {
  const gameboy = props.gameboy;

  const [debugger_, setDebugger] = useState(dbg);
  const [stepsPerSecond, setStepsPerSecond] = useState(0);
  const [cyclesPerSecond, setCyclesPerSecond] = useState(0);

  const config = gameboy.getConfig();

  const apu = gameboy.getApu();
  const cartridge = gameboy.getCartridge();
  const [cpu, setCPU] = useState(gameboy.getCpu());
  const interrupt = gameboy.getInterruptController();
  const joypad = gameboy.getJoypad();
  const mmu = gameboy.getMmu();
  const ppu = gameboy.getPpu();
  const serial = gameboy.getSerial();
  const timer = gameboy.getTimer();

  const handleCPUChange = () => {
    setCPU({ ...cpu });
    setStepsPerSecond(debugger_.getStepsPerSecond());
    setCyclesPerSecond(debugger_.getCyclesPerSecond());
  };

  const handleDebuggerChange = () => setDebugger({ ...debugger_ });

  const removeAllBreakBoints = () => {
    debugger_.removeAllBreakpoints();
    setDebugger({ ...debugger_ });
  };

  const run = () => {
    debugger_.run(25, handleCPUChange);
  };

  const pause = () => {
    debugger_.pause(handleCPUChange);
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
        run();
      } else {
        pause();
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
    await cartridge.loadROM();
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
          <button onClick={loadROM}>Load rom</button>
          <div className="spacer" />
          <button onClick={run}>Run</button>
          <button onClick={pause}>Pause</button>
          <button onClick={step}>Step</button>
          <div className="spacer" />
          <button onClick={reset}>Reset</button>
          <button onClick={removeAllBreakBoints}>Remove all breakpoints</button>
          <div className="spacer" />
          <span className="steps_per_second">{`${cpu.getCycles()} cycles`}</span>
          <div className="spacer" />
          <span className="steps_per_second">{`${debugger_.getTotalSteps()} ops`}</span>
          <div className="spacer" />
          <span className="steps_per_second">{`${stepsPerSecond.toFixed(
            0
          )} ops/s`}</span>
          <div className="spacer" />
          <span className="steps_per_second">{`${cyclesPerSecond.toFixed(
            0
          )} cycles/s`}</span>
          <div className="spacer" />
          <span className="steps_per_second">{`${(
            cyclesPerSecond / 17556
          ).toFixed(2)} frames/s`}</span>
        </div>
        <div className="debugger_row">
          <div>
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
            </div>
            <div className="debugger_row">
              <Breakpoints
                debugger_={debugger_}
                onDebuggerChange={handleDebuggerChange}
              />
              <Cartridge cartridge={cartridge} />
            </div>
          </div>
          <div>
            <PPU
              config={config}
              ppu={ppu}
              onDebuggerChange={handleDebuggerChange}
            />
            <Tiles config={config} ppu={ppu} />
          </div>
          <APU apu={apu} />
          <Joypad joypad={joypad} />
          <Interrupt interrupt={interrupt} />
          <Serial serial={serial} />
          <Timer timer={timer} />
          <Gamepad />
        </div>
      </div>
      SPACE=Run until next breakpoint, ENTER=Step
    </Fragment>
  );
};

export default Debugger;
