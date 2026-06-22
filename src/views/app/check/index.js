import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Checkrecords = React.lazy(() =>
  
  import(/* webpackChunkName: "checkrecords" */ './checkrecords')
);

const Checkin   = React.lazy(() =>
  import(/* webpackChunkName: "checkin" */ './checkin')
);

const Checkout = React.lazy(() =>
  import(/* webpackChunkName: "checkout" */ './checkout')
);

const Check = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/checkrecords`} />
      <Route
        path={`${match.url}/checkrecords`}
        render={(props) => <Checkrecords {...props} />}
      />
      <Route
        path={`${match.url}/checkin`}
        render={(props) => <Checkin {...props} />}
      />
      <Route
        path={`${match.url}/checkout`}
        render={(props) => <Checkout {...props} />}
      /> 
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Check;
