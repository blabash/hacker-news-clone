import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Posts from './components/Posts';

const App: React.FC = () => {
  return (
    <div className='App'>
      <div className='theme-placeholder'>
        <div className='container'>
          <Router>
            <Navbar />

            <Switch>
              <Route path='/' exact render={() => <Posts postID='top' />} />
              <Route path='/new' exact render={() => <Posts postID='new' />} />
              <Route render={() => <div>404. Not Found.</div>} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
