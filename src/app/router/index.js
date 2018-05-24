import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter }  from 'react-router-redux';
import routesConfig from './routes';

const Routers = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
    {
      routesConfig.map(route => {
        return <Route key={route.path} exact={route.exact} path={route.path} component={route.component} thunk={route.thunk} />
      })
    }
    </Switch>
  </ConnectedRouter>
)

export default Routers;