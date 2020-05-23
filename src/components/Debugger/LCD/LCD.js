import React, { useState } from 'react';
import Container from '../../Shared/Container/Container';
import PixelGrid from '../../Shared/PixelGrid/PixelGrid';

import { range } from 'lodash';

import './LCD.css';

const LCD = (props) => {
  const { config, ppu } = props;

  const [backgroundSelected, setBackgroundSelected] = useState(true);
  const [windowSelected, setWindowSelected] = useState(false);
  const [spritesSelected, setSpritesSelected] = useState(true);

  const paletteColors = config.paletteColors;
  const backgroundPalette = ppu.getBackgroundPalette();

  const backgroundLayer = ppu.getScanLines();
  const windowLayer = ppu.getWindowLayer();
  const pixels = Array(144 * 160 * 3).fill(0);

  range(0, 144).forEach((row) =>
    range(0, 160).forEach((col) => {
      if (backgroundSelected) {
        const pixel =
          paletteColors[backgroundPalette[backgroundLayer[row][col]]];

        pixels[row * 160 * 3 + col * 3 + 0] = pixel[0];
        pixels[row * 160 * 3 + col * 3 + 1] = pixel[1];
        pixels[row * 160 * 3 + col * 3 + 2] = pixel[2];
      }
      if (windowSelected) {
        const pixel =
          windowLayer[row][col] === -1
            ? [-1, -1, -1]
            : paletteColors[backgroundPalette[windowLayer[row][col]]];

        if (pixel[0] !== -1) {
          pixels[row * 160 * 3 + col * 3 + 0] = pixel[0];
          pixels[row * 160 * 3 + col * 3 + 1] = pixel[1];
          pixels[row * 160 * 3 + col * 3 + 2] = pixel[2];
        }
      }
    })
  );
  return (
    <Container title="LCD">
      <div className="lcd-canvas-div">
        <PixelGrid width={160} height={144} pixels={pixels} />
      </div>
      <div>
        <input
          type="checkbox"
          name="background"
          checked={backgroundSelected}
          onChange={(e) => setBackgroundSelected(e.target.checked)}
        />
        <label htmlFor="background">Background</label>
        <input
          type="checkbox"
          name="window"
          checked={windowSelected}
          onChange={(e) => setWindowSelected(e.target.checked)}
        />
        <label htmlFor="window">Window</label>
        <input
          type="checkbox"
          name="sprites"
          checked={spritesSelected}
          onChange={(e) => setSpritesSelected(e.target.checked)}
        />
        <label htmlFor="sprites">Sprites</label>
      </div>
    </Container>
  );
};

export default LCD;
