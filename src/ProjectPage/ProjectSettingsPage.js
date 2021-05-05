import React from "react";
import Banner from "../_utils/Banner";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import { commonConstants } from "../_constants";

const input = {
  width: "642px",
  margin: "10px auto",
  borderRadius: "4px",
  padding: "4px",
};

const label = {
  width: "50px",
  textAlign: "left",
  fontWeight: "bold",
  margin: "10px",
};

let teamUrl = localStorage.getItem(commonConstants.TEAM_CONFIG_URL) ? JSON.parse(localStorage.getItem(commonConstants.TEAM_CONFIG_URL)) : {};


class ProjectSettingsPage extends React.Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props);

    this.state = {
      jiraWebsite: JSON.stringify(teamUrl) == '{}' ? "" : teamUrl.jira_url,
      githubWebsite: JSON.stringify(teamUrl) == '{}' ? "" : teamUrl.git_url,
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
    this.props.setTeamUrl(
      "COMP900822021SM1SP",
      this.state.jiraWebsite,
      this.state.githubWebsite
    );
    e.preventDefault();
  }

  render() {
    return (
      <div class="uomcontent">
        {uomHeader("Project Configuration")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="2021-SM1-Software-Project-Database" />
            <Spin spinning={this.props.requestSetTeamUrl}>
              <div className="web">
                <form onSubmit={this.handleSubmit}>
                  <label style={label}>
                    Git:
                    <input
                      type="text"
                      style={input}
                      value={this.state.githubWebsite}
                      name="githubWebsite"
                      onChange={this.handleChange}
                    />
                  </label>

                  <br />

                  <label style={label}>
                    Jira:
                    <input
                      type="text"
                      style={input}
                      value={this.state.jiraWebsite}
                      name="jiraWebsite"
                      onChange={this.handleChange}
                    />
                  </label>

                  <br />

                  <div style={{textAlign:"right"}} id="savechanges">
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
    requestSetTeamUrl: state.user.requestSetTeamUrl,
    teamUrl: state.user.teamUrl,
  };
}

const actionCreators = {
  setTeamUrl: userActions.setTeamUrl,
};

const settingPage = connect(mapState, actionCreators)(ProjectSettingsPage);
export { settingPage as ProjectSettingsPage };
