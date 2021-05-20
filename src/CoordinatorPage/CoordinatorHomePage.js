import React, { Component } from "react";
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
import { formatImportedProjectData } from "../_utils/formatImportedProjectData";
import { withStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import { formatDrawerData } from "../_utils/formatDrawerData.js";
import { alertConstants } from "../_constants";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0c304a",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class CoordinatorHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpened: false,
      spaceKeys: [],
      spaceNames: [],
      spaceLinks: [],
      options: [],
      wait: false,
      drawerWait: false,
      drawerData: [],
      drawerSpaceName: "",
    };
    this.getSearchResult = this.getSearchResult.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  toggleDrawerStatus = ({ spacekey, spaceName }) => {
    this.setState({
      isDrawerOpened: true,
      drawerWait: true,
    });
    this.props.getTeamMemberList(spacekey).then(() => {
      if (
        this.props.getTeamMemberListSuccess &&
        this.props.teamMemberList &&
        this.props.teamMemberList.length != 0
      ) {
        let formattedData = formatDrawerData(this.props.teamMemberList);
        this.setState({
          drawerData: formattedData,
          drawerSpaceName: spaceName,
          drawerWait: false,
        });
      } else {
        this.setState({
          drawerData: [],
          drawerSpaceName: "",
          drawerWait: false,
        });
      }
    });
  };

  closeDrawer = () => {
    this.setState({
      isDrawerOpened: false,
    });
  };

  handleChange = (selected) => {
    this.props.importProject(selected.value);
    this.setState({
      wait: true,
    });
    setTimeout(() => {
      this.props.getImportedProject().then(() => {
        if (
          this.props.importedProject &&
          this.props.importedProject.length != 0
        ) {
          let formattedData = formatImportedProjectData(
            this.props.importedProject
          );
          this.setState({
            spaceKeys: formattedData.spaceKeys,
            spaceNames: formattedData.spaceNames,
            spaceLinks: formattedData.spaceLinks,
            wait: false,
          });
        } else {
          this.setState({
            wait: false,
          });
        }
      });
    }, 2000);
  };

  handleDelete = (key) => {
    this.props.deleteImportedProject(key);
    this.setState({
      wait: true,
    });
    setTimeout(() => {
      this.props.getImportedProject().then(() => {
        if (
          this.props.importedProject &&
          this.props.importedProject.length != 0
        ) {
          let formattedData = formatImportedProjectData(
            this.props.importedProject
          );
          this.setState({
            spaceKeys: formattedData.spaceKeys,
            spaceNames: formattedData.spaceNames,
            spaceLinks: formattedData.spaceLinks,
            wait: false,
          });
        } else {
          this.setState({
            wait: false,
          });
        }
      });
    }, 2000);
  };

  handleRedirect(e) {
    this.props.setCurrentTeamName(e.target.innerText);
    this.props.setCurrentTeamKey(e.target.getAttribute("data-key"));
  }

  componentDidMount() {
    this.setState({
      wait: true,
    });
    this.props.getImportedProject().then(() => {
      if (
        this.props.importedProject &&
        this.props.importedProject.length != 0
      ) {
        let formattedData = formatImportedProjectData(
          this.props.importedProject
        );
        this.setState({
          spaceKeys: formattedData.spaceKeys,
          spaceNames: formattedData.spaceNames,
          spaceLinks: formattedData.spaceLinks,
          wait: false,
        });
      } else {
        this.setState({
          wait: false,
        });
      }
    });
  }

  getSearchResult(keyWord) {
    return userService.getConfluenceSpaceByKeyWord(keyWord).then(
      (response) => {
        if (response.code == 0 && response.data.length != 0) {
          let options = formatSearchResult(response.data);
          this.setState({ options: options });
          return options;
        } else {
          return [];
        }
      },
      () => {
        return [];
      }
    );
  }

  render() {
    return (
      <div className="uomcontent">
        {uomHeader("Coordinator Home")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="Project Management" />
            <div
              style={{
                position: "relative",
                margin: "4vh auto",
                width: "40vw",
              }}
            >
              <AsyncSelect
                loadOptions={this.getSearchResult}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                closeMenuOnSelect={false}
                defaultOptions={this.state.options}
                onChange={this.handleChange}
                placeholder="Search projects by entering key words"
              />
            </div>
            <Spin spinning={this.state.wait}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Project Name</StyledTableCell>
                      <StyledTableCell>Confluence Link</StyledTableCell>
                      <StyledTableCell colSpan={2}>Operation</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.spaceKeys.map((key) => (
                      <StyledTableRow key={key}>
                        <StyledTableCell component="th" scope="row">
                          <a
                            data-key={key}
                            style={{ textDecoration: "none" }}
                            href="/project"
                            onClick={this.handleRedirect}
                          >
                            {
                              this.state.spaceNames[
                                this.state.spaceKeys.indexOf(key)
                              ]
                            }
                          </a>
                        </StyledTableCell>
                        <StyledTableCell>
                          {
                            this.state.spaceLinks[
                              this.state.spaceKeys.indexOf(key)
                            ]
                          }
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
                                )
                              )
                                this.handleDelete(key);
                            }}
                          >
                            Delete
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.toggleDrawerStatus({
                                spacekey: key,
                                spaceName:
                                  this.state.spaceNames[
                                    this.state.spaceKeys.indexOf(key)
                                  ],
                              });
                            }}
                          >
                            View
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Spin>

            <Drawer
              variant="temporary"
              open={this.state.isDrawerOpened}
              onClose={this.closeDrawer}
              anchor="right"
            >
              <Spin spinning={this.state.drawerWait}>
                <TableContainer component={Paper}>
                  <p> </p>
                  <div align="center">
                    <h2>
                      {this.state.drawerSpaceName == ""
                        ? alertConstants.NO_DATA
                        : this.state.drawerSpaceName}
                    </h2>
                  </div>
                  <p> </p>
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledTableRow align="center">
                        <StyledTableCell align="center">
                          Student Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Student Email
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.drawerData.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.email}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Spin>
            </Drawer>
          </div>
        </div>
        <ToastContainer limit={1} />
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
    deleteImportedProject: state.user.deleteImportedProject,
    importSuccess: state.user.importProjectSuccess,
    deleteSuccess: state.user.deleteProjectSuccess,
    teamMemberList: state.user.teamMemberList,
    getTeamMemberListSuccess: state.user.getTeamMemberListSuccess,
  };
}
const actionCreators = {
  getConfluenceSpaceByKeyWord: userActions.getConfluenceSpaceByKeyWord,
  importProject: userActions.importProject,
  getImportedProject: userActions.getImportedProject,
  deleteImportedProject: userActions.deleteImportedProject,
  setCurrentTeamKey: userActions.setCurrentTeamKey,
  setCurrentTeamName: userActions.setCurrentTeamName,
  getTeamMemberList: userActions.getTeamMemberList,
};

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
