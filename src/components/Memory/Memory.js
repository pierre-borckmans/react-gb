import React, { useState, useEffect } from 'react';

import Rom from '../../services/Rom';

const Memory = (props) => {
  const [rom, setRom] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loadRom = async () => {
    const rom = await Rom.loadRom();
    setRom(rom);
  };

  useEffect(() => {
    loadRom();
  });

  return (
    <div>
      Memory
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 16 * 28 + 1 }}>
        {rom.map((byte, i) => (
          <div
            key={i}
            style={{
              width: 24,
              marginRight: 4,
              backgroundColor: i === selectedIndex ? 'lightblue' : 'none',
              color: i === selectedIndex ? 'white' : 'black',
            }}
          >
            {byte.toString(16).toUpperCase().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memory;
