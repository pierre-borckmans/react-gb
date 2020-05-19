import React from 'react';
import TilesGrid from '../../../Shared/TilesGrid/TilesGrid';

import './Tiles.css';
import Container from '../../../Shared/Container/Container';

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
    <Container title="Tiles" width={290}>
      <TilesGrid
        tiles={tileSet.map(tileToPixels)}
        tilesPerRow={16}
        tilesPerColumn={24}
        tileWidth={8}
        tileHeight={8}
        scale={1.4}
        gridColor={[230, 80, 90]}
      />
    </Container>
  );
};

export default Tiles;
