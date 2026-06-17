import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const StaffsBatchUpload = React.lazy(() =>
  import(/* webpackChunkName: "staffs-batchupload-" */ './staffbatchupload')
);
const BatchUpload = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/staffbatchupload`} />
      <Route
        path={`${match.url}/staffbatchupload`}
        render={(props) => <StaffsBatchUpload {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default BatchUpload;
