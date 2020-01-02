import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Post from './components/Post';
import User from './components/User';
import Posts from './components/Posts';

import ThemeContext from './contexts/themeContext';

const App: React.FC = () => {
  const [theme, setTheme] = React.useState('dark');

  const toggleTheme = () => {
    setTheme(theme => {
      return theme === 'dark' ? 'light' : 'dark';
    });
  };

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <div className='App'>
      <div className={`theme-${theme}`}>
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
                <Route path='/post' component={Post} />
                <Route path='/user' component={User} />
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
