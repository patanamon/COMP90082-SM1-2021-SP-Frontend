import React, { Component, useState } from "react";
import "./CoordinatorHomePage.css";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Banner from "../_utils/Banner";
import AsyncSelect from "react-select/async";
import { userService } from "../_services";
import { formatSearchResult } from "../_utils/formatSearchResult.js";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

// temp store for vars
var KeyResults = [];
var NameResults = [];
var LinkResults = [];

var FinalNameResult = [];
var FinalLinkResult = [];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0b2F4A",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


function createData(name, email) {
  return { name, email};
}

const rows = [
  createData('Student 1', "student1@student.unimelb.edu.au"),
  createData('Student 2', "student2@student.unimelb.edu.au"),
  createData('Student 3', "student3@student.unimelb.edu.au"),
  createData('Student 4', "student4@student.unimelb.edu.au"),
  createData('Student 5', "student5@student.unimelb.edu.au"),
];

// check if the item present in results
function uniqImported(arr1, arr2, arr3, obj) {
  if (arr1.indexOf(obj.space_key) === -1) {
    arr1.push(obj.space_key);
    arr2.push(obj.space_name);
    //console.log(obj);
    let link = getConfluenceLink(obj.space_key);
    //arr3.push(obj.link);
    arr3.push(link);
  }
    
}
function uniq(arr1, arr2, arr3, obj) {
  if (arr1.indexOf(obj.value) === -1) {
    arr1.push(obj.value);
    arr2.push(obj.label);
    //console.log(obj);
    let link = getConfluenceLink(obj.value);
    //arr3.push(obj.link);
    arr3.push(link);
  }
    
}

function getConfluenceLink(spaceK){
    var baseurl = "https://confluence.cis.unimelb.edu.au:8443/display/";
    var confluenceLink = baseurl+spaceK;
    return confluenceLink
  }
// delete item from all results list
function del(arr1, arr2, arr3, item) {
  arr2.splice(arr1.indexOf(item), 1);
  arr3.splice(arr1.indexOf(item), 1);
  arr1.splice(arr1.indexOf(item), 1);
}

// main export class
class CoordinatorHomePage extends Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { project: "", show: false, openMenu: false, isDrawerOpened: false };
    this.getSearchResult = this.getSearchResult.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);

  }

  toggleDrawerStatus = () => {
  this.setState({
    isDrawerOpened: true,
  })
}
closeDrawer = () => {
  this.setState({
    isDrawerOpened: false,
  })
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
    console.log("check selected Project");
    console.log(selectedProject);
    uniq(KeyResults, NameResults, LinkResults, selectedProject);

  };

  // actions for removing specific item
  handleDelete = (key) => {
    this.setState({ key });
    del(KeyResults, NameResults, LinkResults, key);
  };

  handleRedirect(e){
    let spaceKey = e.target.innerText;
    this.props.setCurrentTeamKey(spaceKey);
  }

  // componentDidMount() {
  //   this.props.getImportedProject();

  // }

  // componentDidUpdate(){
  //   this.props.getImportedProject();
  //   const projects = this.props.importedProject; 
  //   console.log("check projects");
  //   //console.log(projects[0].space_key);
  //   //console.log(projects[0].space_name);
  //   Object.keys(projects).map(idx => uniqImported(KeyResults, NameResults, LinkResults, projects[idx]));  
    
  // }

  getSearchResult(keyWord) {
    return userService.getConfluenceSpaceByKeyWord(keyWord).then(
      (response) => {
        if (response.code == 0 && response.data.length != 0) {
          let options = formatSearchResult(response.data);
          this.setState({ openMenu: true, options: options });
          //console.log(options);
          return options;
        } else {
          this.setState({ openMenu: false });
          return [];
        }
      },
      () => {
        this.setState({ openMenu: false });
        return [];
      }
    );
  }
  
  render() {
    const { isDrawerOpened } = this.state;
    
    return (
      
      <div class="uomcontent">
        {uomHeader("Coordinator Home")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="Project Management" />
            <div className="App">
              <div id="select" className="Select_box">
                <AsyncSelect
                  className="ProjectList"
                  //onScroll = {this.getSearchResult}
                  loadOptions={this.getSearchResult}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                  closeMenuOnSelect={false}
                  onSelectResetsInput={false}
                  defaultOptions={this.state.options}
                  onChange={this.handleChange}
                  placeholder="Search projects by entering key words"
                  
                />
              </div>
              <div id="selected" className="Selected">
                <TableContainer>
                  <Table
                    className="project_table"
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Project Name</StyledTableCell>
                        <StyledTableCell align="right">Confluence Link</StyledTableCell>
                        <StyledTableCell align="right" colSpan={2}> Operation</StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {KeyResults.map((row) => (
                        <StyledTableRow key={row}>
                          <StyledTableCell component="th" scope="row" >
                            <a href="/ProjectHomePage" onClick={this.handleRedirect}>
                              {NameResults[KeyResults.indexOf(row)]}
                            </a>
                          </StyledTableCell>
                          <StyledTableCell align="right" >
                            {LinkResults[KeyResults.indexOf(row)]}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            
                              <div id="button" float="left" >
                              <Button
                                variant="contained"
                                color = "#194988"
                                color="primary"
                                onClick={() => 
                                //   {
                                //   this.handleDelete(row);
                                // }}
                                { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(row) } } 
                                
                              >
                                Delete
                              </Button>
                              </div>
                            
                          </StyledTableCell>
                          <StyledTableCell align="right">

                              <div id="button" float="left" >
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={this.toggleDrawerStatus}
                              >
                                View
                              </Button>
                              <Drawer
                                variant="temporary"
                                open={isDrawerOpened}
                                onClose={this.closeDrawer}
                                anchor = "right"
                              >

                              <TableContainer component={Paper}>
                                    <p> </p>
                                    <div align="center"><h2>Project Name</h2></div>
                                    <p> </p>
                                    <Table aria-label="simple table">
                                      <TableHead>
                                        <StyledTableRow align="center">
                                          <StyledTableCell align="center">Student Name</StyledTableCell>
                                          <StyledTableCell align="center">Student Email</StyledTableCell>
           
                                        </StyledTableRow>
                                      </TableHead>
                                      <TableBody>
                                        {rows.map((row) => (
                                          <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row" align="center">
                                              {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.email}</StyledTableCell>

                                          </StyledTableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                              </Drawer>
                              </div>
                          
                            
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <p> </p>
                <p> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    requestConfluenceSpaceByKeyWord: state.user.requestConfluenceSpaceByKeyWord,
    importProject: state.user.importProject,
    requestImportedProject: state.user.requestImportedProject,
    confluenceSpaceSearchResult: state.user.confluenceSpaceSearchResult,
    importedProject: state.user.importedProject,
    sendImport:state.user.sendImport,
  };
}
const actionCreators = {
  getConfluenceSpaceByKeyWord: userActions.getConfluenceSpaceByKeyWord,
  importProject: userActions.importProject,
  getImportedProject: userActions.getImportedProject,
  setCurrentTeamKey: userActions.setCurrentTeamKey,
  setCurrentTeamName: userActions.setCurrentTeamName,
  sendImport:userActions.sendImport,
};

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
