import React from 'react';

import PixelGrid from '../PixelGrid/PixelGrid';

import { range } from 'lodash';

const TilesGrid = (props) => {
  const {
    tiles,
    tileWidth,
    tileHeight,
    tilesPerRow,
    tilesPerColumn,
    gridColor,
  } = props;

  const pixels = [];

  const width = tilesPerRow * tileWidth + (gridColor ? tilesPerRow + 1 : 0);
  const height =
    tilesPerColumn * tileHeight + (gridColor ? tilesPerColumn + 1 : 0);

  if (gridColor) {
    pixels.push(...range(0, width).flatMap(() => gridColor));
  }
  for (let gridRowIdx = 0; gridRowIdx < tilesPerColumn; gridRowIdx++) {
    for (let tileRowIdx = 0; tileRowIdx < tileHeight; tileRowIdx++) {
      if (gridColor) {
        pixels.push(...gridColor);
      }
      for (let tileIdx = 0; tileIdx < tilesPerRow; tileIdx++) {
        pixels.push(
          ...tiles[gridRowIdx * tilesPerRow + tileIdx].slice(
            tileRowIdx * tileWidth * 3,
            (tileRowIdx + 1) * tileWidth * 3
          )
        );
        if (gridColor) {
          pixels.push(...gridColor);
        }
      }
    }
    if (gridColor) {
      pixels.push(...range(0, width).flatMap(() => gridColor));
    }
  }

  return (
    <PixelGrid
      pixels={pixels}
      width={width}
      height={height}
      scale={props.scale}
    />
  );
};

export default TilesGrid;
