import React from 'react';

import './Sprites.css';
import Container from '../../../Shared/Container/Container';
import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';
import { range, reverse } from 'lodash';

const Sprites = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors.neutral;
  const spritePalettes = [ppu.getObjectPalette0(), ppu.getObjectPalette1()];

  const sprites = ppu.getSprites();

  const spriteToPixelGrid = (tile, spriteInfos) => {
    const flippedTile = spriteInfos.flipY
      ? tile
          .map((row) => (spriteInfos.flipX ? row.slice().reverse() : row))
          .slice()
          .reverse()
      : tile.map((row) => (spriteInfos.flipX ? row.slice().reverse() : row));
    const pixels = [];
    const spritePalette = spritePalettes[spriteInfos.palette];
    range(0, 8).forEach((row) =>
      range(0, 8).forEach((col) => {
        pixels.push(...paletteColors[spritePalette[flippedTile[row][col]]]);
      })
    );
    return pixels;
  };

  return (
    <Container title="Sprites" width={400} visible={props.visible}>
      <div className="sprites_table_container">
        <table className="sprites_table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Sprite</th>
              <th>Tile</th>
              <th>Pos X</th>
              <th>Pos Y</th>
              <th>Tile</th>
              <th>Priority</th>
              <th>Flip X</th>
              <th>Flip Y</th>
              <th>Palette</th>
            </tr>
          </thead>
          <tbody>
            {sprites.map((sprite, idx) => {
              const pixels = spriteToPixelGrid(ppu.getSprite(idx), sprite);
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{<PixelGrid width={8} height={8} pixels={pixels} />}</td>
                  <td>{sprite.tileIdx}</td>
                  <td>{sprite.x}</td>
                  <td>{sprite.y}</td>
                  <td>{sprite.tileIdx}</td>
                  <td>{sprite.priority}</td>
                  <td>{sprite.flipX}</td>
                  <td>{sprite.flipY}</td>
                  <td>{sprite.palette}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Sprites;
