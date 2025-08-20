import React, { useState, useEffect } from 'react';

const CustomProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 10 : prevProgress));
      }, 500); // Adjust the interval as needed
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <>
       <div><h2>Loading...</h2></div>
    <div style={{ width: '100%', height: '30px', border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#007bff',
          transition: 'width 0.5s ease-in-out',
        }}
      />
    </div>
    </>
  );
};

export default CustomProgressBar;