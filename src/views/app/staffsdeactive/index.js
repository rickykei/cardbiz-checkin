import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const StaffsList = React.lazy(() =>
  import(/* webpackChunkName: "staffs-list" */ './staffs-list')
);
const StaffDel = React.lazy(() =>
  import(/* webpackChunkName: "staffs-del" */ './staff-del')
);
const StaffDeactive = React.lazy(() =>
  import(/* webpackChunkName: "staffs-deactive" */ './staff-deactive')
);
const StaffActive = React.lazy(() =>
  import(/* webpackChunkName: "staffs-active" */ './staff-active')
);
const StaffProfile = React.lazy(() =>
  import(/* webpackChunkName: "staffs-profile" */ './staff-profile')
);
const StaffsDeactive = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/staffs-list`} />
      <Route
        path={`${match.url}/staffs-list`}
        render={(props) => <StaffsList {...props} />}
      />
      <Route
        path={`${match.url}/staff-del/:id`}
        render={(props) => <StaffDel {...props} />}
      />
      <Route
        path={`${match.url}/staff-profile/:id`}
        render={(props) => <StaffProfile {...props} />}
      />
      <Route
        path={`${match.url}/staff-deactive/:id`}
        render={(props) => <StaffDeactive {...props} />}
      />
      <Route
        path={`${match.url}/staff-active/:id`}
        render={(props) => <StaffActive {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default StaffsDeactive;
