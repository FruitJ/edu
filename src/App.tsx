import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import './App.less';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect exact from="/home" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
