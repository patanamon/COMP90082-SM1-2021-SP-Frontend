import React from "react";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { storeGet } from "../_helpers/helper-funcs.js";
import { Nav, Tab, Col, Row, Container, Form } from "react-bootstrap";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

import "./IndividualContributionPage.css";

const team = 1;
const teamName = "SWEN90013-2020-SP";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const styles = {
  container: {
    padding: "30px",
  },
  navLink: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "none",
    fontSize: "25px",
  },
  label: {
    color: "rgb(1, 64, 133)",
    fontSize: "25px",
  },
  box: {
    textAlign: "center",
    textAlign: "center",
    margin: "auto",
    border: "2px solid lightgray",
    borderRadius: "10px",
    padding: "20px",
  },
  chart: {
    margin: "10px auto",
  },
  percent: {
    position: "absolute",
    top: "45%",
    left: "37%",
    fontSize: "100px",
    color: "gray",
  },
};

class IndividualContributionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      jirasubmitted: false,
      slacksubmitted: false,
      confluencesubmitted: false,
      gitsubmitted: false,
      total: [{ student_id: "", fullname: "" }],
      Data: [
        {
          name: "Sara1",
          git: 30,
          jira: 24,
          slack: 15,
          confluence: 61,
          fill: "deepskyblue",
        },
        {
          name: "Sara2",
          git: 20,
          jira: 44,
          slack: 25,
          confluence: 63,
          fill: "deepskyblue",
        },
        {
          name: "Sara3",
          git: 40,
          jira: 34,
          slack: 50,
          confluence: 36,
          fill: "deepskyblue",
        },
        {
          name: "Sara4",
          git: 50,
          jira: 19,
          slack: 25,
          confluence: 46,
          fill: "deepskyblue",
        },
        {
          name: "Sara5",
          git: 60,
          jira: 31,
          slack: 35,
          confluence: 56,
          fill: "deepskyblue",
        },
      ],
      selected: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleJiraSubmit = this.handleJiraSubmit.bind(this);
    this.handleSlackSubmit = this.handleSlackSubmit.bind(this);
    this.handleGitSubmit = this.handleGitSubmit.bind(this);
    this.handleConfluenceSubmit = this.handleConfluenceSubmit.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleJiraSubmit(e) {
    e.preventDefault();
    const { projectName } = this.state;

    this.props.getTeamList(team);

    if (this.state.jirasubmitted === true) {
      this.setState({ jirasubmitted: false });
    } else if (this.state.jirasubmitted === false) {
      this.setState({ jirasubmitted: true });
    }

    if (storeGet("teamList") != null) {
      for (var i in storeGet("teamList")) {
        // Get the member's configuration

        this.props.getMemberConfiguration(
          projectName,
          storeGet("teamList")[i].student_id
        );
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(storeGet("memberConfig"));

        // Get the full name
        this.state.Data[i].name = storeGet("teamList")[i].fullname;
        console.log(this.state.Data[i].name);

        //Get SLACK - need User ID
        this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
        //Get JIRA data - need User ID
        this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

        // TODO
        // Get Git Data - need Git Username, currently hardcoded
        this.props.codeCommitsPerMember(projectName, "zhanglihuan");
        // TODO
        //Get Conflunece Data - need Username, currently hardcoded
        this.props.numPagesPerMember("yujuzhang");

        if (storeGet("jiraUser") != null) {
          this.props.Data[i].jira = storeGet("jiraUser")["count_issues_done"];
        }
      }
    }
  }

  handleSlackSubmit(e) {
    e.preventDefault();
    const { projectName } = this.state;
    if (this.state.slacksubmitted === true) {
      this.setState({ slacksubmitted: false });
    } else if (this.state.slacksubmitted === false) {
      this.setState({ slacksubmitted: true });
    }
    this.props.getTeamList(team);
    if (storeGet("teamList") != null) {
      for (var i in storeGet("teamList")) {
        // Get the member's configuration

        this.props.getMemberConfiguration(
          projectName,
          storeGet("teamList")[i].student_id
        );
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(storeGet("memberConfig"));

        // Get the full name
        this.state.Data[i].name = storeGet("teamList")[i].fullname;
        console.log(this.state.Data[i].name);

        //Get SLACK - need User ID
        this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
        //Get JIRA data - need User ID
        this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

        // TODO
        // Get Git Data - need Git Username, currently hardcoded
        this.props.codeCommitsPerMember(projectName, "zhanglihuan");
        // TODO
        //Get Conflunece Data - need Username, currently hardcoded
        this.props.numPagesPerMember("yujuzhang");
        if (storeGet("slackUser") != null) {
          this.state.Data[i].slack = storeGet("slackUser")["total_number"];
        }
      }
    }
  }

  handleGitSubmit(e) {
    e.preventDefault();
    const { projectName } = this.state;

    this.props.getTeamList(team);

    if (this.state.gitsubmitted === true) {
      this.setState({ gitsubmitted: false });
    } else if (this.state.gitsubmitted === false) {
      this.setState({ gitsubmitted: true });
    }

    if (storeGet("teamList") != null) {
      for (var i in storeGet("teamList")) {
        // Get the member's configuration

        this.props.getMemberConfiguration(
          projectName,
          storeGet("teamList")[i].student_id
        );
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(storeGet("memberConfig"));

        // Get the full name
        this.state.Data[i].name = storeGet("teamList")[i].fullname;
        console.log(this.state.Data[i].name);

        //Get SLACK - need User ID
        this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
        //Get JIRA data - need User ID
        this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

        // TODO
        // Get Git Data - need Git Username, currently hardcoded
        this.props.codeCommitsPerMember(projectName, "zhanglihuan");
        // TODO
        //Get Conflunece Data - need Username, currently hardcoded
        this.props.numPagesPerMember("yujuzhang");

        if (storeGet("gitUsers") != null) {
          this.state.Data[i].gitCommit = storeGet("gitUsers")[
            "total_count"
          ].total;
        }
      }
    }
  }

  handleConfluenceSubmit(e) {
    e.preventDefault();
    const { projectName } = this.state;

    this.props.getTeamList(team);

    if (this.state.confluencesubmitted === true) {
      this.setState({ confluencesubmitted: false });
    } else if (this.state.confluencesubmitted === false) {
      this.setState({ confluencesubmitted: true });
    }

    if (storeGet("teamList") != null) {
      for (var i in storeGet("teamList")) {
        // Get the member's configuration

        this.props.getMemberConfiguration(
          projectName,
          storeGet("teamList")[i].student_id
        );
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(storeGet("memberConfig"));

        // Get the full name
        this.state.Data[i].name = storeGet("teamList")[i].fullname;
        console.log(this.state.Data[i].name);

        //Get SLACK - need User ID
        this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
        //Get JIRA data - need User ID
        this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

        // TODO
        // Get Git Data - need Git Username, currently hardcoded
        this.props.codeCommitsPerMember(projectName, "zhanglihuan");
        // TODO
        //Get Conflunece Data - need Username, currently hardcoded
        this.props.numPagesPerMember("yujuzhang");

        if (storeGet("confluenceUsers") != null) {
          this.state.Data[i].gitCommit = storeGet("confluenceUsers")[
            "total_count"
          ].total;
        }
      }
    }
  }

  selectStudent(e) {
    this.setState({ selected: e.target.value });
  }

  render() {
    const {
      Data,
      selected,
    } = this.state;

    const Student = () => {
      return (
        <Form inline>
          <Form.Label
            className="col-sm-3"
            htmlFor="inlineFormCustomSelectPref"
            style={styles.label}
          >
            Student     :
          </Form.Label>
          <Form.Control
            as="select"
            className="col-sm-5"
            id="inlineFormCustomSelectPref"
            custom
            onChange={this.selectStudent}
          >
            {Data.map((student, index) => (
              <option value={index}>{student.name}</option>
            ))}
          </Form.Control>
        </Form>
      );
    };

    return (
      <div className="uomcontent">
        {uomHeader("Individual Contribution Page")}
        <div role="main">
          <div className="page-inner">
            <Container style={styles.container}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="jira">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item onClick={this.handleJiraSubmit}>
                        <Nav.Link style={styles.navLink} eventKey="jira">
                          Jira
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={this.handleSlackSubmit}>
                        <Nav.Link style={styles.navLink} eventKey="slack">
                          Slack
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={this.handleGitSubmit}>
                        <Nav.Link style={styles.navLink} eventKey="git">
                          Git
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item onClick={this.handleConfluenceSubmit}>
                        <Nav.Link style={styles.navLink} eventKey="confluence">
                          Confluence
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="jira">
                        <Row>
                          <Col sm={12}>{Student()}</Col>
                          <Col sm={6} style={styles.box}>
                            {this.renderChartHeader()}
                            {/* <h3>This is Jira Chart</h3> */}
                            {this.renderChart(selected)}
                          </Col>
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="slack">
                        <Row>
                          <Col sm={12}>{Student()}</Col>
                          <Col sm={6} style={styles.box}>
                            {this.renderSlackChartHeader()}
                            {/* <h3>This is Slack Chart</h3> */}
                            {this.renderSlackChart(selected)}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="git">
                        <Row>
                          <Col sm={12}>{Student()}</Col>
                          <Col sm={6} style={styles.box}>
                            {this.renderGitChartHeader()}
                            {/* <h3>This is Git Chart</h3> */}
                            {this.renderGitChart(selected)}
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="confluence">
                        <Row>
                          <Col sm={12}>{Student()}</Col>
                          <Col sm={6} style={styles.box}>
                            {this.renderConfluenceChartHeader()}
                            {/* <h3>This is Confluence Chart</h3> */}
                            {this.renderConfluenceChart(selected)}
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </div>
        </div>
      </div>
    );
  }

  renderChartHeader() {
    let header = ["Jira Chart"]; //, 'Radar Chart'];
    return header.map((key, index) => {
      return <h1>{key}</h1>;
    });
  }
  renderSlackChartHeader() {
    let header = ["Slack Chart"]; //, 'Radar Chart'];
    return header.map((key, index) => {
      return <h1>{key}</h1>;
    });
  }
  renderGitChartHeader() {
    let header = ["Git Chart"]; //, 'Radar Chart'];
    return header.map((key, index) => {
      return <h1>{key}</h1>;
    });
  }
  renderConfluenceChartHeader() {
    let header = ["Confluence Chart"]; //, 'Radar Chart'];
    return header.map((key, index) => {
      return <h1>{key}</h1>;
    });
  }

  renderChart(index) {
    let data = [
      this.state.Data[index],
      {
        name: "Other",
        jira: 100 - this.state.Data[index].jira,
        fill: "lightgray",
      },
    ];
    return (
      <div>
        <PieChart width={360} height={350} style={styles.chart}>
          <Pie
            dataKey="jira"
            isAnimationActive={true}
            data={data}
            startAngle={90}
            endAngle={-270}
            outerRadius={150}
            innerRadius={100}
            fill="#8884d8"
          />
          {/* <Tooltip /> */}
        </PieChart>
        <span style={styles.percent}>{data[0].jira}</span>
      </div>
    );
  }
  renderSlackChart(index) {
    let data = [
      this.state.Data[index],
      {
        name: "Other",
        slack: 100 - this.state.Data[index].slack,
        fill: "lightgray",
      },
    ];
    return (
      <div>
        <PieChart width={360} height={350} style={styles.chart}>
          <Pie
            dataKey="slack"
            isAnimationActive={true}
            data={data}
            startAngle={90}
            endAngle={-270}
            outerRadius={150}
            innerRadius={100}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
        <span style={styles.percent}>{data[0].slack}</span>
      </div>
    );
  }
  renderGitChart(index) {
    let data = [
      this.state.Data[index],
      {
        name: "Other",
        git: 100 - this.state.Data[index].git,
        fill: "lightgray",
      },
    ];
    return (
      <div>
        {" "}
        <PieChart width={360} height={350} style={styles.chart}>
          <Pie
            dataKey="git"
            isAnimationActive={true}
            data={data}
            startAngle={90}
            endAngle={-270}
            outerRadius={150}
            innerRadius={100}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
        <span style={styles.percent}>{data[0].git}</span>
      </div>
    );
  }
  renderConfluenceChart(index) {
    let data = [
      this.state.Data[index],
      {
        name: "Other",
        confluence: 100 - this.state.Data[index].confluence,
        fill: "lightgray",
      },
    ];
    return (
      <div>
        <PieChart width={360} height={350} style={styles.chart}>
          <Pie
            dataKey="confluence"
            isAnimationActive={true}
            data={data}
            startAngle={90}
            endAngle={-270}
            outerRadius={150}
            innerRadius={100}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
        <span style={styles.percent}>{data[0].confluence}</span>
      </div>
    );
  }
}

function mapState(state) {
  const { projectName } = state;
  return { projectName };
}

const actionCreators = {
  loginGit: userActions.loginGit,
  totalCodeCommits: userActions.totalCodeCommits,
  codeCommitsPerMember: userActions.codeCommitsPerMember,
  AllPagesOnConfluence: userActions.AllPagesOnConfluence,
  getTeamList: userActions.getTeamList,
  getMemberConfiguration: userActions.getMemberConfiguration,
  getSlackUser: userActions.getSlackUser,
  getJiraUser: userActions.getJiraUser,
  numPagesPerMember: userActions.numPagesPerMember,
};

const Product = connect(mapState, actionCreators)(IndividualContributionPage);
export { Product as IndividualContributionPage };
