import React from 'react';

import PixelGrid from '../../../Shared/PixelGrid/PixelGrid';

import { range } from 'lodash';
import './Background.css';
import Container from '../../../Shared/Container/Container';

const Sprites = (props) => {
  const { config, ppu } = props;
  const paletteColors = config.paletteColors;

  const sprites = ppu.getSpritesLayer();

  const pixels = [];

  return (
    <Container title="Sprites" width={290}>
      <div className="sprites-canvas-div"></div>
    </Container>
  );
};

export default Sprites;
