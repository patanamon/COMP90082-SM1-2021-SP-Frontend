import { authHeader } from '../_helpers';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import { configure } from '@testing-library/react';
import md5 from 'md5';
import Cookies from 'js-cookie';

// Remember: Add new actions in here, otherwise it cannot be recognise by this.props.
// All the console.log needs to be removed when the project finished 
export const userService = {
    login,
    logout,
    register,
    sendEmail,
    returnProjects,

    importProject,   
    loginConfluence,
    getTeamList,
    getMemberConfiguration,

    // getCoordinatorHomepage,
    getSupervisor,
    setSupervisor,
    setCoSupervisor,
    getSupervisors,
    getHomepage,
    getJiraTeam,
    getJiraUser,
  
    //Confluneces quality - individual contribution
    AllPagesOnConfluence,
    numPagesPerMember,

    //Git commit - Product Quality
    loginGit,
    totalCodeCommits,
    codeCommitsPerMember,

    //Get Slack
    getSlackUser,
    getSlackTeam,

    // Configure
    getConfiguration,
    setConfiguration,
};

//TODO: find a method without too many warning
function validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

function login(username, password) {

    var url = 'http://172.26.88.107:8081/api/v1/account/login';
    var data = {};

    if (validateEmail(username)) {
        data = {
            'email' : username,
            'password': md5(password)
        };
        console.log("using email");
    } else {
        data = {
            'username' : username,
            'password': md5(password)
        };
        console.log("using username");
    }

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************LOGIN******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

// Register
function register(user) {

    var url = 'http://172.26.88.107:8081/api/v1/invite/accept';

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(user)
    };

    console.log("*******************REGISTER******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then(function(handleResponse){

        console.log("++++++++++++++++REGISTER RESPONSE++++++++++++++++");
        var response = handleResponse.json().then(handleResponse=>handleResponse);
        console.log(response);

    })
    .then(user => {
        console.log(user);

        return user;
    });

}

// Set Supervisor
function setSupervisor(team_id, supervisor_id) {

    var url = "http://172.26.88.107:8081/api/v1/team/" + team_id
    var data = {
        'team_id' : team_id,
        'supervisor_id' : supervisor_id
    }

    const requestOptions = {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
    };

    console.log("*******************Set Supervisor******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
        .then(function(handleResponse){

            console.log("++++++++++++++++Set Supervisor RESPONSE++++++++++++++++");
            console.log(requestOptions);
            var response = handleResponse.json().then(handleResponse=>handleResponse);
            console.log(response);

        })
        .then(user => {
            console.log(user);

            return user;
        });

}

// Set Co-Supervisor
function setCoSupervisor(team_id, cosupervisor_id) {

    var url = "http://172.26.88.107:8081/api/v1/team/" + team_id
    var data = {
        'team_id': team_id,
        'secondary_supervisor_id': cosupervisor_id
    }

    const requestOptions = {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data)
    };

    console.log("*******************Set Supervisor******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
        .then(function (handleResponse) {

            console.log("++++++++++++++++Set Supervisor RESPONSE++++++++++++++++");
            console.log(requestOptions);
            var response = handleResponse.json().then(handleResponse => handleResponse);
            console.log(response);

        })
        .then(user => {
            console.log(user);

            return user;
        });

}

//Get all supervisors in system
function getSupervisors() {

    // Should access to the confluences
    var url = 'http://172.26.88.107:8081/api/v1/supervisor';

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };

    return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((jsonData) => {
            storePut("supervisor_list", jsonData.data.supervisors);
            console.log("%%%%%%%%%%%%%%%%% Check the Super data inside %%%%%%%%%%%%%%%%%");
            console.log(storeGet("supervisor_list"));
        });
}

//Get supervisor details
function getSupervisor(id) {

    // Should access to the confluences
    var url = 'http://172.26.88.107:8081/api/v1/supervisor/' + id;

    const requestOptions = {
        method: 'GET',
        credentials: "include",
    };


    return fetch(url, requestOptions, id)
        .then((response) => response.json())
        .then((jsonResponse) => {
            var supervisorName = jsonResponse.data.name;
            var storeName = "supervisor_" + id + "_name";
            storePut(storeName, supervisorName);
        });
            

}

