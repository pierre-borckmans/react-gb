import React, { Fragment } from 'react';

import { range } from 'lodash';

import PixelGrid from '../../Shared/PixelGrid/PixelGrid';
import './PPU.css';

const PPU = (props) => {
  const { config, ppu } = props;

  const paletteColors = config.paletteColors;

  const backgroundPalette = ppu.getBackgroundPalette();
  const objectPalette0 = ppu.getObjectPalette0();
  const objectPalette1 = ppu.getObjectPalette1();
  const tileSet = ppu.getTileSet();

  const tileToPixels = (tile) => {
    const colors = [
      [255, 255, 255],
      [170, 170, 170],
      [85, 85, 85],
      [0, 0, 0],
    ];
    const pixels = [];
    tile.forEach((row) =>
      row.forEach((col) => {
        pixels.push(...colors[col]);
      })
    );
    return pixels;
  };

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
          bg&amp;win timemap: {ppu.getLCDCBackgroundAndWindowTilemapAdress()}
        </div>
        <div>window tilemap: {ppu.getLCDCWindowTilemapAdress()}</div>
        tileset:
        <div className="tileset">
          {tileSet.slice(0, 255).map((tile, idx) => {
            const pixels = tileToPixels(tile);
            return (
              <div key={idx} className="tile">
                <PixelGrid width={8} height={8} scale={2} pixels={pixels} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default PPU;
