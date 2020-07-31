import React from 'react';
import {Canvas} from 'react-three-fiber';
import {Box} from './threeComponents/Box';
import Control from './control/control';

function App() {


  return (
    <Canvas>
      <Control />
      <Box />
    </Canvas>
  );
}

export default App;
