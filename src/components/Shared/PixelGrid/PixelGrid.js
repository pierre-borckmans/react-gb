import React, { useEffect, useRef } from 'react';

const PixelGrid = (props) => {
  const { scale, width, height, pixels } = props;

  let imageData, ctx;

  const canvas = useRef(null);

  useEffect(() => {
    ctx = canvas.current.getContext('2d');
    imageData = ctx.createImageData(width * scale, height * scale);
    draw();
  });

  const draw = () => {
    for (let i = 0; i < pixels.length / 3; i++) {
      for (let s1 = 0; s1 < scale; s1++) {
        for (let s2 = 0; s2 < scale; s2++) {
          const x = i % width;
          const y = Math.floor(i / width);
          const offset =
            ((y * scale + s1) * width * scale + x * scale + s2) * 4;
          imageData.data[offset] = pixels[3 * i];

          imageData.data[offset + 1] = pixels[3 * i + 1];
          imageData.data[offset + 2] = pixels[3 * i + 2];
          imageData.data[offset + 3] = 255;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return <canvas ref={canvas} width={width * scale} height={height * scale} />;
};

export default PixelGrid;
