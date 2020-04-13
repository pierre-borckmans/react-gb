import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';
import { toHex } from '../../../utils/utils';

import { chunk } from 'lodash';

import { range } from 'lodash';

import './Memory.css';

const Memory = (props) => {
  const cpu = props.cpu;
  const mmu = props.mmu;
  const PC = cpu.getPC();
  const selectedAddress = PC;

  useEffect(() => {});

  const page = Math.floor(selectedAddress / 256);
  const memoryPage = mmu.getMemoryPage(page);
  const memoryRows = chunk(memoryPage.slice(page * 256, (page + 1) * 256), 16);

  return (
    <Fragment>
      <div className="table">
        <div className="table_header">
          <div className="row_offset" />
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
        {memoryRows.map((row, rowIndex) => {
          const rowSelected =
            page * 16 + rowIndex === Math.floor(selectedAddress / 16);
          return (
            <div key={rowIndex} className="row">
              <div
                className={classNames('row_offset', {
                  row_offset_selected: rowSelected,
                })}
              >
                {toHex(page * 256 + rowIndex * 16, 4)}
              </div>
              {row.map((byte, colIndex) => {
                const index = rowIndex * 16 + colIndex;
                const selected = page * 256 + index === selectedAddress;
                return (
                  <div
                    key={index}
                    className={classNames('byte', { byte_selected: selected })}
                  >
                    {toHex(byte)}
                  </div>
                );
              })}
            </div>
          );
        })}
        {cpu.X}
      </div>
    </Fragment>
  );
};

export default Memory;
