import React, { Fragment } from 'react';

import { range } from 'lodash';

import './PPU.css';

const PPU = (props) => {
  const { config, ppu } = props;

  const paletteColors = config.paletteColors;

  const backgroundPalette = ppu.getBackgroundPalette();
  const objectPalette0 = ppu.getObjectPalette0();
  const objectPalette1 = ppu.getObjectPalette1();

  const getPalette = (palette) => (
    <div className="palette">
      {range(0, 4).map((i) => (
        <div
          key={i}
          className="palette_color"
          style={{
            backgroundColor: paletteColors[palette[i]],
          }}
        />
      ))}
    </div>
  );
  return (
    <Fragment>
      <div className="ppu">
        <div className="section">
          <span>Background palette</span>
          {getPalette(backgroundPalette)}
        </div>
        <div className="section">
          <span>Object palette 0</span>
          {getPalette(objectPalette0)}
        </div>
        <div className="section">
          <span>Object palette 1</span>
          {getPalette(objectPalette1)}
        </div>
        <div className="section">
          <span>Scroll</span>
          <div>
            X: {ppu.getScrollX()}, Y: {ppu.getScrollY()}
          </div>
        </div>
        <div className="section">
          <span>Window</span>
          <div>
            X: {ppu.getWindowX()}, Y: {ppu.getWindowY()}
          </div>
        </div>
        <div className="section">
          <span>LCDC</span>
          <div>LCD: {ppu.getLCDCLCDEnable()}</div>
          <div>background: {ppu.getLCDCBackgroundEnable()}</div>
          <div>object: {ppu.getLCDCObjectEnable()}</div>
          <div>window: {ppu.getLCDCWindowEnable()}</div>
          <div>bg tilemap: {ppu.getLCDCBackgroundTilemapAdress()}</div>
          <div>
            bg&amp;win timemap: {ppu.getLCDCBackgroundAndWindowTilemapAdress()}
          </div>
          <div>window tilemap: {ppu.getLCDCWindowTilemapAdress()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default PPU;
