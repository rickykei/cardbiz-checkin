import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const StaffsList = React.lazy(() =>
  import(/* webpackChunkName: "staffs-list" */ './staffs-list')
);
const StaffAdd = React.lazy(() =>
  import(/* webpackChunkName: "staffs-add" */ './staff-add')
);
const StaffDel = React.lazy(() =>
  import(/* webpackChunkName: "staffs-del" */ './staff-del')
);
const StaffEdit = React.lazy(() =>
  import(/* webpackChunkName: "staffs-edit" */ './staff-edit')
);
const StaffDeactive = React.lazy(() =>
  import(/* webpackChunkName: "staffs-deactive" */ './staff-deactive')
);
const StaffProfile = React.lazy(() =>
  import(/* webpackChunkName: "staffs-profile" */ './staff-profile')
);
const Staffs = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/staffs-list`} />
      <Route
        path={`${match.url}/staffs-list`}
        render={(props) => <StaffsList {...props} />}
      />
      <Route
        path={`${match.url}/staff-add`}
        render={(props) => <StaffAdd {...props} />}
      />
      <Route
        path={`${match.url}/staff-del/:id`}
        render={(props) => <StaffDel {...props} />}
      />
      <Route
        path={`${match.url}/staff-edit/:id`}
        render={(props) => <StaffEdit {...props} />}
      />
      <Route
        path={`${match.url}/staff-profile/:id`}
        render={(props) => <StaffProfile {...props} />}
      />
      <Route
        path={`${match.url}/staff-deactive/:id`}
        render={(props) => <StaffDeactive {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Staffs;
