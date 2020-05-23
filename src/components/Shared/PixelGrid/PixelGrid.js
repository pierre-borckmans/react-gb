import React, { useEffect, useRef } from 'react';

const PixelGrid = (props) => {
  const { width, height, pixels } = props;
  const scale = props.scale || 1;

  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    const draw = () => {
      for (let i = 0; i < pixels.length / 3; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        const offset = (y * width + x) * 4;
        imageData.data[offset] = pixels[3 * i];

        imageData.data[offset + 1] = pixels[3 * i + 1];
        imageData.data[offset + 2] = pixels[3 * i + 2];
        imageData.data[offset + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };
    draw();
  });

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
      style={{
        width: width * scale,
        height: height * scale,
      }}
    />
  );
};

export default PixelGrid;
