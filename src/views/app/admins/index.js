import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AdminEdit = React.lazy(() =>
  import(/* webpackChunkName: "admin-edit" */ './admin-edit')
);
 
const Admins = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin-edit`} />
      <Route path={`${match.url}/admin-edit/:id`}   render={(props) => <AdminEdit {...props} />}  />
      <Route path={`${match.url}/admin-edit/`}   render={(props) => <AdminEdit {...props} />}  />
     
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admins;
