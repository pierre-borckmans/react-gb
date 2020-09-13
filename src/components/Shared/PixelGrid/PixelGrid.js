import React, { useEffect, useRef, createContext } from 'react';

const PixelGrid = props => {
  const { width, height, pixels } = props;
  const shapes = props.shapes || [];
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

      shapes.forEach(shape => {
        if (shape.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(shape.coords[0], shape.coords[1]);
          ctx.lineTo(shape.coords[2], shape.coords[3]);
          ctx.strokeStyle = shape.color;
          ctx.stroke();
        }

        if (shape.type === 'rectangle') {
          ctx.fillStyle = shape.color;
          ctx.fillRect(
            shape.coords[0],
            shape.coords[1],
            shape.coords[2] - shape.coords[0],
            shape.coords[3] - shape.coords[1],
          );
        }
      });
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
