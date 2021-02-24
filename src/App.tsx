import React, {useEffect} from 'react';
import { Gallery, LoadingIndicator } from '@components/core';

function App() {
    // useEffect(() => {
    //     document.body.oncontextmenu = () => {
    //         return false;
    //     }
    // }, []);

  return (
    <div>
      <LoadingIndicator />
      <Gallery />
    </div>
  );
}

export default App;
