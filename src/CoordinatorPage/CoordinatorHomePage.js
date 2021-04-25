import React, { Component } from 'react';
import './CoordinatorHomePage.css';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux'; 
import { userActions } from '../_actions';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Select from "react-select";
import { render } from "react-dom";
import { projects } from "./ProjectList";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Banner from "../_utils/Banner";
import DTable from '../_utils/Table';

var NameResults = [];
var LinkResults = [];
var FinalNameResult = [];
var FinalLinkResult = [];

function uniq(arr, item) {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
  }
  return arr;
}

function del(arr, item){
  arr.splice(arr.indexOf(item), 1);
  return arr;
}

class CoordinatorHomePage extends Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { project: "", show: false };
    }
    handleImport() {
    for (let i = 0; i < NameResults.length; i++) {
      if (FinalNameResult.indexOf(NameResults[i]) === -1) {
        FinalNameResult.push(NameResults[i]);
        FinalLinkResult.push(LinkResults[i]);
      }
    }
    NameResults = [];
    LinkResults = [];
    this.setState({ show: true });
  }


  handleChange = (project) => {
    console.log(project.label);
    this.setState({ project });
    uniq(NameResults, project.label);
    uniq(LinkResults, project.link);
    console.log(NameResults);
    console.log(FinalNameResult);
    
  };

  //TODO waiting API format for deleting function
   handleDelete = (project) => {
    this.setState({project});
    console.log( project + " deleted");
    del(NameResults, project);
    //del(LinkResults, project.link);
    console.log(NameResults);
  };

    render() {
        
        return (
            <div class="uomcontent">
                {uomHeader("Homepage")}
                    <div role="main">
                        <div className="page-inner">
                            <Banner projName="Project Management" />
                            <div className="App">


        <div id="select">
          <Select
            labelInValue
            name="projects"
            options={projects}
            className="ProjectList"
            placeholder="Select projects"
            onChange={this.handleChange}
          />
        </div>
        <div id="selected" className="Selected">
          <TableContainer component={Paper}>
            <Table className = "project_table" aria-label="customized table">
              <TableHead>
                <TableRow >
                  <TableCell>Project Imported</TableCell>
                  <TableCell align="right">Confluence Link</TableCell>
                  <TableCell align = "right"> Operation </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {NameResults.map((row) => (
                  <TableRow key={row}>
                    <TableCell component="th" scope="row">
                    <a href = {LinkResults[NameResults.indexOf(row)]}>
                          {row}
                        </a>
                    </TableCell>
                    <TableCell align="right">
                          {LinkResults[NameResults.indexOf(row)]}
                        </TableCell>
                        <TableCell align="right">
                        <div id="button">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.handleDelete(row);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                        </TableCell>
                          
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </div>


      </div>

                        </div>
                </div>
            </div>

        )
    }
}

function mapState(state) {
    const { username, offset } = state;
    return { username, offset };
}

const actionCreators = {
    getCoordinatorHomepage: userActions.getCoordinatorHomepage,
    getSupervisor: userActions.getSupervisor,
    setSupervisor: userActions.setSupervisor,
    setCoSupervisor: userActions.setCoSupervisor,
    getSupervisors: userActions.getSupervisors,
    getHomepage: userActions.getHomepage,
}

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
