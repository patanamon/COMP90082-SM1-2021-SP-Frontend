import React, { Component } from "react";
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// temp store for vars
var KeyResults = [];
var NameResults = [];
var LinkResults = [];

var FinalNameResult = [];
var FinalLinkResult = [];

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
    this.state = { project: "", show: false, openMenu: false };
    this.getSearchResult = this.getSearchResult.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
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

  componentDidMount() {
    this.props.getImportedProject();

  }

  componentDidUpdate(){
    this.props.getImportedProject();
    const projects = this.props.importedProject; 
    console.log("check projects");
    //console.log(projects[0].space_key);
    //console.log(projects[0].space_name);
  Object.keys(projects).map(idx => uniqImported(KeyResults, NameResults, LinkResults, projects[idx]));  
    
  }

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

 AlertDialog() { 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //this.handleDelete(row);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  render() {
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
                        <TableCell>Project Name</TableCell>
                        <TableCell align="right">Confluence Link</TableCell>
                        <TableCell align="right"> Operation</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {KeyResults.map((row) => (
                        <TableRow key={row}>
                          <TableCell component="th" scope="row">
                            <a href="/ProjectHomePage" onClick={this.handleRedirect}>
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
                                  //this.AlertDialog()
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
  };
}
const actionCreators = {
  getConfluenceSpaceByKeyWord: userActions.getConfluenceSpaceByKeyWord,
  importProject: userActions.importProject,
  getImportedProject: userActions.getImportedProject,
  setCurrentTeamKey: userActions.setCurrentTeamKey,
  setCurrentTeamName: userActions.setCurrentTeamName,
};

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
