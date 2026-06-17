import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const WalletEdit = React.lazy(() =>
  import(/* webpackChunkName: "wallet-edit" */ './wallet-edit')
);
 
const Wallets = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/wallet-edit`} />
      <Route path={`${match.url}/wallet-edit/:id`}   render={(props) => <WalletEdit {...props} />}  />
      <Route path={`${match.url}/wallet-edit/`}   render={(props) => <WalletEdit {...props} />}  /> 
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Wallets;