//TODO get list of all supervisors in a subject
/*
function getSupervisors(subjectName){

    // Should access to the confluences
    var url = 'http://172.26.88.107:8081/api/v1/subject/90014/2019/supervisors';
    var data = {
        // 'subjectName' : subjectName,
    }
    const requestOptions = {
        method: 'GET',
        credentials: "include",
        body: JSON.stringify(data)
    };

    console.log("*******************RETURN SUPERVISORS******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
        .then(function(handleResponse){

            ("++++++++++++++++RETURN SUPERVISORS RESPONSE++++++++++++++++");
            var response = handleResponse.json().then(handleResponse=>handleResponse);
            console.log(response);
            // response.then(function (response) {
            //     const teams = response.data[0];
            //     const numSupervisors = teams.length
            //     var i;
            //     var supervisors = [];
            //
            //     for (i = 0; i < numSupervisors; i++) {
            //         var supervisorData = { fullName: '', confluenceUser: '' };
            //
            //         supervisorData.fullName = teams[i].project_name;
            //         supervisorData.confluenceUser = teams[i].supervisor.supervisor_id;
            //
            //         supervisors.push(supervisorData);
            //     }

                storePut("supervisorList", response);

            });
        // })

        // .then(supervisorList=> {
        //     // store the returned project list for the importing
        //     localStorage.setItem('supervisorList', JSON.stringify(supervisorList));
        //     return supervisorList;
        // });

}
*/

// Get the informations that the coordinator homepage needed
function getHomepage(user, offset) {
    //append userid to url, offset not used currently
    var url = "http://172.26.88.107:8081/api/v1/team?account_id=" + user;
    const requestOptions = {
        method: 'GET',
        credentials: 'include',

    };
    console.log("*******************GET CORHP******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        console.log(jsonData.data);
        storePut("project_list",jsonData.data.teams);
        console.log("%%%%%%%%%%%%%%%%% Check the data inside %%%%%%%%%%%%%%%%%");
        console.log(jsonData.data.teams[0]);
        console.log(storeGet("project_list"));
    });



    // return fetch(url, requestOptions)
    //     .then(function (handleResponse) {
    //         console.log("++++++++++++++++GET CORHP RESPONSE++++++++++++++++");
    //         console.log(handleResponse);
    //         var response = handleResponse.json().then(handleResponse => handleResponse);
    //         response.then(function (response) {
    //             const teams = response.teams[0];
    //             const numTeams = teams.length
    //             var i;
    //             var projects = [];

    //             for (i = 0; i < numTeams; i++) {
    //                 var projectData = { name: '', supervisor: '', secondary_supervisor: '', proj_id: '' };

    //                 projectData.name = teams[i].project_name;
    //                 projectData.supervisor = teams[i].supervisor.supervisor_id;
    //                 projectData.secondary_supervisor = teams[i].secondary_supervisor.secondary_supervisor_id;
    //                 projectData.proj_id = teams[i].id;

    //                 projects.push(projectData);
    //             }

    //             //storePut("project_list", projects);
                
    //             storePut("project_list",projects);
    //             console.log("Check the data inside");
    //             console.log(storeGet("project_list"));
              
    //         });
    //     });
}


function loginConfluence(confluenceUsername, confluencePassword){
    var url = 'http://172.26.88.107:8081/api/v1/account/atlassian/login';
    var data = {};

    data = {
        'atl_username' : confluenceUsername,
        'atl_password' : confluencePassword
    };

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************CONFLUENCE LOGIN******************");

    return fetch(url, requestOptions)
    .then(function(handleResponse){

        console.log("++++++++++++++++CONFLUENCE LOGIN RESPONSE++++++++++++++++");
        console.log(handleResponse);
        var response = handleResponse.json().then(handleResponse=>handleResponse);
        console.log(response);

    })
    .then(confluenceUser => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('confluenceUser', JSON.stringify(confluenceUser));
        return confluenceUser;
    });



}



// Coordinator Send invitation emails to the supervisor
function sendEmail(emails,emailText){


    var url = "http://172.26.88.107:8081/api/v1/invite";
    console.log(emails);
    var emailList = emails.split(",");

    var data = {
        'emails' :  emailList ,
        'template' : emailText,
    };
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************SEND EMAIL******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then(function(handleResponse){

        console.log("++++++++++++++++SEND EMAIL RESPONSE++++++++++++++++");
        var response = handleResponse.json().then(handleResponse=>handleResponse);
        console.log(response);

    })
    .then(user => {
        console.log(user);

        return user;
    });

}


