import React, { useState } from 'react';

import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';

import { range } from 'lodash';
import './TileMaps.css';
import Container from '../../../Shared/Container/Container';

const TileMaps = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors;

  const [showGrid, setShowGrid] = useState(false);
  const [selectedTileMap, setSelectedTileMap] = useState(0);

  const [scrollX, scrollY] = [ppu.getScrollX(), ppu.getScrollY()];
  const backgroundPalette = ppu.getBackgroundPalette();
  const tileMaps = ppu.getTileMaps();

  const pixels = [];
  const blue = [0, 0, 255];
  const red = [255, 0, 0];

  range(0, 256).forEach((row) =>
    range(0, 256).forEach((col) => {
      pixels.push(
        ...paletteColors[backgroundPalette[tileMaps[selectedTileMap][row][col]]]
      );
    })
  );

  const x1 = scrollX;
  const x2 = Math.min(scrollX + 160, 255);
  const x3 = scrollX + 160 > 255 ? 0 : scrollX;
  const x4 = (scrollX + 160) % 256;

  const y1 = scrollY;
  const y2 = Math.min(scrollY + 144, 255);
  const y3 = scrollY + 144 > 255 ? 0 : scrollY;
  const y4 = (scrollY + 144) % 256;

  const scrollArea = {
    lines:
      selectedTileMap === 0
        ? [
            [x1, y1, x2, y1],
            [x3, y1, x4, y1],

            [x1, y4, x2, y4],
            [x3, y4, x4, y4],

            [x1, y1, x1, y2],
            [x1, y3, x1, y4],

            [x4, y1, x4, y2],
            [x4, y3, x4, y4],
          ]
        : [],
    rectangles:
      selectedTileMap === 0
        ? [
            [x1, y1, x2, y2],
            [x3, y1, x4, y2],
            [x1, y3, x2, y4],
            [x3, y3, x4, y4],
          ]
        : [],
  };

  const grid = showGrid
    ? range(0, 256).flatMap((i) => [
        [0, i * 8, 256, i * 8],
        [i * 8, 0, i * 8, 256],
      ])
    : [];

  return (
    <Container title="Tile Maps" width={260} visible>
      <div>
        <input
          type="checkbox"
          name="grid"
          value={false}
          onChange={(e) => setShowGrid(e.target.checked)}
        />
        <label htmlFor="grid">Show grid</label>
      </div>
      <div className="tilemaps-selection">
        <div>
          <input
            type="radio"
            id="background"
            name="tilemap"
            checked={selectedTileMap === 0}
            onChange={(e) => setSelectedTileMap(e.target.checked ? 0 : 1)}
          />
          <label htmlFor="background">Background</label>
        </div>
        <div>
          <input
            type="radio"
            id="window"
            name="tilemap"
            checked={selectedTileMap === 1}
            onChange={(e) => setSelectedTileMap(e.target.checked ? 1 : 0)}
          />
          <label htmlFor="window">Window</label>
        </div>
      </div>
      <div className="tilemaps-container">
        <div className="tilemaps-canvas-div">
          <PixelGrid
            width={256}
            height={256}
            pixels={pixels}
            scale={1}
            shapes={[
              ...scrollArea.rectangles.map((rect) => ({
                type: 'rectangle',
                color: 'rgba(200,0,0,0.02)',
                coords: rect,
              })),
              ...scrollArea.lines.map((line) => ({
                type: 'line',
                color: 'rgba(255,0,0,0.6)',
                coords: line,
              })),
              ...grid.map((line) => ({
                type: 'line',
                color: 'rgba(0,0,255,0.4)',
                coords: line,
              })),
            ]}
          />
        </div>
      </div>
    </Container>
  );
};

export default TileMaps;
