import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>   import(/* webpackChunkName: "dashboards" */ './dashboards'));
const Pages = React.lazy(() =>   import(/* webpackChunkName: "pages" */ './pages'));
const Applications = React.lazy(() =>   import(/* webpackChunkName: "applications" */ './applications'));
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() => import(/* webpackChunkName: "blank-page" */ './blank-page'));
const Admins = React.lazy(() => import(/* webpackChunkName: "admins" */ './admins'));
const Wallets = React.lazy(() => import(/* webpackChunkName: "wallets" */ './wallets'));
const Clients = React.lazy(() => import(/* webpackChunkName: "clients" */ './clients'));
const Users = React.lazy(() => import(/* webpackChunkName: "users" */ './users'));
const Staffs = React.lazy(() => import(/* webpackChunkName: "staffs" */ './staffs'));
const StaffsDeactive = React.lazy(() => import(/* webpackChunkName: "staffsdeactive" */ './staffsdeactive'));
const Cards = React.lazy(() => import(/* webpackChunkName: "cards" */ './cards'));
const CardsAdmin = React.lazy(() => import(/* webpackChunkName: "cardsadmin" */ './cardsadmin'));
const BatchUpload = React.lazy(() => import(/* webpackChunkName: "batchupload" */ './batchupload'));
const MinisiteAdmin = React.lazy(() => import(/* webpackChunkName: "minisiteAdmin" */ './minisiteAdmin'));
const Minisite = React.lazy(() => import(/* webpackChunkName: "minisite" */ './minisite'));
const Check = React.lazy(() => import(/* webpackChunkName: "check" */ './check'));

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/check/checkrecords`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/clients`}
              render={(props) => <Clients {...props} />}
            /> <Route
              path={`${match.url}/users`}
              render={(props) => <Users {...props} />}
            /><Route
              path={`${match.url}/staffs`}
              render={(props) => <Staffs {...props} />}
            />
            <Route
              path={`${match.url}/staffsdeactive`}
              render={(props) => <StaffsDeactive {...props} />}
            />
            <Route
            path={`${match.url}/batchupload`}
            render={(props) => <BatchUpload {...props} />}
          /><Route
              path={`${match.url}/cards`}
              render={(props) => <Cards {...props} />}
            /><Route
              path={`${match.url}/cardsadmin`}
              render={(props) => <CardsAdmin {...props} />}
            />
            <Route
              path={`${match.url}/admins`}
              render={(props) => <Admins {...props} />}
            />
            <Route
              path={`${match.url}/wallets`}
              render={(props) => <Wallets {...props} />}
            />
            <Route
              path={`${match.url}/minisiteAdmin`}
              render={(props) => <MinisiteAdmin {...props} />}
            />
              
            <Route
            path={`${match.url}/minisite`}
            render={(props) => <Minisite {...props} />}
            />
             <Route
            path={`${match.url}/check`}
            render={(props) => <Check {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
