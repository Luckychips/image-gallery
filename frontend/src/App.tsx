import React, { useEffect, useState } from 'react';
import { Gallery, LoadingIndicator } from '@components/core';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:5000/images', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const parsed = await response.json();
      setList(parsed);
      setIsLoading(false);
    })();

    return () => {
      setList([]);
      setIsLoading(true);
    };
  }, []);

  return <div>{isLoading ? <LoadingIndicator /> : <Gallery list={list} />}</div>;
}

export default App;
