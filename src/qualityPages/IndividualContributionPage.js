import React from "react";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { Tab, Col, Row, Container } from "react-bootstrap";
import ButtonGroup from "../_utils/ButtonGroup";
import { commonConstants } from "../_constants";
import { ToastContainer } from "react-toastify";
import Banner from "../_utils/Banner";
import DonutChart from "../_utils/DonutChart";
import DropdownMenus from "../_utils/DropdownMenus";
import { InformationalNote } from "../_utils/Alert";
import { alertConstants } from "../_constants";

class IndividualContributionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      btnNames: [
        commonConstants.CONFLUENCE,
        commonConstants.GITHUB,
        commonConstants.JIRA,
      ],
      btnSelected: commonConstants.CONFLUENCE,
      selectedStudent: "All",
      studentList: [],
      hasConfig:
        this.props.teamInfo && this.props.teamInfo[this.props.currentTeamKey],
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
  }

  handleBtnGroupClick(e) {
    let picked = e.currentTarget.firstChild.innerHTML;
    if (picked === commonConstants.CONFLUENCE) {
      this.props.getConfluenceIndividualData(this.props.currentTeamKey);
    } else if (picked === commonConstants.GITHUB) {
      this.props.getGithubIndividualData(this.props.currentTeamKey);
    } else {
      this.props.getJiraIndividualData(this.props.currentTeamKey);
    }
    this.setState({
      btnSelected: picked,
      selectedStudent: "All",
    });
  }

  selectStudent(e) {
    this.setState({ selectedStudent: e.target.value });
  }

  componentDidMount() {
    if (this.state.hasConfig) {
      this.props.getConfluenceIndividualData(this.props.currentTeamKey);
    }
  }

  render() {
    return (
      <div className="uomcontent">
        <ToastContainer limit={1} />
        {uomHeader("Individual Contribution")}
        <div role="main">
          <div className="page-inner">
            <Banner projName={this.props.currentTeamName} />
            {!this.state.hasConfig && (
              <InformationalNote message={alertConstants.NO_CONFIG} />
            )}
            {this.state.hasConfig && (
              <Container>
                <Tab.Container id="left-tabs-example">
                  <Row>
                    <Col>
                      <ButtonGroup
                        btnNames={this.state.btnNames}
                        clickHandler={this.handleBtnGroupClick}
                        selected={this.state.btnSelected}
                      />
                    </Col>
                    <Col>
                      {this.state.btnSelected === commonConstants.CONFLUENCE &&
                        typeof this.props.individualConfluenceData !==
                          "undefined" &&
                        JSON.stringify(this.props.individualConfluenceData) !==
                          "{}" && (
                          <DropdownMenus
                            data={
                              this.props.individualConfluenceData["All"].labels
                            }
                            onChange={this.selectStudent}
                            value={this.state.selectedStudent}
                          />
                        )}
                      {this.state.btnSelected === commonConstants.GITHUB &&
                        typeof this.props.individualGithubData !==
                          "undefined" &&
                        JSON.stringify(this.props.individualGithubData) !==
                          "{}" && (
                          <DropdownMenus
                            data={this.props.individualGithubData["All"].labels}
                            onChange={this.selectStudent}
                            value={this.state.selectedStudent}
                          />
                        )}

                      {this.state.btnSelected === commonConstants.JIRA &&
                        typeof this.props.individualJiraData !== "undefined" &&
                        JSON.stringify(this.props.individualJiraData) !==
                          "{}" && (
                          <DropdownMenus
                            data={this.props.individualJiraData["All"].labels}
                            onChange={this.selectStudent}
                            value={this.state.selectedStudent}
                          />
                        )}
                    </Col>
                    <Col>
                      {this.state.btnSelected === commonConstants.CONFLUENCE &&
                        typeof this.props.individualConfluenceData !==
                          "undefined" &&
                        JSON.stringify(this.props.individualConfluenceData) !==
                          "{}" && (
                          <DonutChart
                            data={JSON.parse(
                              JSON.stringify(
                                this.props.individualConfluenceData[
                                  this.state.selectedStudent
                                ]
                              )
                            )}
                            dataLabel={"Edited Pages"}
                          />
                        )}
                      {this.state.btnSelected === commonConstants.GITHUB &&
                        typeof this.props.individualGithubData !==
                          "undefined" &&
                        JSON.stringify(this.props.individualGithubData) !==
                          "{}" && (
                          <DonutChart
                            data={JSON.parse(
                              JSON.stringify(
                                this.props.individualGithubData[
                                  this.state.selectedStudent
                                ]
                              )
                            )}
                            dataLabel={"Number of Commits"}
                          />
                        )}
                      {this.state.btnSelected === commonConstants.JIRA &&
                        typeof this.props.individualJiraData !== "undefined" &&
                        JSON.stringify(this.props.individualJiraData) !==
                          "{}" && (
                          <DonutChart
                            data={JSON.parse(
                              JSON.stringify(
                                this.props.individualJiraData[
                                  this.state.selectedStudent
                                ]
                              )
                            )}
                            dataLabel={"Completed Tasks"}
                          />
                        )}
                    </Col>
                  </Row>
                </Tab.Container>
              </Container>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    individualGithubData: state.user.individualGitHubCommits,
    individualConfluenceData: state.user.individualConfluencePages,
    individualJiraData: state.user.individualJiraCounts,
    currentTeamKey: state.user.currentTeamKey,
    currentTeamName: state.user.currentTeamName,
    teamInfo: state.user.teamInfo,
  };
}

const actionCreators = {
  getGithubIndividualData: userActions.getGithubIndividualData,
  getConfluenceIndividualData: userActions.getConfluenceIndividualData,
  getJiraIndividualData: userActions.getJiraIndividualData,
};

const Product = connect(mapState, actionCreators)(IndividualContributionPage);
export { Product as IndividualContributionPage };
