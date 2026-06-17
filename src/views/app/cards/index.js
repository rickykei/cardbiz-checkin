import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const CardsList = React.lazy(() =>  import(/* webpackChunkName: "cards-list" */ './cards-list'));
 const CardProfile = React.lazy(() => import(/* webpackChunkName: "cards-profile" */ './card-profile'));
 
const Cards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/cards-list`} />
      <Route
        path={`${match.url}/cards-list`}
        render={(props) => <CardsList {...props} />}
      />
      <Route
        path={`${match.url}/card-profile/:id`}
        render={(props) => <CardProfile {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Cards;
