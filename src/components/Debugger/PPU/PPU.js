import React from 'react';

import { range } from 'lodash';

import './PPU.css';
import Container from '../../Shared/Container/Container';

const PPU = (props) => {
  const { config, ppu } = props;

  const paletteColors = config.paletteColors.gb2;

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
    <Container title="PPU" width={290}>
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
      <div>LCD: {ppu.getLCDCLCDEnable() ? 'on' : 'off'}</div>
      <div>background: {ppu.getLCDCBackgroundEnable() ? 'on' : 'off'}</div>
      <div>object: {ppu.getLCDCObjectEnable() ? 'on' : 'off'}</div>
      <div>window: {ppu.getLCDCWindowEnable() ? 'on' : 'off'}</div>
      <div>bg tilemap: {ppu.getLCDCBackgroundTilemap()}</div>
      <div>bg&amp;win tileset: {ppu.getLCDCBackgroundAndWindowTileset()}</div>
      <div>window tilemap: {ppu.getLCDCWindowTilemap()}</div>
      <div>cycles: {ppu.getCycles()}/17556</div>
    </Container>
  );
};

export default PPU;
