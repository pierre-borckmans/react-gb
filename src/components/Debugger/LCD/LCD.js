import React, { useEffect, useRef, useState } from 'react';
import Container from '../../Shared/Container/Container';

import './LCD.css';

const LCD = props => {
  const { ppu } = props;
  const scale = props.scale || 1;

  const canvasRef = useRef();
  const animationRef = useRef();

  const [backgroundSelected, setBackgroundSelected] = useState(true);
  const [windowSelected, setWindowSelected] = useState(true);
  const [spritesSelected, setSpritesSelected] = useState(true);

  useEffect(() => {
    const draw = () => {
      ppu.renderCanvas(
        canvasRef.current,
        backgroundSelected,
        windowSelected,
        spritesSelected,
      );
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationRef.current);
  }, [ppu, backgroundSelected, windowSelected, spritesSelected]);

  return (
    <Container title="LCD" visible={props.visible}>
      <div
        className="lcd-canvas-div"
        style={{
          height: 144 * scale,
          width: 160 * scale,
        }}
      >
        <canvas
          id="main_canvas"
          ref={canvasRef}
          width={160}
          height={144}
          style={{
            width: 160 * scale,
            height: 144 * scale,
          }}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="background"
          checked={backgroundSelected}
          onChange={e => setBackgroundSelected(e.target.checked)}
        />
        <label htmlFor="background">Background</label>
        <input
          type="checkbox"
          name="window"
          checked={windowSelected}
          onChange={e => setWindowSelected(e.target.checked)}
        />
        <label htmlFor="window">Window</label>
        <input
          type="checkbox"
          name="sprites"
          checked={spritesSelected}
          onChange={e => setSpritesSelected(e.target.checked)}
        />
        <label htmlFor="sprites">Sprites</label>
      </div>
    </Container>
  );
};

export default LCD;
