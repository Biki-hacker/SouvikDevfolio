import React, { useEffect, useRef } from 'react';

const DURATION = 350; // ms (reduced for faster animation)

const ThemeWaveOverlay = ({ x, y, theme, onComplete, children }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    // Calculate the max radius needed to cover the viewport from (x, y)
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dx = Math.max(x, vw - x);
    const dy = Math.max(y, vh - y);
    const maxRadius = Math.sqrt(dx * dx + dy * dy);
    // Start with small radius, animate to max
    overlay.animate([
      {
        clipPath: `circle(0px at ${x}px ${y}px)`
      },
      {
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`
      }
    ], {
      duration: DURATION,
      easing: 'ease-in-out',
      fill: 'forwards'
    });
    const timeout = setTimeout(() => {
      onComplete && onComplete();
    }, DURATION);
    return () => clearTimeout(timeout);
  }, [x, y, onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        background: theme === 'dark' ? '#1a1a1a' : '#fff',
        color: theme === 'dark' ? '#fff' : '#1a1a1a',
        clipPath: `circle(0px at ${x}px ${y}px)`,
        transition: 'background 0.3s',
      }}
    >
      <div style={{width: '100vw', height: '100vh'}}>{children}</div>
    </div>
  );
};

export default ThemeWaveOverlay; 