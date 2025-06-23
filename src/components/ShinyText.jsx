const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;
  const baseClasses = 'bg-clip-text inline-block';
  const animationClass = disabled ? '' : 'animate-shine';
  const combinedClasses = `${baseClasses} ${animationClass} ${className}`;

  return (
    <span
      className={combinedClasses}
      style={{
        backgroundImage: 'linear-gradient(90deg, #ff0000 0%, #ff6666 20%, #ffcccc 50%, #ff6666 80%, #ff0000 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        animationDuration: animationDuration,
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;