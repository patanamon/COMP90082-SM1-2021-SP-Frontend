import React from "react";
import ButtonGroup from "../_utils/ButtonGroup";
import Banner from "../_utils/Banner";
import LineChart from "../_utils/LineChart";
import uomHeader from "../header/uomheader.js";
import { userActions } from "../_actions";
import { connect } from "react-redux";
import { commonConstants } from "../_constants";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";

class ProcessQualityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnNames: [
        commonConstants.CONFLUENCE,
        commonConstants.GITHUB,
        commonConstants.JIRA,
      ],

      btnSelected: commonConstants.CONFLUENCE,
      scrollPosition: 0,
    };

    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleBtnGroupClick(e) {
    let selected = e.currentTarget.firstChild.innerHTML;
    if (selected == commonConstants.CONFLUENCE) {
      this.props.getTeamConfluencePages("COMP900822021SM1SP");
    } else if (selected == commonConstants.GITHUB) {
      this.props.getTeamGithubCommits("COMP900822021SM1SP");
    } else {
      this.props.getTeamJiraTickets("COMP900822021SM1SP");
    }
    this.setState({
      btnSelected: selected,
    });
  }

  handleScroll() {
    this.setState({
      scrollPosition: window.pageYOffset,
    });
  }

  componentDidMount() {
    this.props.getTeamConfluencePages("COMP900822021SM1SP");
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {
    window.scrollTo(0, parseInt(this.state.scrollPosition));
  }

  render() {
    return (
      <div className="uomcontent">
        {uomHeader("Process Quality")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="2021-SM1-Software-Project-Database" />
            <ButtonGroup
              btnNames={this.state.btnNames}
              clickHandler={this.handleBtnGroupClick}
              selected={this.state.btnSelected}
            />
            <Spin
              spinning={
                this.props.requestTeamConfluencePages ||
                this.props.requestTeamGithubCommits ||
                this.props.requestTeamJiraTickets
              }
            >
              {this.state.btnSelected == commonConstants.CONFLUENCE && (
                <LineChart data={this.props.confluenceData} />
              )}
              {this.state.btnSelected == commonConstants.GITHUB && (
                <LineChart data={this.props.githubData} />
              )}
              {this.state.btnSelected == commonConstants.JIRA && (
                <LineChart data={this.props.jiraData} />
              )}
            </Spin>
          </div>
        </div>
        <ToastContainer limit={1} />
      </div>
    );
  }
}

function mapState(state) {
  return {
    requestTeamConfluencePages: state.user.requestTeamConfluencePages,
    requestTeamGithubCommits: state.user.requestTeamGithubCommits,
    requestTeamJiraTickets: state.user.requestTeamJiraTickets,
    confluenceData: state.user.teamConfluencePages,
    githubData: state.user.teamGithubCommits,
    jiraData: state.user.teamJiraTickets,
  };
}

const actionCreators = {
  getTeamConfluencePages: userActions.getTeamConfluencePages,
  getTeamGithubCommits: userActions.getTeamGithubCommits,
  getTeamJiraTickets: userActions.getTeamJiraTickets,
};

const qualityPage = connect(mapState, actionCreators)(ProcessQualityPage);
export { qualityPage as ProcessQualityPage };
