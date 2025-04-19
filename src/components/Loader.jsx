// components/Loader.jsx
import React, { useEffect, useState } from 'react';
import './Loader.css'; // We'll add animation here

function Loader() {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);
    }, 5000); // after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader-container ${slideUp ? 'slide-up' : ''}`}>
     <div className="loader"></div>
    </div>
  );
}

export default Loader;
