import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UsersList = React.lazy(() =>
  import(/* webpackChunkName: "user-list" */ './users-list')
);
const UserAdd = React.lazy(() =>
  import(/* webpackChunkName: "user-add" */ './user-add')
);
const UserDel = React.lazy(() =>
  import(/* webpackChunkName: "user-del" */ './user-del')
);
const UserEdit = React.lazy(() =>
import(/* webpackChunkName: "user-edit" */ './user-edit')
);
const UserProfile = React.lazy(() =>
import(/* webpackChunkName: "user-profile" */ './user-profile')
);

const Users = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users-list`} />
      <Route
        path={`${match.url}/users-list`}
        render={(props) => <UsersList {...props} />}
      /><Route
        path={`${match.url}/user-add`}
        render={(props) => <UserAdd {...props} />}
      /><Route
        path={`${match.url}/user-del/:id`}
        render={(props) => <UserDel {...props} />}
      /><Route
      path={`${match.url}/user-edit/:id`}
      render={(props) => <UserEdit {...props} />}
    /><Route
    path={`${match.url}/user-profile/:id`}
    render={(props) => <UserProfile {...props} />}
  />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Users;
