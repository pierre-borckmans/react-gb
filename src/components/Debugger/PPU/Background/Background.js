import React from 'react';

import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';

import { range } from 'lodash';
import './Background.css';
import Container from '../../../Shared/Container/Container';

const Background = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors;

  const [scrollX, scrollY] = [ppu.getScrollX(), ppu.getScrollY()];
  const backgroundPalette = ppu.getBackgroundPalette();
  const background = ppu.getBackground();

  const pixels = [];
  const red = [255, 0, 0];
  const white = [255, 255, 255];

  range(0, 256).forEach((row) =>
    range(0, 256).forEach((col) => {
      if (
        ((row === scrollY || row === (scrollY + 143) % 256) &&
          ((col >= scrollX && col <= Math.min(scrollX + 159, 255)) ||
            (scrollX + 159 > 255 &&
              col <= (scrollX + 159) % 256 &&
              col >= 0))) ||
        ((col === scrollX || col === (scrollX + 159) % 256) &&
          ((row >= scrollY && row <= Math.min(scrollY + 143, 255)) ||
            (scrollY + 143 > 255 && row <= (scrollY + 143) % 256 && row >= 0)))
      ) {
        pixels.push(...red);
      } else {
        pixels.push(...paletteColors[backgroundPalette[background[row][col]]]);
      }
    })
  );

  return (
    <Container title="Background" width={290}>
      <div className="background-canvas-div">
        <PixelGrid width={256} height={256} pixels={pixels} />
      </div>
    </Container>
  );
};

export default Background;
