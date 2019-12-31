import React from 'react';

const ThemeContext = React.createContext<{
  theme: string;
  toggleTheme: () => void;
}>({ theme: 'derp', toggleTheme: () => null }); //typescript forcing me to put a default value here for some reason so I made a dumb one.

export default ThemeContext;
