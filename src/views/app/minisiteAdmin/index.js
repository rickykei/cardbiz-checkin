import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const MinisiteList = React.lazy(() =>
  import(/* webpackChunkName: "minisite-list" */ './minisite-list')
);
const MinisiteEdit = React.lazy(() =>
import(/* webpackChunkName: "minisite-edit" */ './minisite-edit')
);

const MinisiteAdmin = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/minisite-list`} />
      <Route
        path={`${match.url}/minisite-list`}
        render={(props) => <MinisiteList {...props} />}
      /><Route
      path={`${match.url}/minisite-edit/:id`}
      render={(props) => <MinisiteEdit {...props} />}
    />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MinisiteAdmin;
