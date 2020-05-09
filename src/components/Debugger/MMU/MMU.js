import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';

import { getOpcodeLabel } from '../../../gameboy/cpu/opcodes/opcodesMap';

import { toHex, format } from '../../../utils/utils';

import { chunk, find, range } from 'lodash';

import './MMU.css';

const labels = [
  { address: 0x0000, label: 'RST00', color: 'rgb(180,180,180)' },
  { address: 0x0008, label: 'RST08', color: 'rgb(180,180,180)' },
  { address: 0x0010, label: 'RST10', color: 'rgb(180,180,180)' },
  { address: 0x0018, label: 'RST08', color: 'rgb(180,180,180)' },
  { address: 0x0020, label: 'RST20', color: 'rgb(180,180,180)' },
  { address: 0x0028, label: 'RST28', color: 'rgb(180,180,180)' },
  { address: 0x0030, label: 'RST30', color: 'rgb(180,180,180)' },
  { address: 0x0038, label: 'RST38', color: 'rgb(180,180,180)' },
  { address: 0x0040, label: 'RST40', color: 'rgb(180,180,180)' },
  { address: 0x0048, label: 'RST48', color: 'rgb(180,180,180)' },
  { address: 0x0050, label: 'RST50', color: 'rgb(180,180,180)' },
  { address: 0x0058, label: 'RST58', color: 'rgb(180,180,180)' },
  { address: 0x0060, label: 'RST60', color: 'rgb(180,180,180)' },
  { address: [0x0104, 0x133], label: 'LOGO', color: 'rgb(255, 80, 80)' },
  { address: [0x0134, 0x142], label: 'TITLE', color: 'rgb(255, 80, 80)' },
  { address: 0x0143, label: 'CGB', color: 'rgb(255, 80, 80)' },
  { address: [0x0144, 0x145], label: 'LIC', color: 'rgb(255, 80, 80)' },
  { address: 0x0146, label: 'SGB', color: 'rgb(255, 80, 80)' },
  { address: 0x0147, label: 'TYPE', color: 'rgb(255, 80, 80)' },
  { address: 0x0148, label: 'ROM', color: 'rgb(255, 80, 80)' },
  { address: 0x0149, label: 'RAM', color: 'rgb(255, 80, 80)' },
  { address: 0x014a, label: 'DEST', color: 'rgb(255, 80, 80)' },
  { address: 0x014b, label: 'LIC', color: 'rgb(255, 80, 80)' },
  { address: 0x014c, label: 'MASK', color: 'rgb(255, 80, 80)' },
  { address: 0x014d, label: 'COMP', color: 'rgb(255, 80, 80)' },
  { address: [0x014e, 0x014f], label: 'CHKS', color: 'rgb(255, 80, 80)' },
  { address: 0xff00, label: 'P1', color: 'rgb(155,255,65)' },
  { address: 0xff01, label: 'SB', color: 'rgb(255,165,45)' },
  { address: 0xff02, label: 'SC', color: 'rgb(255,165,45)' },
  { address: 0xff04, label: 'DIV', color: 'rgb(255,85,80)' },
  { address: 0xff05, label: 'TIM', color: 'rgb(255,85,80)' },
  { address: 0xff06, label: 'TMA', color: 'rgb(255,85,80)' },
  { address: 0xff07, label: 'TAC', color: 'rgb(255,85,80)' },
  { address: 0xff10, label: 'NR10', color: 'rgb(205, 100, 155)' },
  { address: 0xff11, label: 'NR11', color: 'rgb(205, 100, 155)' },
  { address: 0xff12, label: 'NR12', color: 'rgb(205, 100, 155)' },
  { address: 0xff13, label: 'NR13', color: 'rgb(205, 100, 155)' },
  { address: 0xff14, label: 'NR14', color: 'rgb(205, 100, 155)' },
  { address: 0xff16, label: 'NR21', color: 'rgb(205, 100, 155)' },
  { address: 0xff17, label: 'NR22', color: 'rgb(205, 100, 155)' },
  { address: 0xff18, label: 'NR23', color: 'rgb(205, 100, 155)' },
  { address: 0xff19, label: 'NR24', color: 'rgb(205, 100, 155)' },
  { address: 0xff1a, label: 'NR30', color: 'rgb(205, 100, 155)' },
  { address: 0xff1b, label: 'NR31', color: 'rgb(205, 100, 155)' },
  { address: 0xff1c, label: 'NR32', color: 'rgb(205, 100, 155)' },
  { address: 0xff1d, label: 'NR33', color: 'rgb(205, 100, 155)' },
  { address: 0xff1e, label: 'NR34', color: 'rgb(205, 100, 155)' },
  { address: 0xff20, label: 'NR41', color: 'rgb(205, 100, 155)' },
  { address: 0xff21, label: 'NR42', color: 'rgb(205, 100, 155)' },
  { address: 0xff22, label: 'NR43', color: 'rgb(205, 100, 155)' },
  { address: 0xff23, label: 'NR44', color: 'rgb(205, 100, 155)' },
  { address: 0xff24, label: 'NR50', color: 'rgb(205, 100, 155)' },
  { address: 0xff25, label: 'NR51', color: 'rgb(205, 100, 155)' },
  { address: 0xff26, label: 'NR52', color: 'rgb(205, 100, 155)' },
  { address: 0xff30, label: 'W0', color: 'rgb(205, 100, 155)' },
  { address: 0xff31, label: 'W1', color: 'rgb(205, 100, 155)' },
  { address: 0xff32, label: 'W2', color: 'rgb(205, 100, 155)' },
  { address: 0xff33, label: 'W3', color: 'rgb(205, 100, 155)' },
  { address: 0xff34, label: 'W4', color: 'rgb(205, 100, 155)' },
  { address: 0xff35, label: 'W5', color: 'rgb(205, 100, 155)' },
  { address: 0xff36, label: 'W6', color: 'rgb(205, 100, 155)' },
  { address: 0xff37, label: 'W7', color: 'rgb(205, 100, 155)' },
  { address: 0xff38, label: 'W8', color: 'rgb(205, 100, 155)' },
  { address: 0xff39, label: 'W9', color: 'rgb(205, 100, 155)' },
  { address: 0xff3a, label: 'W10', color: 'rgb(205, 100, 155)' },
  { address: 0xff3b, label: 'W11', color: 'rgb(205, 100, 155)' },
  { address: 0xff3c, label: 'W12', color: 'rgb(205, 100, 155)' },
  { address: 0xff3d, label: 'W13', color: 'rgb(205, 100, 155)' },
  { address: 0xff3e, label: 'W14', color: 'rgb(205, 100, 155)' },
  { address: 0xff3f, label: 'W15', color: 'rgb(205, 100, 155)' },

  { address: 0xff40, label: 'LCD', color: 'rgb(15,165,255)' },
  { address: 0xff41, label: 'STA', color: 'rgb(15,165,255)' },
  { address: 0xff42, label: 'SCY', color: 'rgb(15,165,255)' },
  { address: 0xff43, label: 'SCX', color: 'rgb(15,165,255)' },
  { address: 0xff44, label: 'LY', color: 'rgb(15,165,255)' },
  { address: 0xff45, label: 'LYC', color: 'rgb(15,165,255)' },
  { address: 0xff46, label: 'DMA', color: 'rgb(15,165,255)' },
  { address: 0xff47, label: 'BGP', color: 'rgb(15,165,255)' },
  { address: 0xff48, label: 'OBP1', color: 'rgb(15,165,255)' },
  { address: 0xff49, label: 'OBP2', color: 'rgb(15,165,255)' },
  { address: 0xff4a, label: 'WINY', color: 'rgb(15,165,255)' },
  { address: 0xff4b, label: 'WINX', color: 'rgb(15,165,255)' },
  { address: 0xff50, label: 'BOOT', color: 'rgb(210,175,180)' },
  { address: 0xff0f, label: 'IF', color: 'darkcyan' },
  { address: 0xffff, label: 'IE', color: 'darkcyan' },
];

