import React from 'react';

import './Sprites.css';
import Container from '../../../Shared/Container/Container';

const Sprites = (props) => {
  const { ppu } = props;

  const sprites = ppu.getSprites();

  return (
    <Container title="Sprites" width={400} visible={props.visible}>
      <div className="sprites_table_container">
        <table className="sprites_table">
          <thead>
            <tr>
              <th>Sprite</th>
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
            {sprites.map((sprite, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{sprite.x}</td>
                <td>{sprite.y}</td>
                <td>{sprite.tileIdx}</td>
                <td>{sprite.priority}</td>
                <td>{sprite.flipX}</td>
                <td>{sprite.flipY}</td>
                <td>{sprite.palette}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Sprites;
