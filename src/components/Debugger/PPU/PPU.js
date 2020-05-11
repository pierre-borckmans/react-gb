import React, { Fragment } from 'react';

import { range } from 'lodash';

import './PPU.css';

const PPU = (props) => {
  const { config, ppu } = props;

  const paletteColors = config.paletteColors;

  const backgroundPalette = ppu.getBackgroundPalette();
  const objectPalette0 = ppu.getObjectPalette0();
  const objectPalette1 = ppu.getObjectPalette1();

  const rgbFromArray = (color) => `rgb(${color[0]},${color[1]},${color[2]})`;

  const getPalette = (palette) => (
    <div className="palette">
      {range(0, 4).map((i) => (
        <div
          key={i}
          className="palette_color"
          style={{
            backgroundColor: rgbFromArray(paletteColors[palette[i]]),
          }}
        />
      ))}
    </div>
  );
  return (
    <Fragment>
      <div className="ppu">
        <div className="section">PPU</div>
        <div className="subsection">Background palette</div>
        {getPalette(backgroundPalette)}
        <div className="subsection">Object palette 0</div>
        {getPalette(objectPalette0)}
        <div className="subsection">Object palette 1</div>
        {getPalette(objectPalette1)}
        <div className="subsection">Scroll</div>
        <div>
          X: {ppu.getScrollX()}, Y: {ppu.getScrollY()}
        </div>
        <div className="subsection">Window</div>
        <div>
          X: {ppu.getWindowX()}, Y: {ppu.getWindowY()}
        </div>
        <div className="subsection">LCDC</div>
        <div>LCD: {ppu.getLCDCLCDEnable()}</div>
        <div>background: {ppu.getLCDCBackgroundEnable()}</div>
        <div>object: {ppu.getLCDCObjectEnable()}</div>
        <div>window: {ppu.getLCDCWindowEnable()}</div>
        <div>bg tilemap: {ppu.getLCDCBackgroundTilemapAdress()}</div>
        <div>
          bg&amp;win tileset: {ppu.getLCDCBackgroundAndWindowTilemapAdress()}
        </div>
        <div>window tilemap: {ppu.getLCDCWindowTilemapAdress()}</div>
      </div>
    </Fragment>
  );
};

export default PPU;
