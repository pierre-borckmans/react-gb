import React from 'react';
import TilesGrid from '../../../Shared/TilesGrid/TilesGrid';

import './Tiles.css';

const Tiles = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors;

  const backgroundPalette = ppu.getBackgroundPalette();

  const tileSet = ppu.getTileSet();

  const tileToPixels = (tile) => {
    const pixels = [];
    tile.forEach((row) =>
      row.forEach((col) => {
        pixels.push(...paletteColors[backgroundPalette[col]]);
      })
    );
    return pixels;
  };

  return (
    <div className="tileset">
      <div className="section">Tileset</div>
      <TilesGrid
        tiles={tileSet.map(tileToPixels)}
        tilesPerRow={16}
        tilesPerColumn={24}
        tileWidth={8}
        tileHeight={8}
        scale={1.4}
        gridColor={[230, 80, 90]}
      />
    </div>
  );
};

export default Tiles;
