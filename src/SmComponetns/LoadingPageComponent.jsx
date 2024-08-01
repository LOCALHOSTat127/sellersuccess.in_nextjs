
import React from 'react';

const LoadingComponent = () => {
  return (
    <div style={containerStyle}>
      <div style={loaderStyle}>
        Loading...
      </div>
      <style>{`
        @keyframes l24 {
          100% {
            background-position: left;
          }
        }
        
        .loader {
          font-weight: bold;
          font-family: monospace;
          font-size: 30px;
          background: radial-gradient(circle closest-side, #000 94%, #0000) right/calc(200% - 1em) 100%;
          animation: l24 1s infinite alternate linear;
          color: transparent; /* Hide actual text to use background clipping */
          display: inline-block;
          position: relative;
          overflow: hidden;
        }
        
        .loader::before {
          content: "Loading...";
          line-height: 1em;
          color: #000; /* Text color set to black */
          background: inherit;
          background-image: radial-gradient(circle closest-side, #000 94%, #fff); /* Adjusted gradient for white background */
          -webkit-background-clip: text;
          background-clip: text;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .loader {
          position: relative;
          width: 100px;
          height: 30px;
        }
        
        .loader:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #000; /* Color for balls */
          transform: translate(-50%, -50%);
          animation: bounce 0.6s infinite alternate;
        }
        
        @keyframes bounce {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -150%) scale(0.6);
          }
        }
      `}</style>
    </div>
  );
};

// Inline CSS styles for the container
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '56vh',
  background: '#fff', // Set background color to white
  width: '100%',
  padding: '20px',
  boxSizing: 'border-box',
};

const loaderStyle = {
  fontWeight: 'bold',
  fontFamily: 'monospace',
  fontSize: '30px',
  background: 'radial-gradient(circle closest-side, #000 94%, #0000) right/calc(200% - 1em) 100%',
  animation: 'l24 1s infinite alternate linear',
  color: 'black', /* Hide actual text to use background clipping */
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
};

export default LoadingComponent;
