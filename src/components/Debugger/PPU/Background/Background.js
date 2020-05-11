import React from 'react';

import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';

import { range } from 'lodash';
import './Background.css';

const Background = (props) => {
  const { config, ppu } = props;

  const [scrollX, scrollY] = [ppu.getScrollX(), ppu.getScrollY()];

  const pixels = [];
  const red = [255, 0, 0];
  const white = [255, 255, 255];

  range(0, 256).forEach((row) =>
    range(0, 256).forEach((col) => {
      if (
        ((row === scrollY || row === (scrollY + 144) % 256) &&
          ((col >= scrollX && col <= Math.min(scrollX + 160, 255)) ||
            (scrollX + 160 > 255 &&
              col <= (scrollX + 160) % 256 &&
              col >= 0))) ||
        ((col === scrollX || col === (scrollX + 160) % 256) &&
          ((row >= scrollY && row <= Math.min(scrollY + 144, 255)) ||
            (scrollY + 144 > 255 && row <= (scrollY + 144) % 256 && row >= 0)))
      ) {
        pixels.push(...red);
      } else {
        pixels.push(...white);
      }
    })
  );

  return (
    <div className="background">
      <div className="section">Background</div>
      <div className="background-canvas">
        <PixelGrid width={256} height={256} pixels={pixels} />
      </div>
    </div>
  );
};

export default Background;
