// The home page of the project.

import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import styled from 'styled-components';


import { history } from './_helpers';
import { alertActions } from './_actions';
import { connect } from 'react-redux';

import AuthRoute from './AuthRoute';
import { LoginPage } from './LoginRegister/LoginPage';
import { RegisterPage } from './LoginRegister/RegisterPage'

import { CoordinatorHomePage } from './CoordinatorPage/CoordinatorHomePage';
import { ImportProjectPage } from './CoordinatorPage/ImportProjectPage';
import { ManageSupervisor } from './ManageSupervisor/ManageSupervisor';

import { SupervisorHomePage } from './SupervisorPage/SupervisorHomePage';


import { ProjectHomePage } from './ProjectPage/ProjectHomePage';
import { ProcessQualityPage } from './qualityPages/ProcessQualityPage';
import { CommunicationQualityPage } from './qualityPages/CommunicationQualityPage';
import { IndividualContributionPage } from './qualityPages/IndividualContributionPage';


import MembersPage from './MembersPage';
import { ProjectSettingsPage } from './ProjectPage/ProjectSettingsPage';

import { GridNavbar } from './navigation/navbar';
import { withCookies } from "react-cookie";

const AppLayout = styled.div`
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr;
`

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

const NotFound = () => (
  <div><h1>404.. This page is not found!</h1></div>
);


class Home extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
      history.go(0);
    });

  }


//const PageRouter = ( {history} ) => (
  render(){
    const { alert } = this.props;
    return(
        <AppLayout>
        <GridNavbar/>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history= {history}>
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Switch>
              <Route exact path="/LoginPage" component={LoginPage}>
                <LoginPage />
              </Route>
              <Route exact path="/RegisterPage" component={RegisterPage}>
                <RegisterPage />
              </Route>
              <Route exact path="/CoordinatorHomePage" component = {CoordinatorHomePage}>
                <CoordinatorHomePage />
              </Route>
              <Route exact path="/ImportProjectPage">
                <ImportProjectPage />
              </Route>
              <Route exact path="/ManageSupervisor" component = {ManageSupervisor}>
                <ManageSupervisor />
              </Route>
              <Route exact path="/SupervisorHomePage">
                <SupervisorHomePage />
              </Route>
              <Route exact path="/ProjectHomePage">
                <ProjectHomePage />
              </Route>
              <Route exact path="/ProcessQualityPage">
                <ProcessQualityPage />
              </Route>
              <Route exact path="/CommunicationQualityPage">
                <CommunicationQualityPage />
              </Route>
              <Route exact path="/MembersPage">
                <MembersPage />
              </Route>
              <Route exact path="/IndividualContributionPage">
                <IndividualContributionPage />
              </Route>
              <Route exact path="/ProjectSettingsPage">
                <ProjectSettingsPage />
              </Route>
              <Route exact path="/">
                <LoginPage />
              </Route>
            </Switch>
        </Router>
      </AppLayout>

    );
 
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const tempRouter = withCookies(connect(mapState, actionCreators)(Home));
export { tempRouter as PageRouter };


//export default PageRouter;
