import React from 'react';

interface Props {
  text?: string;
}

const Loading: React.FC<Props> = ({ text = 'Loading' }) => {
  const [loadingText, setLoadingText] = React.useState(text);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLoadingText(l => {
        return l === text + '...' ? text : l + '.';
      });
    }, 150);

    return () => clearInterval(id);
  }, [text]);

  return (
    <div>
      <h1>{loadingText}</h1>
    </div>
  );
};

export default Loading;
