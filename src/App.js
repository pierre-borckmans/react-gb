import React, { useEffect } from 'react';

import Debugger from './components/Debugger/Debugger';

import gameboy from './gameboy/gameboy';

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Debugger gameboy={gameboy} />
    </div>
  );
}

export default App;
