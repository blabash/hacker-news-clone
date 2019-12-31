import React, { Dispatch, SetStateAction } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import ThemeContext from './contexts/themeContext';

import Posts from './components/Posts';

const App: React.FC = () => {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    setTheme(theme => {
      console.log(theme);
      return theme === 'dark' ? 'light' : 'dark';
    });
  };

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <div className='App'>
      <div className='theme-placeholder'>
        <div className='container'>
          <Router>
            <ThemeContext.Provider value={value}>
              <Navbar />

              <Switch>
                <Route path='/' exact render={() => <Posts postID='top' />} />
                <Route
                  path='/new'
                  exact
                  render={() => <Posts postID='new' />}
                />
                <Route render={() => <div>404. Not Found.</div>} />
              </Switch>
            </ThemeContext.Provider>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