const MMU = (props) => {
  const cpu = props.cpu;
  const mmu = props.mmu;
  const debugger_ = props.debugger_;
  const PC = cpu.getPC();
  const SP = cpu.getSP();
  const selectedAddress = PC;
  const [showLabels, setShowLabels] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [highlightedAddress, setHighlightedAddress] = useState(null);
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
    if (event.code === 'ArrowRight') {
      nextPage();
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.code === 'ArrowLeft') {
      previousPage();
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.code === 'Home') {
      setSelectedPage(0);
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.code === 'End') {
      setSelectedPage(0xff);
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.code === 'Tab') {
      setShowLabels(!showLabels);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyListener);
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, [selectedPage, showLabels]);

  const goTo = (target) => {
    switch (target) {
      case 'PC':
        setSelectedPage(Math.floor(PC / 256));
        break;
      case 'SP':
        setSelectedPage(Math.floor(SP / 256));
        break;
      default:
        setSelectedPage(Math.floor(mmu[`START_${target}`] / 256));
    }
  };

  const toggleBreakpoint = (address) => {
    const exisistingBreakpoint = find(
      breakpoints,
      (bp) => bp.address === address
    );
    if (exisistingBreakpoint) {
      debugger_.removeBreakpoint(exisistingBreakpoint.id);
    } else {
      debugger_.addBreakpoint({ address });
    }
    props.onDebuggerChange();
  };

  const changeValue = (address) => {
    const value = prompt('New value:');
    if (value && !isNaN(parseInt(value))) {
      mmu.write(address, parseInt(value));
      props.onDebuggerChange();
    }
  };

  const highlightAddress = (address) => {
    setHighlightedAddress(address);
  };

  // const page = Math.floor(selectedAddress / 256);
  const memoryPage = mmu.getMemoryPage(selectedPage);
  const memoryRows = chunk(memoryPage.slice(0, 256), 16);

  return (
    <Fragment>
      <div className="mmu">
        <div className="section">MMU</div>
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
                    const label = labels.find(
                      (l) =>
                        l.address === byteAddress ||
                        (Array.isArray(l.address) &&
                          range(l.address[0], l.address[1] + 1).includes(
                            byteAddress
                          ))
                    );
                    // TODO
                    // const isBreakpointEnabled = isBreakpoint &&
                    return (
                      <div
                        key={indexInPage}
                        onClick={() => toggleBreakpoint(byteAddress)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          changeValue(byteAddress);
                        }}
                        onMouseEnter={() => highlightAddress(byteAddress)}
                        onMouseLeave={() => highlightAddress(null)}
                        className={classNames('byte', {
                          byte_selected: selected,
                          byte_breakpoint: isBreakpoint,
                          byte_breakpoint_disabled: false, // TODO
                        })}
                      >
                        {showLabels && label ? (
                          <div
                            className="byte_with_label"
                            style={{ backgroundColor: label.color }}
                          >
                            <div className="byte_in_label">{toHex(byte)}</div>
                            <div className="label">{label.label}</div>
                          </div>
                        ) : showLabels && byteAddress === cpu.getSP() ? (
                          <div
                            className="byte_with_label"
                            style={{ backgroundColor: 'green' }}
                          >
                            <div className="byte_in_label">{toHex(byte)}</div>
                            <div className="label">SP</div>
                          </div>
                        ) : (
                          toHex(byte)
                        )}
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
          <button onClick={() => goTo('SP')}>SP</button>
          <button onClick={jumpToAddressPage}>Go to...</button>
          <button onClick={() => goTo('ROM0')}>ROM 0</button>
          <button onClick={() => goTo('ROM1')}>ROM 1</button>
          <button onClick={() => goTo('VIDEO_RAM')}>VIDEO RAM</button>
          <button onClick={() => goTo('EXTERNAL_RAM')}>EXTERNAL RAM</button>
          <button onClick={() => goTo('WORK_RAM')}>WORK RAM</button>
          <button onClick={() => goTo('ECHO_RAM')}>ECHO RAM</button>
          <button onClick={() => goTo('OAM')}>OAM</button>
          <button onClick={() => goTo('IO_MAPPING')}>I/O - HIGH-RAM</button>
          <button onClick={() => setShowLabels(!showLabels)}>
            Toggle Labels
          </button>
        </div>
        <div className="highlighted_address">
          {highlightedAddress != null
            ? `${format('hex', highlightedAddress, 16)}: ${getOpcodeLabel(
                highlightedAddress,
                cpu
              )}`
            : '-'}
        </div>
      </div>
    </Fragment>
  );
};

export default MMU;
