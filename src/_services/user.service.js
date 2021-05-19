import { storePut } from "../_helpers/helper-funcs.js";
import md5 from "md5";
import { commonConstants } from "../_constants";

export const userService = {
  login,
  logout,
  register,

  getTeamConfluencePages,
  getTeamGithubCommits,
  getTeamJiraTickets,

  
  getTeamConfluenceMeeting,

  setTeamInfo,

  getTeamCodeMetrics,

  getConfluenceIndividualData,
  getGithubIndividualData,
  getJiraIndividualData,

  getImportedProject,
  importProject,
  getConfluenceSpaceByKeyWord,

  getTeamMemberList,
  SendImportRequest,
};

const baseUrl = "http://localhost:3200/api/v1";
//const baseUrl = "http://18.167.74.23:18000/api/v1";

function getTeamConfluencePages(teamKey) {
  let url = baseUrl + "/confluence/spaces/" + teamKey + "/page_count";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_CONFLUENCE_PAGE_COUNT, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function SendImportRequest(teamKey) {
  let url = baseUrl + "/confluence/spaces/" + teamKey + "/project_info";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.SEND_IMPORT, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getProjectInfo() {
  let url = baseUrl + "/confluence/imported_projects";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code === 0) {
        storePut("TeamProjectInfo", jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getTeamGithubCommits(teamKey) {
  let url = baseUrl + "/git/" + teamKey + "/commit_count";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_GITHUB_COMMIT_COUNT, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getTeamJiraTickets(teamKey) {
  let url = baseUrl + "/jira/" + teamKey + "/ticket_count";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_JIRA_TICKET_COUNT, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getTeamConfluenceMeeting(teamKey) {
  let url = baseUrl + "/confluence/" + teamKey + "/meeting_minutes";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_CONFLUENCE_MEETING_MINUTE, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function setTeamInfo(teamKey, jiraUrl, githubUrl, githubUsername, githubPassword) {
  let payload = {
    space_key: teamKey,
    jira_url: jiraUrl,
    git_url: githubUrl,
    git_username: githubUsername,
    git_password: githubPassword,
  };

  let url = baseUrl + "/git/config";

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_CONFIG_INFO, payload);
      }
      return jsonResponse;
    });
}

function getTeamCodeMetrics(teamKey) {
  let url = baseUrl + "/git/" + "/metrics/" + teamKey;

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.TEAM_CODE_METRICS, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getGithubIndividualData(teamKey) {
  let url = baseUrl + "/git/individual_commits/" + teamKey;

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_GITHUB_INDIVIDUAL_DATA, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getJiraIndividualData(teamKey) {
  let url = baseUrl + "/jira/" + teamKey + "/contributions";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_JIRA_INDIVIDUAL_DATA, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getConfluenceIndividualData(teamKey) {
  let url = baseUrl + "/confluence/spaces/" + teamKey + "/pages/contributions";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_CONFLUENCE_INDIVIDUAL_DATA, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getConfluenceSpaceByKeyWord(keyWord) {
  let url = baseUrl + "/confluence/spaces/" + keyWord;

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function importProject(coordinatorId, spaceNameList) {
  let payload = {
    coordinator_id: coordinatorId,
    spaces: spaceNameList,
  };

  let url = baseUrl + "/team/import";

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.COORDINATOR_IMPORTED_PROJECT, payload);
      }
      return jsonResponse;
    });
}

function getImportedProject() {
  let url = baseUrl + "/confluence/imported_projects";

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse.code == 0) {
        storePut(commonConstants.COORDINATOR_IMPORTED_PROJECT, jsonResponse.data);
      }
      return jsonResponse;
    });
}

function getTeamMemberList(teamKey) {
  let url = baseUrl + "/team/" + teamKey;

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
  .then((response) => response.json())
  .then((jsonResponse) => {
    if (jsonResponse.code == 0) {
      storePut(commonConstants.TEAM_MEMBER_LIST, jsonResponse.data.user_list);
    };
    return jsonResponse;
  });
}

function getTeamMemberNumber(teamKey) {
  let url = baseUrl + "/team/" + teamKey;

  const requestOptions = {
    method: "GET",
  };

  return fetch(url, requestOptions)
  .then((response) => response.json())
  .then((jsonResponse) => {
    if (jsonResponse.code == 0) {
      storePut(commonConstants.TEAM_MEMBER_NUMBER, jsonResponse.data.total);
    };
    return jsonResponse;
  });
}



/*
#########################History code###############################################
*/

// //TODO: find a method without too many warning
function validateEmail(email) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
}

