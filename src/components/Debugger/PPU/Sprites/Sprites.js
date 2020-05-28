import React from 'react';

import './Sprites.css';
import Container from '../../../Shared/Container/Container';
import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';

const Sprites = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors.neutral;

  const sprites = ppu.getSpritesTable();

  const spriteToPixelGrid = (sprite) => {
    const spriteHeight = sprite.length;
    const pixels = [];
    for (let row = 0; row < spriteHeight; row++) {
      for (let col = 0; col < 8; col++) {
        pixels.push(...paletteColors[sprite[row][col]]);
      }
    }
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
            {sprites.map((spriteInfos, idx) => {
              const sprite = ppu.getSprite(idx);
              const pixels = spriteToPixelGrid(sprite);
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>
                    {
                      <PixelGrid
                        width={8}
                        height={sprite.length}
                        pixels={pixels}
                      />
                    }
                  </td>
                  <td>{spriteInfos.tileIdx}</td>
                  <td>{spriteInfos.x}</td>
                  <td>{spriteInfos.y}</td>
                  <td>{spriteInfos.tileIdx}</td>
                  <td>{spriteInfos.priority}</td>
                  <td>{spriteInfos.flipX}</td>
                  <td>{spriteInfos.flipY}</td>
                  <td>{spriteInfos.palette}</td>
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
