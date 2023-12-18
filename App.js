import React, { useEffect, useState } from 'react';
import { Game } from './components/game';
import { Landing } from './components/landing';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Cleanup function to clear the timeout in case the component unmounts
    return () => clearTimeout(delay);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>{/* Wrap the return statement in a JSX element, e.g., View */}
      {loading ? (
        <Landing />
      ) : (
        <Game />
      )}
    </>
  );
}
