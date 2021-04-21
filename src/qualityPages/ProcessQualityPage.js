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

      confluenceData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "Confluence Pages",
            data: [10, 20, 30, 40, 60],
          },
        ],
      },

      githubData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "Github Commits",
            data: [23, 27, 48, 55, 63],
          },
        ],
      },

      jiraData: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "To-do Items",
            data: [32, 25, 21, 17, 12],
          },
          {
            label: "Done Items",
            data: [0, 7, 13, 17, 22],
          },
        ],
      },

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
    this.handleSubmitConfluenceLogin = this.handleSubmitConfluenceLogin.bind(this);
    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
  }

  handleBtnGroupClick(e) {
    let selected = e.currentTarget.firstChild.innerHTML;
    this.setState({
        btnSelected: selected
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

  render() {
    const {
      confluenceLogged,
      processSubmitted,
      userProcessSubmitted,
      confluenceUsername,
      confluencePassword,
    } = this.state;
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
            {this.state.btnSelected == commonConstants.CONFLUENCE && 
              <LineChart data={this.state.confluenceData} />
            }
            {this.state.btnSelected == commonConstants.GITHUB && 
              <LineChart data={this.state.githubData} />
            }
            {this.state.btnSelected == commonConstants.JIRA && 
              <LineChart data={this.state.jiraData} />
            }
            {/* <form action="" method="get">
                            { (!confluenceLogged) &&
                            <fieldset>
                                <div className={'form-group' + (confluenceLogged && !confluenceUsername ? ' has-error' : '')}>
                                    <label htmlFor="username">Confluence Username</label>
                                    <input type="text" className="form-control" name="confluenceUsername" value={confluenceUsername} onChange={this.handleChange} />
                                    {confluenceLogged && !confluenceUsername &&
                                    <div className="help-block">Confluence Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (confluenceLogged && !confluencePassword ? ' has-error' : '')}>
                                    <label htmlFor="password">Confluence Password</label>
                                    <input type="password" className="form-control" name="confluencePassword" value={confluencePassword} onChange={this.handleChange} />
                                    {confluenceLogged && !confluencePassword &&
                                    <div className="help-block">Confluence Password is required</div>
                                    }
                                    {hint2()}
                                    <a className="button cta" onClick={this.handleSubmitConfluenceLogin} >Confluence Login</a>
                                </div>
                            </fieldset>
                            }
                            { confluenceLogged &&
                            <fieldset>
                                <div className="inline attached">
                                    <a className="button cta" onClick={this.handleSubmitJira} >Team JIRA</a>
                                    {this.renderPieGraph()}
                                </div>
                            </fieldset>
                            }

                            { confluenceLogged && processSubmitted &&
                            <table id='projects' className="zebra">
                                <tbody>
                                <tr>{this.renderJiraDataHeader()}</tr>
                                {this.renderJiraData()}
                                </tbody>
                            </table>
                            }

                            { confluenceLogged && userProcessSubmitted &&
                            <table id='projects' className="zebra">
                                <tbody>
                                <tr>{this.renderJiraUserDataHeader()}</tr>
                                {this.renderJiraUserData()}
                                </tbody>
                            </table>
                            }
                        </form> */}
          </div>
        </div>
      </div>
    );
  }
}

function hint2() {
  return (
    <p id="hint2">
      You need to input your Confluence username and password first, then this
      system can fetch data from Confluence.
    </p>
  );
}

function mapState(state) {
  const { subjectName, name } = state;
  return { subjectName, name };
}

const actionCreators = {
  loginConfluence: userActions.loginConfluence,
  getJiraTeam: userActions.getJiraTeam,
  getJiraUser: userActions.getJiraUser,
  getHomepage: userActions.getHomepage,
};

const qualityPage = connect(mapState, actionCreators)(ProcessQualityPage);
export { qualityPage as ProcessQualityPage };
