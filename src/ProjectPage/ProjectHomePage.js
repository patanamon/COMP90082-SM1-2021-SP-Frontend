import React, { Component } from "react";
import { connect } from "react-redux";
import uomHeader from "../header/uomheader.js";
import { userActions } from "../_actions";
import Table from "../_utils/Table";
import Banner from "../_utils/Banner";
import { Warining, InformationalNote } from "../_utils/Alert";
import { alertConstants } from "../_constants";

class ProjectHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      columns: [
        {
          name: "Name",
          selector: "name",
          center: true,
          sortable: true,
        },

        {
          name: "Profile",
          selector: "picture",
          center: true,
          sortable: true,
          cell: (row) => <img alt="Avatar" width="40" src={row.picture}></img>,
        },

        {
          name: "Student ID",
          selector: "id",
          center: true,
          sortable: true,
        },

        {
          name: "Email Address",
          selector: "email",
          center: true,
          sortable: true,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getTeamMemberList(this.props.currentTeamKey);
  }

  render() {
    return (
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main">
          <div className="page-inner">
            <Banner projName={this.props.currentTeamName} />
            {!this.props.teamMemberList && (
              <InformationalNote message={alertConstants.NO_DATA} />
            )}
            {this.props.teamMemberList &&
              this.props.teamMemberList.length >= 30 && (
                <Warining message={alertConstants.WRONG_CONFIG} />
              )}
            {this.props.teamMemberList &&
              this.props.teamMemberList.length >= 30 && (
              <Table
                columns={this.state.columns}
                data={this.props.teamMemberList.slice(0, 30)}
                width="80vw"
                height="50vh"
              />
            )}
            {this.props.teamMemberList &&
              this.props.teamMemberList.length < 30 && (
                <Table
                  columns={this.state.columns}
                  data={this.props.teamMemberList}
                  width="80vw"
                  height="50vh"
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    teamMemberList: state.user.teamMemberList,
    currentTeamKey: state.user.currentTeamKey,
    currentTeamName: state.user.currentTeamName,
  };
}
const actionCreators = {
  getTeamMemberList: userActions.getTeamMemberList,
};

const ProjectHome = connect(mapState, actionCreators)(ProjectHomePage);
export { ProjectHome as ProjectHomePage };
