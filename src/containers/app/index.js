import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Home from '../home';

const App = () => (
  <div className="container app-wrapper">
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </main>
  </div>
);

export default withRouter(App);
