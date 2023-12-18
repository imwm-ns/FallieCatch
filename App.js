import React, { useEffect, useState } from 'react';
import { Game } from './components/game';
import { Landing } from './components/landing';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>{}
      {loading ? (
        <Landing />
      ) : (
        <Game />
      )}
    </>
  );
}
