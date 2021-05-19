import React, { Component } from "react";
import { connect } from "react-redux";
import uomHeader from "../header/uomheader.js";
import { storeGet } from "../_helpers/helper-funcs";
import { userActions } from "../_actions";
import Table from "../_utils/Table";
import Banner from "../_utils/Banner";

const team =  "SWEN90013-2020-SP";


class ProjectHomePage extends Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      teamList: "", 
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
          cell: row => <img alt='Avatar' width='40' src={row.picture}></img>,
 
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
  }
  componentDidMount() {
    this.props.getTeamMemberList("VIS3");
    this.props.getTeamMemberNumber("VIS3");
  }

  render() {
    
    if(this.props.teamMemberNumber<30){
    return (
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main" >
          <div className="page-inner" >
            <Banner projName={this.props.currentTeamKey} />
            <Table columns={this.state.columns} data={this.props.teamMemberList} title={"Student Information"} width="100vw" height="500vh"/>
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
  };
}
const actionCreators = {
  getTeamMemberList: userActions.getTeamMemberList,
  getTeamMemberNumber: userActions.getTeamMemberNumber,
};

const ProjectHome = connect(mapState, actionCreators)(ProjectHomePage);
export { ProjectHome as ProjectHomePage };
