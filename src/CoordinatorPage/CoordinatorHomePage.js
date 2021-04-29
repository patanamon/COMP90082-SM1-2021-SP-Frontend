import React, { Component } from 'react';
import './CoordinatorHomePage.css';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux'; 
import { userActions } from '../_actions';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Select , { components }from "react-select";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Banner from "../_utils/Banner";
import DTable from '../_utils/Table';

// temp store for vars
var KeyResults = [];
var NameResults = [];
var LinkResults = [];


var FinalNameResult = [];
var FinalLinkResult = [];

// check if the item present in results
function uniq(arr1,arr2,arr3, obj) {
  if (arr1.indexOf(obj.space_key) === -1){
    arr1.push(obj.space_key);
    arr2.push(obj.label);
    arr3.push(obj.link);

  }
    
}

// delete item from all results list
function del(arr1,arr2,arr3, item){
  arr2.splice(arr1.indexOf(item), 1);
  arr3.splice(arr1.indexOf(item), 1);
  arr1.splice(arr1.indexOf(item), 1);
}

// search icon SVG after the selecting box
const CaretDownIcon = () => {
  return <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/></svg>;
};

// search Icon component
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};

// style for dropdown results at search box
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, {isFocused }) => {
    return {
      ...styles,
      color:'black',
      backgroundColor: isFocused
        ? '#006fdc'
        : 'white',  
    };
  },
  input: styles => ({ ...styles}),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles) => ({ ...styles}),
};


// main export class
class CoordinatorHomePage extends Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { project: "", show: false };
    }
    // not works now, for import project actions
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

    // actions after item is selected : add to result if it absents 
  handleChange = (selectedProject) => {
    
    this.setState({ selectedProject });
    uniq(KeyResults,NameResults, LinkResults,selectedProject);
    /** 
    console.log(NameResults);
    console.log(FinalNameResult);
    */
  };

  // actions for removing specific item
   handleDelete = (key) => {
    this.setState({key});
    console.log( key + " deleted");
    del(KeyResults,NameResults,LinkResults, key);
  };

  componentDidMount() {
    this.props.getProjectInfo();
  }
  render() {
        return (
            <div class="uomcontent">
                {uomHeader("Homepage")}
                    <div role="main">
                        <div className="page-inner">
                            <Banner projName="Project Management" />
                            <div className="App">


        <div id="select" className = "Select_box">
          <Select

            styles={colourStyles}
            components={{ DropdownIndicator}}
            labelInValue
            isSearchable
            name="projects"
            //options={projects}
            options = {this.props.projectInfo}
            autoWidth = {true}
            className="ProjectList"
            placeholder="Search projects"
            onChange={this.handleChange}
          />
        </div>

        <div id="selected" className="Selected">
              <TableContainer >
                <Table className = "project_table" aria-label="customized table">
                  <TableHead>
                    <TableRow >
                      <TableCell>Project Imported</TableCell>
                      <TableCell align="right">Confluence Link</TableCell>
                      <TableCell align = "right"> Operation </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {KeyResults.map((row) => (
                      <TableRow key={row}>
                        <TableCell component="th" scope="row">
                        <a href = {LinkResults[KeyResults.indexOf(row)]}>
                              {NameResults[KeyResults.indexOf(row)]}
                            </a>
                        </TableCell>
                        <TableCell align="right">
                              {LinkResults[KeyResults.indexOf(row)]}
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
  return {
    requestProjectInfo: state.user.requestProjectInfo,
    //requestTeamGithubCommits: state.user.requestTeamGithubCommits,
    //requestTeamJiraTickets: state.user.requestTeamJiraTickets,
    projectInfo: state.user.projectInfo,
    //githubData: state.user.teamGithubCommits,
    //jiraData: state.user.teamJiraTickets,
  };
}
const actionCreators = {
    getCoordinatorHomepage: userActions.getCoordinatorHomepage,
    getSupervisor: userActions.getSupervisor,
    setSupervisor: userActions.setSupervisor,
    setCoSupervisor: userActions.setCoSupervisor,
    getSupervisors: userActions.getSupervisors,
    getHomepage: userActions.getHomepage,
    getProjectInfo:userActions.getProjectInfo,
}

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
