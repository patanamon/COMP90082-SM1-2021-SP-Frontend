import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";
import { formatLineChartData } from "../_utils/formatLineChartData.js";
import { formatDonutChartData } from "../_utils/formatDonutChartData.js";
import { unixToDate } from "../_utils/unixToDate.js";
import { failureToast } from "../_utils/toast";
import { successToast } from "../_utils/toast";

// Remember: Add new actions in here, otherwise it cannot be recognise by this.props.
// ALSO REMEMBER TO ADD RETURN MSG IN user.constants.js
export const userActions = {
  login,
  logout,

  getTeamConfluencePages,
  getTeamGithubCommits,
  getTeamJiraTickets,

  getTeamConfluenceMeeting,

  getTeamCodeMetrics,

  setTeamInfo,

  getConfluenceIndividualData,
  getGithubIndividualData,
  getJiraIndividualData,

  getConfluenceSpaceByKeyWord,
  importProject,
  getImportedProject,

  setCurrentTeamKey,
  setCurrentTeamName,

  getTeamMemberList,
  getTeamMemberNumber,
  sendImport,
};

function request(action, payload) {
  return { type: action, payload };
}
function success(action, payload) {
  return { type: action, payload };
}
function failure(action, payload) {
  return { type: action, payload };
}

function unixToDateHelper(jsonData) {
  for (let i = 0, len = jsonData.length; i < len; i++) {
    jsonData[i].time = unixToDate(jsonData[i].time);
  }

  return jsonData;
}

function checkRespCode(response) {
  return response.code == 0;
}

function getTeamConfluencePages(teamKey) {
  return (dispatch) => {
    dispatch(request(userConstants.GET_TEAM_CONFLUENCE_PAGES_REQUEST));
    userService.getTeamConfluencePages(teamKey).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GET_TEAM_CONFLUENCE_PAGES_SUCCESS,
              formatLineChartData(response)
            )
          );
        } else {
          dispatch(
            failure(
              userConstants.GET_TEAM_CONFLUENCE_PAGES_FAILURE,
              response.message
            )
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_CONFLUENCE_PAGES_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function sendImport(teamKey) {
  return (dispatch) => {
    dispatch(request(userConstants.SEND_IMPORT_REQUEST));
    userService.sendImport(teamKey).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.SEND_IMPORT_SUCCESS,
              //to do
            )
          );
        } else {
          dispatch(
            failure(
              userConstants.SEND_IMPORT_FAILURE,
              response.message
            )
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.SEND_IMPORT_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}


function getProjectInfo() {
  return (dispatch) => {
    dispatch(request(userConstants.GETPROJECTINFO_REQUEST));
    userService.getProjectInfo().then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GETPROJECTINFO_SUCCESS,
              
              formatProjectInfo(response)
              
              //formatLineChartData(response)
            )
          );
          
        } else {
          dispatch(
            failure(
              userConstants.GETPROJECTINFO_FAILURE,
              response.message
            )
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GETPROJECTINFO_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function formatProjectInfo(data){
  var tempoStore = [];
  

  for (let i = 0, len = data.data.length; i < len; i++) {    
    
    tempoStore.push({"space_key":data.data[i].space_key, "label" : data.data[i].space_name, "link" : "https://confluence.cis.unimelb.edu.au:8443/display/"+data.data[i].space_key+"/Home"});
    
}


return tempoStore;
}

function getTeamGithubCommits(teamKey) {
  return (dispatch) => {
    dispatch(request(userConstants.GET_TEAM_GITHUB_COMMITS_REQUEST));
    userService.getTeamGithubCommits(teamKey).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GET_TEAM_GITHUB_COMMITS_SUCCESS,
              formatLineChartData(response)
            )
          );
        } else {
          dispatch(
            failure(
              userConstants.GET_TEAM_GITHUB_COMMITS_FAILURE,
              response.message
            )
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_GITHUB_COMMITS_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function getTeamJiraTickets(teamKey) {
  return (dispatch) => {
    dispatch(request(userConstants.GET_TEAM_JIRA_TICKETS_REQUEST));
    userService.getTeamJiraTickets(teamKey).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GET_TEAM_JIRA_TICKETS_SUCCESS,
              formatLineChartData(response)
            )
          );
        } else {
          dispatch(
            failure(
              userConstants.GET_TEAM_JIRA_TICKETS_FAILURE,
              response.message
            )
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(userConstants.GET_TEAM_JIRA_TICKETS_FAILURE, error.toString())
        );
        failureToast(error.toString());
      }
    );
  };
}

function getTeamConfluenceMeeting(teamKey) {
  return (dispatch) => {
    userService.getTeamConfluenceMeeting(teamKey).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GET_TEAM_CONFLUENCE_MEETINGS_SUCCESS,
              unixToDateHelper(response.data)
            )
          );
        } else {
          dispatch(
            failure(
              userConstants.GET_TEAM_CONFLUENCE_MEETINGS_FAILURE,
              response.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_CONFLUENCE_MEETINGS_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}

function setTeamInfo(teamKey, jiraUrl, githubUrl, githubUsername, githubPassword) {
  return (dispatch) => {
    dispatch(request(userConstants.SETTEAMINFO_REQUEST));
    userService.setTeamInfo(teamKey, jiraUrl, githubUrl, githubUsername, githubPassword).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(success(userConstants.SETTEAMINFO_SUCCESS, response.message));
          successToast(response.message);
        } else {
          dispatch(failure(userConstants.SETTEAMINFO_FAILURE, response.message));
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(failure(userConstants.SETTEAMINFO_FAILURE, error.toString()));
        failureToast(error.toString());
      }
    );
  };
}

