import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from './App';
import EditRoutine from './pages/EditRoutine';

export const Path = {
  app: '/',
  edit: '/routines/:routineId',
};

const routes = (
  <Switch>
    <Route exact path={Path.app} component={App} />
    <Route exact path={Path.edit} component={EditRoutine} />
    <Redirect to={Path.app} />
  </Switch>
);

export default routes;
