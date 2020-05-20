import React, { Fragment, useEffect, useState } from 'react';

import Breakpoints from './Breakpoints/Breakpoints';

import APU from './APU/APU';
import Cartridge from './Cartridge/Cartridge';
import MBC from './MBC/MBC';
import CPU from './CPU/CPU';
import Interrupt from './Interrupt/Interrupt';
import Joypad from './Joypad/Joypad';
import MMU from './MMU/MMU';
import PPU from './PPU/PPU';
import Tiles from './PPU/Tiles/Tiles';
import Background from './PPU/Background/Background';
import Serial from './Serial/Serial';
import Timer from './Timer/Timer';

import Gamepad from './Gamepad/Gamepad';

import dbg from '../../gameboy/debugger/debugger';
import './Debugger.css';
import Container from '../Shared/Container/Container';
import LCD from './LCD/LCD';

const Debugger = (props) => {
  const gameboy = props.gameboy;

  const [debugger_, setDebugger] = useState(dbg);
  const isRunning = debugger_.isRunning();
  const [stepsPerSecond, setStepsPerSecond] = useState(0);
  const [cyclesPerSecond, setCyclesPerSecond] = useState(0);

  const config = gameboy.getConfig();

  const apu = gameboy.getApu();
  const cartridge = gameboy.getCartridge();
  const mbc = gameboy.getMBC();
  const [cpu, setCPU] = useState(gameboy.getCpu());
  const interrupts = gameboy.getInterrupts();
  const joypad = gameboy.getJoypad();
  const mmu = gameboy.getMmu();
  const ppu = gameboy.getPpu();
  const serial = gameboy.getSerial();
  const timer = gameboy.getTimer();

  useEffect(() => {
    // gameboy.getKeyboard().onKeyEvent(handleDebuggerChange);
  }, []);

  const handleCPUChange = () => {
    setCPU({ ...cpu });
    setStepsPerSecond(debugger_.getStepsPerSecond());
    setCyclesPerSecond(debugger_.getMachineCyclesPerSecond());
  };

  const handleDebuggerChange = () => setDebugger({ ...debugger_ });

  const run = () => {
    debugger_.run((frames) => {
      if (frames % 30 === 0 || !debugger_.isRunning()) {
        handleCPUChange();
      }
    });
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
    if (event.code === 'Space') {
      document.activeElement.blur();
      if (!debugger_.isRunning()) {
        run();
      } else {
        pause();
      }
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    if (event.code === 'Enter') {
      document.activeElement.blur();
      step();
    }

    if (event.code === 'Backspace') {
      document.activeElement.blur();
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
  }, [isRunning]);

  return (
    <Fragment>
      <div className="debugger">
        <div className="debugger_controls">
          <button onClick={loadROM}>Load rom</button>
          <div className="spacer" />
          <button onClick={isRunning ? pause : run} style={{ width: 50 }}>
            {isRunning ? 'Pause' : 'Run'}
          </button>
          <button onClick={step} disabled={isRunning}>
            Step
          </button>
          <div className="spacer" />
          <button onClick={reset}>Reset</button>
          <div className="spacer" />
          <span className="steps_per_second">{`${cpu.getMachineCycles()} cycles`}</span>
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
        <Breakpoints
          debugger_={debugger_}
          onDebuggerChange={handleDebuggerChange}
        />
        <Cartridge
          cartridge={cartridge}
          onDebuggerChange={handleDebuggerChange}
        />
        <MBC
          cartridge={cartridge}
          mbc={mbc}
          onDebuggerChange={handleDebuggerChange}
        />
        <div className="debugger_row">
          <LCD config={config} ppu={ppu} />
          <Background config={config} ppu={ppu} />
          <PPU
            config={config}
            ppu={ppu}
            onDebuggerChange={handleDebuggerChange}
          />
          <Tiles config={config} ppu={ppu} />
        </div>
        <APU apu={apu} />
        <Joypad debugger_={debugger_} joypad={joypad} />
        <Interrupt interrupts={interrupts} />
        <Serial serial={serial} />
        <Timer timer={timer} />
        <Gamepad />
      </div>
      SPACE=Run until next breakpoint, ENTER=Step
    </Fragment>
  );
};

export default Debugger;
