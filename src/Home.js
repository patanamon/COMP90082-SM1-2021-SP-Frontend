import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { history } from "./_helpers";
import { LoginPage } from "./LoginRegister/LoginPage";
import { CoordinatorHomePage } from "./CoordinatorPage/CoordinatorHomePage";
import { ProjectHomePage } from "./ProjectPage/ProjectHomePage";
import { ProcessQualityPage } from "./qualityPages/ProcessQualityPage";
import { ProductQualityPage } from "./qualityPages/ProductQualityPage";
import { CommunicationQualityPage } from "./qualityPages/CommunicationQualityPage";
import { IndividualContributionPage } from "./qualityPages/IndividualContributionPage";
import { ProjectSettingsPage } from "./ProjectPage/ProjectSettingsPage";
import { connect } from "react-redux";
import { GridNavbar } from "./navigation/navbar";
import { withCookies } from "react-cookie";
import {PublicRoute} from "./_routes/PublicRoute";
import {ProtectedRoute} from "./_routes/ProtectedRoute";
import "./unimelb.css";
import "antd/dist/antd.css";

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
`;

const NotFound = () => (
  <div>
    <h1>404.. This page is not found!</h1>
  </div>
);

class Home extends React.Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      history.go(0);
    });
  }

  render() {
    return (
      <AppLayout>
        <GridNavbar />
        <Router history={history}>
          <Switch>
          <PublicRoute
                auth={this.props.isLogin}
                exact={true}
                path="/"
                component={LoginPage}
            />
            <PublicRoute
                auth={this.props.isLogin}
                exact={true}
                exact path="/login"
                component={LoginPage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/coordinator"
                component={CoordinatorHomePage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/project"
                component={ProjectHomePage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/product"
                component={ProductQualityPage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/process"
                component={ProcessQualityPage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/communication"
                component={CommunicationQualityPage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/individual"
                component={IndividualContributionPage}
            />
            <ProtectedRoute
                auth={this.props.isLogin}
                exact={true}
                path="/config"
                component={ProjectSettingsPage}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AppLayout>
    );
  }
}

function mapState(state) {
  return {
    isLogin: state.user.isLogin,
  };
}
const actionCreators = {};

export const PageRouter = withCookies(connect(mapState, actionCreators)(Home));