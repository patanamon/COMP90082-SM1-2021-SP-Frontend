import { userConstants } from "../_constants";
import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";
import {formatLineChartData} from "../_utils/formatLineChartData.js";

// Remember: Add new actions in here, otherwise it cannot be recognise by this.props.
// ALSO REMEMBER TO ADD RETURN MSG IN user.constants.js
export const userActions = {
  getTeamConfluencePages,
  getTeamGithubCommits,
  getTeamJiraTickets,

  login,
  logout,
  register,
  sendEmail,

  loginConfluence,

  // Get Configuration
  getTeamList,
  getMemberConfiguration,

  // getCoordinatorHomepage,
  getHomepage,
  returnProjects,
  importProject,
  getJiraUser,

  //Confluneces quality - individual contribution
  numPagesPerMember,

  //Git commit - Product Quality
  codeCommitsPerMember,

  
  // Configure
  getConfigurationConfluence,
  getConfigurationGit,
  getConfigurationJira,
  setConfiguration,
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

//All Pages On Confluence
function getTeamConfluencePages(teamKey) {
  return (dispatch) => {
    userService.getTeamConfluencePages(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GET_TEAM_CONFLUENCE_PAGES_SUCCESS, formatLineChartData(response))
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_CONFLUENCE_PAGES_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}

function getTeamGithubCommits(teamKey) {
  return (dispatch) => {
    userService.getTeamGithubCommits(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GET_TEAM_GITHUB_COMMITS_SUCCESS, formatLineChartData(response))
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_GITHUB_COMMITS_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}

function getTeamJiraTickets(teamKey) {
  return (dispatch) => {
    userService.getTeamJiraTickets(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GET_TEAM_JIRA_TICKETS_SUCCESS, formatLineChartData(response))
        );
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GET_TEAM_JIRA_TICKETS_FAILURE,
            error.toString()
          )
        );
      }
    );
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
          if (user.data.role == 0) {
            history.push("/CoordinatorHomePage");
          } else {
            history.push("/SupervisorHomePage");
          }
          dispatch(success(user));
        } else {
          dispatch(failure(user.message));
        }
      },
      (error) => {
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

function getHomepage(username, offset) {
  return (dispatch) => {
    dispatch(request({ username, offset }));

    userService.getHomepage(username, offset).then(
      (username) => {
        dispatch(success(username));
      },
      (error) => {
        dispatch(failure(username, error.toString()));
      }
    );
  };
}

// Send invitation Email to the supervisor
function sendEmail(emails, emailText) {
  return (dispatch) => {
    dispatch(request({ emails, emailText }));
    userService.sendEmail(emails, emailText).then(
      (user) => {
        dispatch(success());
        console.log(user);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

function loginConfluence(confluenceUsername, confluencePassword) {
  return (dispatch) => {
    dispatch(request({ confluenceUsername, confluencePassword }));

    userService.loginConfluence(confluenceUsername, confluencePassword).then(
      (confluenceUser) => {
        if (confluenceUser) dispatch(success());

        console.log("****************Conflunece Login Success*********");
        console.log(confluenceUser);
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

// Return projects based on the subject name. e.g. SWEN90013-2020
function returnProjects(subjectName) {
  return (dispatch) => {
    dispatch(request({ subjectName }));
    userService.returnProjects(subjectName).then(
      (subjectName) => {
        dispatch(success());
        console.log(subjectName);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

// Import returned projects to the system
function importProject(projectName) {
  return (dispatch) => {
    dispatch(request({ projectName }));
    userService
      .importProject(projectName)

      .then(
        (projectName) => {
          dispatch(success());
          console.log(projectName);
        },
        (error) => {
          dispatch(failure(error.toString()));
        }
      );
  };
}

//Nunmber of Pages per member On Conflunece
function numPagesPerMember(username) {
  return (dispatch) => {
    dispatch(request({ username }));
    userService
      .numPagesPerMember(username)

      .then(
        (username) => {
          dispatch(success());
          console.log(username);
        },
        (error) => {
          dispatch(failure(error.toString()));
        }
      );
  };
}

function codeCommitsPerMember(projectName, MemberName) {
  return (dispatch) => {
    dispatch(request({ projectName, MemberName }));
    userService
      .codeCommitsPerMember(projectName, MemberName)

      .then(
        (projectName) => {
          dispatch(success());
          console.log(projectName);
        },
        (error) => {
          dispatch(failure(error.toString()));
        }
      );
  };
}

// Get JIRA tickets based on the team and user. e.g. SWEN90013-2020-SP
function getJiraUser(teamName, user) {
  return (dispatch) => {
    dispatch(request({ teamName, user }));
    userService.getJiraUser(teamName, user).then(
      (user) => {
        dispatch(success());
        console.log(teamName, user);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

// Get list of team members based on the team id
function getTeamList(teamID) {
  return (dispatch) => {
    dispatch(request({ teamID }));
    userService.getTeamList(teamID).then(
      (teamID) => {
        dispatch(success());
        console.log(teamID);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

function getConfigurationConfluence(teamKey) {
  return (dispatch) => {
    userService.getConfigurationConfluence(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GETCONFIGURATIONCON_SUCCESS, response)
          );  
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GETCONFIGURATIONCON_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}
function getConfigurationGit(teamKey) {
  return (dispatch) => {
    userService.getConfigurationGit(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GETCONFIGURATIONGIT_SUCCESS, response)
          );  
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GETCONFIGURATIONGIT_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}
function getConfigurationJira(teamKey) {
  return (dispatch) => {
    userService.getConfigurationJira(teamKey).then(
      (response) => {
        dispatch(
          success(userConstants.GETCONFIGURATIONJIRA_SUCCESS, response)
          );  
      },
      (error) => {
        dispatch(
          failure(
            userConstants.GETCONFIGURATIONJIRA_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}
//////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function setConfiguration(teamKey) {
  return (dispatch) => {
    userService.setConfiguration(teamKey).then(  //!!!!!!!!!!!!!!!!!!!!!!!
      (response) => {
        dispatch(
          success(userConstants.SETCONFIGURATION_SUCCESS, response)
        );
        
      },
      (error) => {
        dispatch(
          failure(
            userConstants.SETCONFIGURATION_FAILURE,
            error.toString()
          )
        );
      }
    );
  };
}

// Get a member's IDs Configuration based on the team id
function getMemberConfiguration(teamID, memberID) {
  return (dispatch) => {
    dispatch(request({ teamID, memberID }));
    userService.getMemberConfiguration(teamID, memberID).then(
      (memberID) => {
        dispatch(success());
        console.log(memberID);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}
