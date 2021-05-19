export const userService = {
  login,
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
  deleteImportedProject,
  getConfluenceSpaceByKeyWord,
  getTeamMemberList,
};

const baseUrl = "/api/v1";

function getTeamConfluencePages(teamKey) {
  let url = baseUrl + "/confluence/spaces/" + teamKey + "/page_count";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getTeamGithubCommits(teamKey) {
  let url = baseUrl + "/git/" + teamKey + "/commit_count";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getTeamJiraTickets(teamKey) {
  let url = baseUrl + "/jira/" + teamKey + "/ticket_count";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getTeamConfluenceMeeting(teamKey) {
  let url = baseUrl + "/confluence/" + teamKey + "/meeting_minutes";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

<<<<<<< HEAD
function setTeamInfo(teamKey, jiraUrl, githubUrl, githubUsername, githubPassword) {
=======
function setTeamInfo(
  teamKey,
  jiraUrl,
  githubUrl,
  githubUsername,
  githubPassword
) {
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
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
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getTeamCodeMetrics(teamKey) {
  let url = baseUrl + "/git/" + "/metrics/" + teamKey;

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getGithubIndividualData(teamKey) {
  let url = baseUrl + "/git/individual_commits/" + teamKey;

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
<<<<<<< HEAD
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_GITHUB_INDIVIDUAL_DATA, jsonResponse.data);
      }
=======
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
      return jsonResponse;
    });
}

function getJiraIndividualData(teamKey) {
  let url = baseUrl + "/jira/" + teamKey + "/contributions";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
<<<<<<< HEAD
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_JIRA_INDIVIDUAL_DATA, jsonResponse.data);
      }
=======
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
      return jsonResponse;
    });
}

function getConfluenceIndividualData(teamKey) {
  let url = baseUrl + "/confluence/spaces/" + teamKey + "/pages/contributions";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
<<<<<<< HEAD
      if (jsonResponse.code === 0) {
        storePut(commonConstants.TEAM_CONFLUENCE_INDIVIDUAL_DATA, jsonResponse.data);
      }
=======
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
      return jsonResponse;
    });
}

function getConfluenceSpaceByKeyWord(keyWord) {
  let url = baseUrl + "/confluence/spaces/" + keyWord;

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function importProject(teamKey) {
  let payload = {
    space_key: teamKey,
  };

  let url = baseUrl + "/project/import";

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function getImportedProject() {
  let url = baseUrl + "/confluence/imported_projects";

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function deleteImportedProject(teamKey) {
  let payload = {
    space_key: teamKey,
  };

  let url = baseUrl + "/project/delete";

  const requestOptions = {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  };

  return fetch(url, requestOptions)
<<<<<<< HEAD
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
=======
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
>>>>>>> db9e65837e2a0dc33c1746c1aa9873688b9180f9
}

function getTeamMemberList(teamKey) {
  let url = baseUrl + "/team/" + teamKey;

  const requestOptions = {
    method: "GET",
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}

function login(username, password) {
  let url = baseUrl + "/sso/login";

  let data = {
    username: username,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  };

  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse;
    });
}
