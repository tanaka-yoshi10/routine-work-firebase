import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from './App';
import EditRoutine from './pages/EditRoutine';
import NewRoutine from './pages/NewRoutine';

export const Path = {
  app: '/',
  edit: '/routines/:routineId/edit',
  new: '/routines/new',
};

const routes = (
  <Switch>
    <Route exact path={Path.app} component={App} />
    <Route exact path={Path.edit} component={EditRoutine} />
    <Route exact path={Path.new} component={NewRoutine} />
    <Redirect to={Path.app} />
  </Switch>
);

export default routes;