// Return the projectl list 
function returnProjects(subjectName){

    // Should access to the confluences
    var url = 'http://172.26.88.107:8081/api/v1/confluence/groups/searchteam/';
    url += subjectName;

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************RETURN PROJECTS******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        console.log(jsonData.data);
        storePut("confluenceData",jsonData.data);
        console.log(storeGet("confluenceData"));
    })
    .then(projectList=> {
        // store the returned project list for the importing 
        //localStorage.setItem('projectList', JSON.stringify(projectList));
        return projectList;
    });

}


// Import returned projects to the system
function importProject(projectName){

        //projectName = 'swen90013-2020-ce';
        console.log(projectName);
        var projectSubName = projectName.split("-");
        var year = parseInt(projectSubName[1]);

        var data = {
            'team' : projectName,
            'subject' : projectSubName[0],
            'year' : year,
            'project' : projectSubName[2]
        }

        var url = 'http://172.26.88.107:8081/api/v1/team';

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data)
        };
    
        console.log("*******************IMPORT PROJECT******************");
        console.log(requestOptions);
    
        return fetch(url, requestOptions)
        .then(function(handleResponse){
    
            ("++++++++++++++++IMPORT PROJECT RESPONSE++++++++++++++++");
            console.log(handleResponse)
            var response = handleResponse.json().then(handleResponse=>handleResponse);
            console.log(response);
    
        })
        .then(projectName =>{

            console.log(projectName);
            return projectName;

        });

}


// TODO
function AllPagesOnConfluence(projectName){


    var url = 'http://172.26.88.107:8081/api/v1/confluence/spaces/' + projectName + '/pages/contributions';

    // Temporary testing:
    url = 'http://172.26.88.107:8081/api/v1/confluence/spaces/SWEN900132020SP/pages/contributions';


    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    console.log("*******************REQUEST: ALL PAGES ON CONFLUNECE******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        storePut("allPagesOnConfluence",jsonData.data);
        
        console.log("*******************RESPONSE: ALL PAGES ON CONFLUNECE******************");
        console.log(storeGet("allPagesOnConfluence"));
    });


}



// Get single user from the confluneces
function numPagesPerMember(username){
    var url = 'http://172.26.88.107:8081/api/v1/confluence/users/' + username;

    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };

    console.log("*******************CONFLUNECE PER PERSON******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        storePut("numPagesPerMember",jsonData.data);
        console.log(storeGet("numPagesPerMember"));
    });

}


function loginGit(gitUsername,gitPwd){
    var url = 'http://172.26.88.107:8081/api/v1/account/atlassian/login';
    var data = {};

    data = {
        'atl_username' : gitUsername,
        'atl_password' : gitPwd
    };

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************GIT LOGIN******************");

    return fetch(url, requestOptions)
    .then(function(handleResponse){

        console.log("++++++++++++++++GIT LOGIN RESPONSE++++++++++++++++");
        console.log(handleResponse);
        var response = handleResponse.json().then(handleResponse=>handleResponse);
        console.log(response);

    })
    .then(confluenceUser => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('confluenceUser', JSON.stringify(confluenceUser));
        return confluenceUser;
    });

}

function totalCodeCommits(projectName){
    
    var url = 'http://172.26.88.107:8081/api/v1/git/commit';

    var gitUrl = 'https://github.com/LikwunCheung/TeamSPBackend';

    var data = {
        'url' : gitUrl,
    };

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************TOTAL CODE COMMITS******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        storePut("totalCodeCommits",jsonData.data);
        console.log(storeGet("totalCodeCommits"));
    });


}


// TODO
function codeCommitsPerMember(projectName, MemberName){

    var url = 'http://172.26.88.107:8081/api/v1/git/commit';

    var gitUrl = 'https://github.com/LikwunCheung/TeamSPBackend';

    var data = {
        'url' : gitUrl,
        'author' : MemberName
    };

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    console.log("*******************COMMITS PER PERSON******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((jsonData) => {
        storePut("commitsPerMember",jsonData.data);
        console.log(storeGet("commitsPerMember"));
    });
    

}



function getSlackUser(team, user){
    
    var url = 'http://172.26.88.107:8081/api/v1/slack/';
    url += team;
    // url += '1';
    url += '/member/';
    url += user;
    // url += '9020435';
    url += '?sprint_num=0 ';
    //var url = 'http://172.26.88.107:8081/api/v1/slack/1';

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET SLACK USER******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            console.log("SLACK DATA");
            console.log(jsonData.data);
            storePut("slackUser",jsonData.data);
            console.log(storeGet("slackUser"));
        })
        .then(slackUser=> {
            // store the team tickets
            //localStorage.setItem('projectList', JSON.stringify(projectList));
            return slackUser;
        });
}

