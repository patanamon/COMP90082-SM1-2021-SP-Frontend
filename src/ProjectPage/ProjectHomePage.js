import React, { Component } from "react";
import { connect } from "react-redux";
import uomHeader from "../header/uomheader.js";
import { storeGet } from "../_helpers/helper-funcs";
import { userActions } from "../_actions";
import Table from "../_utils/Table";


const team = 1;
// var bigImg = document.createElement("img");     //创建一个img元素
// bigImg.src="unimelb_logo.jpg"; 
// bigImg.width = 320

class ProjectHomePage extends Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      teamList: [{ student_id: 0, fullname: "", email: "" }],
      submitted: true,
      data: [
        { id: 1, student: "Student 1", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004225/64775568-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 123, email_address: "student1@student.unimleb.edu.au"},
        { id: 2, student: "Student 2", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004227/64775584-teen-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 456, email_address: "student2@student.unimleb.edu.au"},
        { id: 3, student: "Student 3", profile:<img alt='Avatar' width='40' src="https://previews.123rf.com/images/djvstock/djvstock1610/djvstock161004256/64775431-happy-boy-character-avatar-vector-illustration-design.jpg"/>, student_id: 789, email_address: "student3@student.unimleb.edu.au"},
      ],

      columns: [
        {
          name: "Name",
          selector: "student",
          center: true,
          sortable: true,
        },

        {
          name: "Profile",
          selector: "profile",
          center: true,
          sortable: true,
        },

        {
          name: "Student ID",
          selector: "student_id",
          center: true,
          sortable: true,
        },

        {
          name: "Email Address",
          selector: "email_address",
          center: true,
          sortable: true,
        },
      ],
    };
    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitTeamList = this.handleSubmitTeamList.bind(this);
  }

  handleSubmitTeamList(e) {
    e.preventDefault();
    this.props.getTeamList(team);
    console.log(storeGet("teamList"));
    this.setState({ teamList: storeGet("teamList") });
    console.log(this.state.teamList);
    this.setState({ submitted: true });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.teamList[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.teamList.map((teamList, index) => {
      const { student_id, fullname, email } = teamList; //destructuring
      return (
        <tr key={fullname}>
          <td>{student_id}</td>
          <td>{fullname}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  render() {
    const { submitted } = this.state;
    return (
      <div className="uomcontent">
        {uomHeader("Project Overview")}
        <div role="main">
          <div className="page-inner">
            <Table columns={this.state.columns} data={this.state.data} title={"Student Information"}/>
            {/* <a className="button cta" onClick={this.handleSubmitTeamList} >Get Team List</a>
                        {submitted && <table id='projects' className="zebra" data-sortable="">
                            <h2>Team Member List</h2>
                            <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {this.renderTableData()}
                            </tbody>
                        </table>
                        } */}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { teamList } = state;
  return { teamList };
}

const actionCreators = {
  getTeamList: userActions.getTeamList,
};

const ProjectHome = connect(mapState, actionCreators)(ProjectHomePage);
export { ProjectHome as ProjectHomePage };
