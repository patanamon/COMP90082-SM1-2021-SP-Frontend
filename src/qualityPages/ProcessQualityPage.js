import React from "react";
import ButtonGroup from "../_utils/ButtonGroup";
import Banner from "../_utils/Banner";
import LineChart from "../_utils/LineChart";
import uomHeader from "../header/uomheader.js";
import { userActions } from "../_actions";
import { connect } from "react-redux";
import { storeGet } from "../_helpers/helper-funcs";
import { commonConstants } from "../_constants";

// team name from confluenceç
const teamName = "SWEN90013-2020-SP";
//user is student_id from our db
const user = 9020436;

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

      presentInfo: "Summary",

      //Empty Jira Team dict to populate
      jiraTeam: {
        team: "",
        count_issues_total: 0,
        count_issues_to_do: 0,
        count_issues_progress: 0,
        count_issues_in_review: 0,
        count_issues_done: 0,
        count_issues_review: 0,
      },

      jiraUser: {
        user: "",
        count_issues_total: 0,
        count_issues_to_do: 0,
        count_issues_progress: 0,
        count_issues_in_review: 0,
        count_issues_done: 0,
        count_issues_review: 0,
      },
      // The conflunece username and password
      confluenceUsername: "",
      confluencePassword: "",
      confluenceLogged: true,
      processSubmitted: true,
      userProcessSubmitted: true,

      //Dummy team data
      team: [
        { name: "Bach (Supervisor)", individualJira: "bach.le@unimelb.edu.au" },
        {
          name: "Zhaochen Fan",
          individualJira: "zhaochenf@student.unimelb.edu.au",
        },
        { name: "Yue Yang Ho", individualJira: "yho4@student.unimelb.edu.au" },
        { name: "Jinxin Hu", individualJira: "kinxinh@student.unimelb.edu.au" },
        { name: "Yu Qiu", individualJira: "yuqiu1@student.unimelb.edu.au" },
        {
          name: "Andre Simmonds",
          individualJira: "asimmonds@student.unimelb.edu.au",
        },
        { name: "Xinbo Sun", individualJira: "xinbos@student.unimelb.edu.au" },
        {
          name: "Jarren Toh",
          individualJira: "jarrent@student.unimelb.edu.au",
        },
        {
          name: "Kairou Wang",
          individualJira: "kairouw@student.unimelb.edu.au",
        },
        {
          name: "Lihuan Zhang",
          individualJira: "lihuganz@student.unimelb.edu.au",
        },
        {
          name: "Yujun Zhang",
          individualJira: "yujuzhang@student.unimelb.edu.au",
        },
      ],
    };

    this.fetchSummary = this.fetchSummary.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitJira = this.handleSubmitJira.bind(this);
    this.handleSubmitJiraUser = this.handleSubmitJiraUser.bind(this);
    this.handleSubmitConfluenceLogin = this.handleSubmitConfluenceLogin.bind(
      this
    );
    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
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

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  //Submit function to get Jira Team data and set it in State
  handleSubmitJira(e) {
    this.props.getJiraTeam(teamName);
    this.setState({ jiraTeam: storeGet("jiraTeam") });
    this.setState({ processSubmitted: true });
  }

  handleSubmitJiraUser(e) {
    this.props.getJiraUser(teamName, user);
    this.setState({ jiraUser: storeGet("jiraUser") });
    this.setState({ userProcessSubmitted: true });
  }

  //Confluence login
  handleSubmitConfluenceLogin(e) {
    e.preventDefault();

    this.setState({ confluenceLogged: true });
    const { confluenceUsername, confluencePassword } = this.state;
    this.props.loginConfluence(confluenceUsername, confluencePassword);
  }

  //Redner header for Jira Data
  renderJiraDataHeader() {
    //This one uses data headers, issues with positioning
    // let header = Object.keys(this.state.jiraTeam);
    // return header.map((key, index) => {
    //     return <th key={index}>{key.toUpperCase()}</th>
    // })

    //This header hard coded for better sizing
    let header = [
      "team",
      "total",
      "todo",
      "progress",
      "in_review",
      "done",
      "review",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  //Render Jira data
  renderJiraData() {
    var dict = this.state.jiraTeam;
    var tickets = [];

    for (var key in dict) {
      tickets.push(dict[key]);
    }
    return tickets.map((key, index) => {
      return <td key={index}>{key}</td>;
    });
  }

  //Redner header for Jira Data
  renderJiraUserDataHeader() {
    //This header hard coded for better sizing
    let header = [
      "user",
      "total",
      "todo",
      "progress",
      "in_review",
      "done",
      "review",
    ];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  //Render Jira user data
  renderJiraUserData() {
    var dict = this.state.jiraUser;
    var tickets = [];

    for (var key in dict) {
      tickets.push(dict[key]);
    }
    return tickets.map((key, index) => {
      return <td key={index}>{key}</td>;
    });
  }

  //Example render for team
  renderTeamTableHeader() {
    let header = Object.keys(this.state.team[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTeamTableData() {
    return this.state.team.map((team, index) => {
      const { name, individualJira } = team; //destructuring
      return (
        <tr key={name}>
          <td>{name}</td>
          <td>
            <a
              className="button-small brand"
              onClick={this.handleSubmitJiraUser}
            >
              Individual JIRA
            </a>
          </td>
        </tr>
      );
    });
  }

  getConfluenceSpace() {
    const react_this = this;
    var url = "/api/v1/confluence/space/SWEN900132020SP";
    var data = {
      space_key: "SWEN900132020SP",
    };

    console.log("NANI");
  }

  getPagesbyConflueceSpace() {
    const react_this = this;
    var url = "/api/v1/account/login";
    var data = {};
  }

  fetchSummary(e) {
    e.preventDefault();
    console.log("NANI");

    this.setState({ submitted: true });
    const { presentInfo } = this.state;
    this.getConfluenceSpace();
    this.getPagesbyConflueceSpace();
    this.getAPageAndItsContributors();
    this.getAllAccessibleUserGroups();
  }

  componentDidMount() {
    this.props.getTeamConfluencePages("COMP900822021SM1SP");
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
            />
            {this.state.btnSelected == commonConstants.CONFLUENCE && (
              <LineChart data={this.props.confluenceData} />
            )}
            {this.state.btnSelected == commonConstants.GITHUB && (
              <LineChart data={this.props.githubData} />
            )}
            {this.state.btnSelected == commonConstants.JIRA && (
              <LineChart data={this.props.jiraData} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
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
