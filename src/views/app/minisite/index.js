import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MinisiteEdit = React.lazy(() =>
import(/* webpackChunkName: "minisite-edit" */ './minisite-edit')
);

const Minisite = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/minisite-edit`} />
    <Route
      path={`${match.url}/minisite-edit/:id`}
      render={(props) => <MinisiteEdit {...props} />}
    />
    <Route
      path={`${match.url}/minisite-edit/`}
      render={(props) => <MinisiteEdit {...props} />}
    />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Minisite;