function login(username, password) {
  var url = baseUrl + "/sso/login";
  var data = {};

  data = {
    "username": username,
    "password": password,
  };

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  };

  console.log("*******************LOGIN******************");
  console.log(requestOptions);

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

// // Register
function register(user) {
  var url = "http://172.26.88.107:8081/api/v1/invite/accept";

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(user),
  };

  console.log("*******************REGISTER******************");
  console.log(requestOptions);

  return fetch(url, requestOptions)
    .then(function (handleResponse) {
      console.log("++++++++++++++++REGISTER RESPONSE++++++++++++++++");
      var response = handleResponse
        .json()
        .then((handleResponse) => handleResponse);
      console.log(response);
    })
    .then((user) => {
      console.log(user);

      return user;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    
    console.log("*******************HANDLE RESPOND******************");

    if (!response.ok) {
      if (response.status == 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

// function getJsonValue(obj, name) {
//   var result = null;
//   var value = null;
//   for (var key in obj) {
//     value = obj[key];
//     if (key == name) {
//       return value;
//     } else {
//       if (typeof value == "object") {
//         result = getJsonValue(value, name);
//         console.log(result);
//       }
//     }
//   }
//   return result;
// }

// // Get the JIRA tickets for a user
// function getJiraUser(teamName, user) {
//   // Access the db to retrieve JIRA tickets
//   // var url = 'http://172.26.88.107:8081/api/v1/jira/SWEN90013-2020-SP/tickets';
//   var url = "http://172.26.88.107:8081/api/v1/jira/";
//   url += teamName;
//   url += "/tickets/";
//   url += user;

//   const requestOptions = {
//     method: "GET",
//     credentials: "include",
//   };

//   console.log("*******************GET JIRA USER******************");
//   console.log(requestOptions);

//   return fetch(url, requestOptions)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       console.log(jsonData.data);
//       storePut("jiraUser", jsonData.data);
//       console.log(storeGet("jiraUser"));
//     })
//     .then((jiraUserTickets) => {
//       // store the team tickets
//       //localStorage.setItem('projectList', JSON.stringify(projectList));
//       return jiraUserTickets;
//     });
// }



// // Get a member's IDs Configuration based on the team id
// function getMemberConfiguration(teamID, memberID) {
//   //var url = 'http://172.26.88.107:8081/api/v1/team/1/members/63';
//   var url = "http://172.26.88.107:8081/api/v1/team/1/members/";
//   url += memberID;
//   const requestOptions = {
//     method: "GET",
//     credentials: "include",
//   };

//   console.log("*******************GET MEMBER CONFIGURATION******************");
//   console.log(requestOptions);

//   return fetch(url, requestOptions)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       console.log(jsonData.data);
//       //console.log(jsonData.data.team_members);
//       storePut("memberConfig", jsonData.data);
//       console.log(storeGet("memberConfig"));
//     })
//     .then((memberID) => {
//       // store the team tickets
//       //localStorage.setItem('projectList', JSON.stringify(projectList));
//       return memberID;
//     });

//   function getTeamGithubCommits(teamKey) {
//     let url = baseUrl + "/git/" + teamKey + "/commit_count";

//     const requestOptions = {
//       method: "GET",
//     };

//     return fetch(url, requestOptions)
//       .then((response) => response.json())
//       .then((jsonResponse) => {
//         if (jsonResponse.code == 0) {
//           storePut("TeamGithubCommits", jsonResponse.data);
//         }
//         return jsonResponse;
//       });
//   }
// }
