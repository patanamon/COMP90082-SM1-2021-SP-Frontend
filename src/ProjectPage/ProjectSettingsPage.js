import React from "react";
import Banner from "../_utils/Banner";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import { Input } from "antd";
import { alertConstants } from "../_constants";
import { InformationalNote } from "../_utils/Alert";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const input = {
  width: "642px",
  margin: "10px auto",
  borderRadius: "4px",
  padding: "8px",
};

const label = {
  width: "50px",
  textAlign: "left",
  fontWeight: "bold",
  margin: "10px",
};

class ProjectSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jiraWebsite:
        this.props.teamInfo &&
        this.props.teamInfo[this.props.currentTeamKey] &&
        this.props.teamInfo[this.props.currentTeamKey].jiraUrl
          ? this.props.teamInfo[this.props.currentTeamKey].jiraUrl
          : "",
      githubWebsite:
        this.props.teamInfo &&
        this.props.teamInfo[this.props.currentTeamKey] &&
        this.props.teamInfo[this.props.currentTeamKey].githubUrl
          ? this.props.teamInfo[this.props.currentTeamKey].githubUrl
          : "",
      githubUsername:
        this.props.teamInfo &&
        this.props.teamInfo[this.props.currentTeamKey] &&
        this.props.teamInfo[this.props.currentTeamKey].githubUsername
          ? this.props.teamInfo[this.props.currentTeamKey].githubUsername
          : "",
      githubPassword:
        this.props.teamInfo &&
        this.props.teamInfo[this.props.currentTeamKey] &&
        this.props.teamInfo[this.props.currentTeamKey].githubPassword
          ? this.props.teamInfo[this.props.currentTeamKey].githubPassword
          : "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!/^(?:http(s)?:\/\/)/.test(this.state.jiraWebsite)) {
      alert(alertConstants.INVALID_JIRA_URL);
    } else if (!/^(?:http(s)?:\/\/)/.test(this.state.githubWebsite)) {
      alert(alertConstants.INVALID_GITHUB_URL);
    } else if (this.state.githubUsername == "") {
      alert(alertConstants.GIT_USERNAME_REQUIRED);
    } else if (this.state.githubPassword == "") {
      alert(alertConstants.GIT_PASSWORD_REQUIRED);
    } else {
      this.props
        .setTeamInfo(
          this.props.currentTeamKey,
          this.state.jiraWebsite,
          this.state.githubWebsite,
          this.state.githubUsername,
          this.state.githubPassword
        )
        .then(() => {
          if (!this.props.setTeamInfoSuccess) {
            this.setState({
              jiraWebsite:
                this.props.teamInfo &&
                this.props.teamInfo[this.props.currentTeamKey] &&
                this.props.teamInfo[this.props.currentTeamKey].jiraUrl
                  ? this.props.teamInfo[this.props.currentTeamKey].jiraUrl
                  : "",
              githubWebsite:
                this.props.teamInfo &&
                this.props.teamInfo[this.props.currentTeamKey] &&
                this.props.teamInfo[this.props.currentTeamKey].githubUrl
                  ? this.props.teamInfo[this.props.currentTeamKey].githubUrl
                  : "",
              githubUsername:
                this.props.teamInfo &&
                this.props.teamInfo[this.props.currentTeamKey] &&
                this.props.teamInfo[this.props.currentTeamKey].githubUsername
                  ? this.props.teamInfo[this.props.currentTeamKey]
                      .githubUsername
                  : "",
              githubPassword:
                this.props.teamInfo &&
                this.props.teamInfo[this.props.currentTeamKey] &&
                this.props.teamInfo[this.props.currentTeamKey].githubPassword
                  ? this.props.teamInfo[this.props.currentTeamKey]
                      .githubPassword
                  : "",
            });
          }
        });
    }
  }

  render() {
    return (
      <div className="uomcontent">
        {uomHeader("Project Configuration")}
        <div role="main">
          <div className="page-inner">
            <Banner projName={this.props.currentTeamName} />
            <div style={{ marginBottom: "20px" }}>
              <InformationalNote message={alertConstants.WAIT_AFTER_CONFIG} />
            </div>
            <Spin spinning={this.props.requestSetTeamInfo}>
              <div className="web">
                <form onSubmit={this.handleSubmit}>
                  <label style={label}>
                    Jira Url:
                    <Input
                      type="text"
                      style={input}
                      value={this.state.jiraWebsite}
                      name="jiraWebsite"
                      onChange={this.handleChange}
                      placeholder="e.g. https://jira.cis.unimelb.edu.au:8444/projects/<project key>/summary"
                    />
                  </label>

                  <br />

                  <label style={label}>
                    Git Url:
                    <Input
                      type="text"
                      style={input}
                      value={this.state.githubWebsite}
                      name="githubWebsite"
                      onChange={this.handleChange}
                      placeholder="e.g. https://github.com/<username>/<repository name>"
                    />
                  </label>

                  <br />

                  <label style={label}>
                    Git Username:
                    <Input
                      type="text"
                      style={input}
                      value={this.state.githubUsername}
                      name="githubUsername"
                      onChange={this.handleChange}
                    />
                  </label>

                  <br />

                  <label style={label}>
                    Git Password:
                    <Input.Password
                      style={input}
                      value={this.state.githubPassword}
                      name="githubPassword"
                      onChange={this.handleChange}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                  </label>

                  <div style={{ textAlign: "right" }} id="savechanges">
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
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
    requestSetTeamInfo: state.user.requestSetTeamInfo,
    teamInfo: state.user.teamInfo,
    currentTeamKey: state.user.currentTeamKey,
    currentTeamName: state.user.currentTeamName,
    setTeamInfoSuccess: state.user.setTeamInfoSuccess,
  };
}

const actionCreators = {
  setTeamInfo: userActions.setTeamInfo,
};

const settingPage = connect(mapState, actionCreators)(ProjectSettingsPage);
export { settingPage as ProjectSettingsPage };
