import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import { toHex } from '../../../utils/utils';

import { chunk, find, range } from 'lodash';

import './MMU.css';

const MMU = (props) => {
  const cpu = props.cpu;
  const mmu = props.mmu;
  const debugger_ = props.debugger_;
  const PC = cpu.getPC();
  const selectedAddress = PC;
  const [selectedPage, setSelectedPage] = useState(0);
  const breakpoints = debugger_.getBreakpoints();

  const nextPage = () => {
    setSelectedPage(Math.min(0xff, selectedPage + 1));
  };

  const previousPage = () => {
    setSelectedPage(Math.max(0, selectedPage - 1));
  };

  const jumpToAddressPage = () => {
    const address = parseInt(prompt('Enter address to jump to:'));
    if (address >= 0 && address <= 0xffff) {
      setSelectedPage(Math.floor(address / 256));
    }
  };

  const keyListener = (event) => {
    document.activeElement.blur();
    if (event.code === 'ArrowRight') {
      nextPage();
    }
    if (event.code === 'ArrowLeft') {
      previousPage();
    }
    if (event.code === 'Home') {
      setSelectedPage(0);
    }
    if (event.code === 'End') {
      setSelectedPage(0xff);
    }
    if (event.code === 'KeyJ') {
      jumpToAddressPage();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyListener, false);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  });

  const goTo = (target) => {
    switch (target) {
      case 'PC':
        setSelectedPage(Math.floor(PC / 256));
        break;
      default:
        setSelectedPage(Math.floor(mmu[`START_${target}`] / 256));
    }
  };

  const toggleBreakpoint = (address) => {
    if (find(breakpoints, (bp) => bp.address === address)) {
      debugger_.removeBreakpoint(address);
    } else {
      debugger_.setBreakpoint(address);
    }
    props.onDebuggerChange();
  };

  // const page = Math.floor(selectedAddress / 256);
  const memoryPage = mmu.getMemoryPage(selectedPage);
  const memoryRows = chunk(memoryPage.slice(0, 256), 16);

  return (
    <Fragment>
      <div className="mmu">
        <div className="table">
          <div className="table_header">
            <div className={classNames('row_offset', 'page_count')}>
              <span className="page_arrow" onClick={previousPage}>
                ←
              </span>
              {`Page ${selectedPage}/255`}
              <span className="page_arrow" onClick={nextPage}>
                →
              </span>
            </div>
            <div className="table_header_bytes">
              {range(0, 16).map((index) => {
                const selected = index === selectedAddress % 16;
                return (
                  <div
                    key={index}
                    className={classNames('table_header_item', {
                      table_header_item_selected: selected,
                    })}
                  >
                    {toHex(index)}
                  </div>
                );
              })}
            </div>
            <div className="row_ascii"></div>
          </div>
          {memoryRows.map((row, rowIndex) => {
            const rowSelected =
              selectedPage * 16 + rowIndex === Math.floor(selectedAddress / 16);
            const offset = selectedPage * 256 + rowIndex * 16;
            const memoryType = mmu.getMemoryType(offset);
            return (
              <div key={rowIndex} className="row">
                <div
                  className={classNames('row_offset', {
                    row_offset_selected: rowSelected,
                  })}
                >
                  {`${memoryType}:${toHex(offset, 4)}`}
                </div>

                <div className="row_bytes">
                  {row.map((byte, colIndex) => {
                    const indexInPage = rowIndex * 16 + colIndex;
                    const byteAddress = selectedPage * 256 + indexInPage;
                    const selected = byteAddress === selectedAddress;
                    const isBreakpoint = breakpoints
                      .map((bp) => bp.address)
                      .includes(byteAddress);
                    return (
                      <div
                        key={indexInPage}
                        onClick={() => toggleBreakpoint(byteAddress)}
                        className={classNames('byte', {
                          byte_selected: selected,
                          byte_breakpoint: isBreakpoint,
                        })}
                      >
                        {toHex(byte)}
                      </div>
                    );
                  })}
                </div>

                <div className="row_ascii">
                  {row.map((byte, colIndex) => {
                    const index = rowIndex * 16 + colIndex;
                    const selected =
                      selectedPage * 256 + index === selectedAddress;
                    const char = String.fromCharCode(byte % 128);
                    const newChar =
                      byte % 128 > 32 && byte % 128 < 127 ? char : '.';
                    return (
                      <div
                        key={colIndex}
                        className={classNames('ascii', {
                          ascii_selected: selected,
                        })}
                      >
                        {newChar}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="shortcuts">
          <button onClick={() => goTo('PC')}>PC</button>
          <button onClick={jumpToAddressPage}>Go to...</button>
          <button onClick={() => goTo('ROM0')}>ROM 0</button>
          <button onClick={() => goTo('ROM1')}>ROM 1</button>
          <button onClick={() => goTo('VIDEO_RAM')}>VIDEO RAM</button>
          <button onClick={() => goTo('EXTERNAL_RAM')}>EXTERNAL RAM</button>
          <button onClick={() => goTo('WORK_RAM')}>WORK RAM</button>
          <button onClick={() => goTo('ECHO_RAM')}>ECHO RAM</button>
          <button onClick={() => goTo('OAM')}>OAM</button>
          <button onClick={() => goTo('IO_MAPPING')}>I/O</button>
          <button onClick={() => goTo('HIGH_RAM')}>HIGH RAM</button>
        </div>
      </div>
    </Fragment>
  );
};

export default MMU;
