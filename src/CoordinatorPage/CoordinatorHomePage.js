import React, { Component } from 'react';
import './CoordinatorHomePage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import '../unimelb.css';
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
    document.getElementById("alert").style.display = "none";
    console.log(project.label);
    this.setState({ project });
    uniq(NameResults, project.label);
    uniq(LinkResults, project.link);
    console.log(NameResults);
    console.log(FinalNameResult);
    document.getElementById("alert").style.display = "none";
  };

    render() {
        
        return (
            <div class="uomcontent">
                {uomHeader("Homepage")}
                    <div role="main">
                        <div className="page-inner">
                            <Banner projName="Project Management" />

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
                                <Table className="makeStyles" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    <TableCell>Project Selected</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {NameResults.map((row) => (
                                    <TableRow key={row}>
                                        <TableCell component="th" scope="row">
                                        {row}
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            </div>



                               <div className="AlertDiv" id="alert">
                                Imported!
                                </div>
        <div id="button" className = "ImportButton">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.handleImport();
              document.getElementById("alert").style.display = "block";
            }}
          >
            Import
          </Button>
        </div>
        <div>
          <div className="Import" id="import">
            <TableContainer component={Paper}>
              <Table className="makeStyles" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Project Name</TableCell>
                    <TableCell align="right">C-Link</TableCell>
                  </TableRow>
                </TableHead>
                {this.state.show ? (
                  <TableBody>
                    {FinalNameResult.map((row) => (
                      <TableRow key={row}>
                        <TableCell component="th" scope="row">
                          {row}
                        </TableCell>
                        <TableCell align="right">
                          {FinalLinkResult[FinalNameResult.indexOf(row)]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <p></p>
                )}
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
