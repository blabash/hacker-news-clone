import React from 'react';

interface Props {
  text?: string;
  speed?: number;
}

const Loading: React.FC<Props> = ({ text = 'Loading', speed = 150 }) => {
  const [loadingText, setLoadingText] = React.useState(text);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLoadingText(l => {
        return l === text + '...' ? text : l + '.';
      });
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <div>
      <h1>{loadingText}</h1>
    </div>
  );
};

export default Loading;
