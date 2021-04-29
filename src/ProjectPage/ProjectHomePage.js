import React, { Component } from "react";
import { connect } from "react-redux";
import uomHeader from "../header/uomheader.js";
import { storeGet } from "../_helpers/helper-funcs";
import { userActions } from "../_actions";
import Table from "../_utils/Table";
import Banner from "../_utils/Banner";
import { commonConstants } from "../_constants";


const team =  "SWEN90013-2020-SP";

class ProjectHomePage extends Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      teamList: "", 
      
      //state is by default an object
      data: [],
      //   {student: "Student 1", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004225/64775568-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 123423, email_address: "student1@student.unimleb.edu.au"},
      //   {student: "Student 2", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004227/64775584-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 423456, email_address: "student2@student.unimleb.edu.au"},
      //   {student: "Student 3", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004256/64775431-happy-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 234789, email_address: "student3@student.unimleb.edu.au"},
      //   {student: "Student 4", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004225/64775568-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 122343, email_address: "student4@student.unimleb.edu.au"},
      //   {student: "Student 5", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004227/64775584-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 623452, email_address: "student5@student.unimleb.edu.au"},
      //   {student: "Student 6", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004256/64775431-happy-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 343789, email_address: "student6@student.unimleb.edu.au"},
      //   {student: "Student 7", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004225/64775568-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 89123, email_address: "student7@student.unimleb.edu.au"},
      //   {student: "Student 8", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004227/64775584-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 983456, email_address: "student8@student.unimleb.edu.au"},
      //   {student: "Student 9", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004256/64775431-happy-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 71289, email_address: "student9@student.unimleb.edu.au"},
 
      // ],

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
  
  // handleSubmitTeamList(e) {
  //   e.preventDefault();
  //   this.props.getTeamList(team);
  //   console.log(storeGet("teamList"));
  //   this.setState({ teamList: storeGet("teamList") });
  //   console.log(this.state.teamList);
  //   this.setState({ submitted: true });
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleSubmitTeamList(e) {
    this.props.getTeamList(team);
    this.setState({ teamList: storeGet("teamList") });
    this.setState({ processSubmitted: true });
  }
  componentDidMount() {
    this.props.getTeamList("COMP900822021SM1SP");
  }



  // renderTableHeader() {
  //   let header = Object.keys(this.state.teamList[0]);
  //   return header.map((key, index) => {
  //     return <th key={index}>{key.toUpperCase()}</th>;
  //   });
  // }



  render() {
    return (
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main" >
          <div className="page-inner" >
            <Banner projName="2021-SM1-Software-Project-Database" />
            <Table columns={this.state.columns} data={this.props.teamList} title={"Student Information"} width="100vw" height="500vh"/>
          </div>
        </div>
      </div>
    );
  }
}


function mapState(state) {
  return {
    requestTeamList: state.user.requestTeamList,
    teamList: state.user.teamList,
  };
}
const actionCreators = {
  getTeamList: userActions.getTeamList,
};

const ProjectHome = connect(mapState, actionCreators)(ProjectHomePage);
export { ProjectHome as ProjectHomePage };