function getTeamCodeMetrics(teamKey) {
  return (dispatch) => {
    userService.getTeamCodeMetrics(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GET_TEAM_CODE_METRICS_SUCCESS, response.data)
        );
      },
      (error) => {
        dispatch(
          failure(userConstants.GET_TEAM_CODE_METRICS_FAILURE, error.toString())
        );
      }
    );
  };
}

function getConfluenceIndividualData(teamKey) {
  return (dispatch) => {
    userService.getConfluenceIndividualData(teamKey).then(
      (response) => {
        dispatch(
          success(
            userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_SUCCESS,
            formatDonutChartData(response)
          )
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function getGithubIndividualData(teamKey) {
  return (dispatch) => {
    userService.getGithubIndividualData(teamKey).then(
      (response) => {
        dispatch(
          success(
            userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_SUCCESS,
            formatDonutChartData(response)
          )
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function getJiraIndividualData(teamKey) {
  return (dispatch) => {
    userService.getJiraIndividualData(teamKey).then(
      (response) => {
        dispatch(
          success(
            userConstants.GET_INDIVIDUAL_JIRA_COUNTS_SUCCESS,
            formatDonutChartData(response)
          )
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_INDIVIDUAL_JIRA_COUNTS_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function getConfluenceSpaceByKeyWord(keyWord) {
  return (dispatch) => {
    dispatch(request(userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_REQUEST));
    userService.getConfluenceSpaceByKeyWord(keyWord).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(
              userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_SUCCESS,
              response
            )
          );
        } else {
          dispatch(
            failure(userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_FAILURE)
          );
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_FAILURE,
            error.toString()
          )
        );
        failureToast(error.toString());
      }
    );
  };
}

function importProject(coordinatorId, spaceNameList) {
  return (dispatch) => {
    dispatch(userConstants.IMPORT_PROJECT_REQUEST);
    userService.importProject(coordinatorId, spaceNameList).then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(success(userConstants.IMPORT_PROJECT_SUCCESS));
          successToast(response.message);
        } else {
          dispatch(failure(userConstants.IMPORT_PROJECT_FAILURE));
          failureToast(response.message);
        }
      },
      (error) => {
        dispatch(failure(userConstants.IMPORT_PROJECT_FAILURE));
        failureToast(error.toString());
      }
    );
  };
}

function getImportedProject() {
  return (dispatch) => {
    userService.getImportedProject().then(
      (response) => {
        if (checkRespCode(response)) {
          dispatch(
            success(userConstants.GET_IMPORTED_PROJECT_SUCCESS, response.data)
          );
        } else {
          dispatch(
            failure(
              userConstants.GET_IMPORTED_PROJECT_FAILURE,
              response.message
            )
          );
        }
      },
      (error) => {
        dispatch(
          failure(userConstants.GET_IMPORTED_PROJECT_FAILURE, error.toString())
        );
      }
    );
  };
}

function setCurrentTeamKey(teamKey) {
  return (dispatch) => {
    dispatch({ type: userConstants.SET_CURRENT_TEAM_KEY, payload: teamKey });
  };
}



function getTeamMemberList(teamKey) {
  return (dispatch) => {
    userService.getTeamMemberList(teamKey).then(
      (response) => {
        dispatch(success(userConstants.GET_TEAM_MEMBER_LIST_SUCCESS, response.data.user_list));
      },
      (error) => {
        dispatch(failure(userConstants.GET_TEAM_MEMBER_LIST_FAILURE, error.toString()));
      }
    );
  };
}

function getTeamMemberNumber(teamKey) {
  return (dispatch) => {
    userService.getTeamMemberNumber(teamKey).then(
      (response) => {
        dispatch(success(userConstants.GET_TEAM_MEMBER_NUMBER_SUCCESS, response.data.total));
      },
      (error) => {
        dispatch(failure(userConstants.GET_TEAM_MEMBER_NUMBER_FAILURE, error.toString()));
      }
    );
  };
}



function setCurrentTeamName(teamName) {
  return (dispatch) => {
    dispatch({
      type: userConstants.SET_CURRENT_TEAM_NAME,
      payload: teamName,
    });
  };
}

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        console.log("****************Login Success*********");
        console.log(user);
        if (user.message == "success") {
          history.push("/CoordinatorHomePage");
          dispatch(success(user));
        } else {
          //dispatch(failure(userConstants.LOGIN_FAILURE, user.message));
          dispatch(alertActions.error(user.msg.toString()));
        }
      },
      (error) => {
        console.log(error)
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        //history.push('/login');
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