function setConfiguration(teamId, memberId, gitName, slackEmail) {

    var url = 'http://172.26.88.107:8081/api/v1/team/'
    url += teamId;
    url += '/members/';
    url += memberId;

    var data = {};

    if (gitName != null) {
        data['git_name'] = gitName
    }
    if (gitName != null) {
        data['slack_email'] = slackEmail
    }

    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
    };

    return fetch(url, requestOptions);
}


function getConfiguration(teamId, memberId) {
    
    var url = 'http://172.26.88.107:8081/api/v1/team/'
    url += teamId;
    url += '/members/';
    url += memberId;

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };


    console.log(url)
    return fetch(url, requestOptions)
        .then((response) => response.json()) 
        .then((jsonData) => {
            console.log(jsonData)
            storePut("setting", jsonData.data);
            return 
        })

}
function getSlackTeam(team, sprint){

    var url = 'http://172.26.88.107:8081/api/v1/slack/';
    url += team;
    url += '?sprint_num= ';
    url += sprint;
    url += ' ';
    // url += '?sprint_num=0 ';

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET SLACK TEAM******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            console.log("SLACK TEAM DATA");
            console.log(jsonData.data);
            storePut("slackTeam",jsonData.data);
            console.log(storeGet("slackTeam"));
        })
        .then(slackTeam=> {
            return slackTeam;
        });
}




function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        console.log("*******************HANDLE RESPOND******************");
        


        if (!response.ok) {
            if (response.status === 401) {
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


function getJsonValue(obj,name){
    var result = null;
    var value  = null;
    for(var key in obj){        
        value = obj[key];
        if(key == name){
            return value;
        } else {
            if( typeof value == "object" ){
                result = getJsonValue(value,name);
                console.log(result);
            }
        }
    }
    return result;
}

// Get the JIRA tickets for a team
function getJiraTeam(teamName){

    // Access the db to retrieve JIRA tickets
    // var url = 'http://172.26.88.107:8081/api/v1/jira/SWEN90013-2020-SP/tickets';
    var url = 'http://172.26.88.107:8081/api/v1/jira/';
    url += teamName;
    url += '/tickets';

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET JIRA TEAM******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData.data);
            storePut("jiraTeam",jsonData.data);
            console.log(storeGet("jiraTeam"));
        })
        .then(jiraTeamTickets=> {
            // store the team tickets
            //localStorage.setItem('projectList', JSON.stringify(projectList));
            return jiraTeamTickets;
        });

}

// Get the JIRA tickets for a user
function getJiraUser(teamName, user){

    // Access the db to retrieve JIRA tickets
    // var url = 'http://172.26.88.107:8081/api/v1/jira/SWEN90013-2020-SP/tickets';
    var url = 'http://172.26.88.107:8081/api/v1/jira/';
    url += teamName;
    url += '/tickets/';
    url += user;

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET JIRA USER******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData.data);
            storePut("jiraUser",jsonData.data);
            console.log(storeGet("jiraUser"));
        })
        .then(jiraUserTickets=> {
            // store the team tickets
            //localStorage.setItem('projectList', JSON.stringify(projectList));
            return jiraUserTickets;
        });

}

// Get list of team members
function getTeamList(teamID){

    // Access the db to retrieve team list
    var url = 'http://172.26.88.107:8081/api/v1/team/';
    url += teamID;
    url += '/members';

    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET TEAM LIST******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            storePut("teamList",jsonData.data.team_members);
            console.log(storeGet("teamList"));
        })
        .then(teamList=> {
            // store the team tickets
            //localStorage.setItem('projectList', JSON.stringify(projectList));
            return teamList;
        });

}



// Get a member's IDs Configuration based on the team id
function getMemberConfiguration(teamID, memberID){

    //var url = 'http://172.26.88.107:8081/api/v1/team/1/members/63';
    var url = 'http://172.26.88.107:8081/api/v1/team/1/members/'
    url += memberID;
    const requestOptions = {
        method: 'GET',
        credentials: 'include'
    };

    console.log("*******************GET MEMBER CONFIGURATION******************");
    console.log(requestOptions);

    return fetch(url, requestOptions)

        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData.data);
            //console.log(jsonData.data.team_members);
            storePut("memberConfig",jsonData.data);
            console.log(storeGet("memberConfig"));
        })
        .then(memberID=> {
            // store the team tickets
            //localStorage.setItem('projectList', JSON.stringify(projectList));
            return memberID;
        });

}