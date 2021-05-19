import React, { Component } from "react";
import { connect } from "react-redux";
import uomHeader from "../header/uomheader.js";
import { userActions } from "../_actions";
import Table from "../_utils/Table";
import Banner from "../_utils/Banner";
import { Warining } from "../_utils/Alert";
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
<<<<<<< HEAD
          cell: row => <img alt='Avatar' width='40' src={row.picture}></img>,
 
=======
          cell: (row) => <img alt="Avatar" width="40" src={row.picture}></img>,
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
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
<<<<<<< HEAD
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitTeamList = this.handleSubmitTeamList.bind(this);
  }
  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleSubmitTeamList(e) {
    this.props.getTeamMemberList(team);
    this.props.getTeamMemberNumber(team);
    this.setState({ teamList: storeGet("teamList") });
    this.setState({ processSubmitted: true });
=======
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
  }

  componentDidMount() {
<<<<<<< HEAD
    this.props.getTeamMemberList("VIS3");
    this.props.getTeamMemberNumber("VIS3");
=======
    this.props.getTeamMemberList(this.props.currentTeamKey);
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
  }

  render() {
    
    if(this.props.teamMemberNumber<30){
    return (
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main">
          <div className="page-inner">
            <Banner projName={this.props.currentTeamName} />
            {this.props.teamMemberList.length >= 30 && (
              <Warining message={alertConstants.WRONG_CONFIG} />
            )}
            {this.props.teamMemberList.length < 30 && (
              <Table
                columns={this.state.columns}
                data={this.props.teamMemberList}
                width="80vw"
                height="500vh"
              />
            )}
          </div>
        </div>
      </div>
    );
    }
    else{
      return(
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main" >
          <div className="page-inner" >
            <Banner projName="2021-SM1-Software-Project-Database" />
            <Alert message="The number of team member is out of range(30)."></Alert>
          </div>
        </div>
      </div>
      );
    }
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
  getTeamMemberNumber: userActions.getTeamMemberNumber,
};

const ProjectHome = connect(mapState, actionCreators)(ProjectHomePage);
export { ProjectHome as ProjectHomePage };
