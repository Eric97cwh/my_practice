import React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import getUrlBaseName from 'common/util/getUrlBaseName';
import ReactGA from 'react-ga';
import PrivateRoute from './routes/privateRoute';

//import all the page here
import notFoundPage from '../common/layout/notFoundPage';


import NoAccessPage from '../dashboard/noAccessPage';


const Routes = () => (
    <ConnectedRouter>
      <Switch>
        <Route path="/no-access/with-route" component={NoAccessPage} />
        <PrivateRoute exact path="/no-access/with-private" component={NoAccessPage} />
      </Switch>
    </ConnectedRouter>
);