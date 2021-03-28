import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { store } from '../_helpers';

// Remember: Add new actions in here, otherwise it cannot be recognise by this.props.
// ALSO REMEMBER TO ADD RETURN MSG IN user.constants.js
export const userActions = {
    login,
    logout,
    register,
    sendEmail,

    loginConfluence,
    // getHomepage,
    setSupervisor,
    setCoSupervisor,
    getSupervisor,
    getSupervisors,

    // Get Configuration
    getTeamList,
    getMemberConfiguration,

    // getCoordinatorHomepage,
    getHomepage,
    returnProjects,
    importProject,
    getJiraTeam,
    getJiraUser,

    // Get Slack
    getSlackUser,
    getSlackTeam,

    //Confluneces quality - individual contribution
    AllPagesOnConfluence,
    numPagesPerMember,

    //Git commit - Product Quality
    totalCodeCommits,
    codeCommitsPerMember,

    // Configure
    getConfiguration,
    setConfiguration,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log("****************Login Success*********");
                    console.log(user)
                    if(user.message == "success"){
                        if(user.data.role == 0) {
                            history.push('/CoordinatorHomePage');
                        }else{
                            history.push('/SupervisorHomePage');
                        }
                        dispatch(success(user));
                    }else{
                        dispatch(failure(user.message));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    //history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getHomepage(username, offset){


    return dispatch => {

        dispatch(request({ username, offset }));

        userService.getHomepage(username, offset)
            .then(
                username => {
                    dispatch(success(username));
                },
                error => {
                    dispatch(failure(username, error.toString()));
                }
            );
    };
    
    function request(username) { return {type: userConstants.GETCORHP_REQUEST, username} }
    function success(username) { return { type: userConstants.GETCORHP_SUCCESS, username } }
    function failure(error) { return { type: userConstants.GETCORHP_FAILURE, error } }

}

//Set Supervisor
function setSupervisor(team_id, supervisor_id){
    return dispatch => {
        dispatch(request(team_id, supervisor_id));

        userService.setSupervisor(team_id, supervisor_id)
            .then(
                user => {
                    dispatch(success());
                    //history.push('/CoordinatorHomePage');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(supervisor) { return { type: userConstants.SETSUPER_REQUEST, supervisor } }
    function success(supervisor) { return { type: userConstants.SETSUPER_SUCCESS, supervisor } }
    function failure(error) { return { type: userConstants.SETSUPER_FAILURE, error } }
}

//Set CoSupervisor
function setCoSupervisor(team_id, cosupervisor_id) {
    return dispatch => {
        dispatch(request(team_id, cosupervisor_id));

        userService.setCoSupervisor(team_id, cosupervisor_id)
            .then(
                user => {
                    dispatch(success());
                   // history.push('/CoordinatorHomePage');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(cosupervisor) { return { type: userConstants.SETSUPER_REQUEST, cosupervisor } }
    function success(cosupervisor) { return { type: userConstants.SETSUPER_SUCCESS, cosupervisor } }
    function failure(error) { return { type: userConstants.SETSUPER_FAILURE, error } }
}

//Get list of Supervisors for a subject based on subject name (e.g. SWEN90013-2020)
function getSupervisors(subjectName){


    return dispatch => {

        dispatch(request({subjectName}));
        userService.getSupervisors(subjectName)
            .then(
                subjectName => {
                    dispatch(success());
                    console.log(subjectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(subjectName) { return { type: userConstants.GETSUPERS_REQUEST, subjectName } }
    function success(subjectName) { return { type: userConstants.GETSUPERS_SUCCESS, subjectName } }
    function failure(subjectName, error) { return { type: userConstants.GETSUPERS_FAILURE, subjectName, error } }
}

//Get details for one Supervisor
function getSupervisor(id) {


    return dispatch => {

        dispatch(request({ id }));
        userService.getSupervisor(id)
            .then(
                id => {
                    dispatch(success());                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETSUPER_REQUEST, id } }
    function success(id) { return { type: userConstants.GETSUPER_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETSUPER_FAILURE, id, error } }
}

// Send invitation Email to the supervisor
function sendEmail(emails, emailText){

        return dispatch => {

            dispatch(request({emails, emailText}));           
            userService.sendEmail(emails, emailText)
                .then(
                    user => {
                        dispatch(success());
                        console.log(user);
                    },
                    error => {
                        dispatch(failure(error.toString()));
                    }
                );
        };
    
        function request() { return {type: userConstants.SENDEMAIL_REQUEST} }
        function success() { return { type: userConstants.SENDEMAIL_SUCCESS} }
        function failure(error) { return { type: userConstants.SENDEMAIL_FAILURE, error } }
    

}



function loginConfluence(confluenceUsername,confluencePassword){

    return dispatch => {
        dispatch(request({ confluenceUsername,confluencePassword }));

        userService.loginConfluence(confluenceUsername,confluencePassword)
            .then(
                confluenceUser => { 
                    if(confluenceUser)
                    dispatch(success());

                    console.log("****************Conflunece Login Success*********");
                    console.log(confluenceUser);
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGINCONFLU_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGINCONFLU_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGINCONFLU_FAILURE, error } }

}


// Return projects based on the subject name. e.g. SWEN90013-2020
function returnProjects(subjectName){


    return dispatch => {

        dispatch(request({subjectName}));           
        userService.returnProjects(subjectName)
            .then(
                subjectName => {
                    dispatch(success());
                    console.log(subjectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.RTNPROJECTS_REQUEST, id } }
    function success(id) { return { type: userConstants.RTNPROJECTS_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.RTNPROJECTS_FAILURE, id, error } }
}

// Import returned projects to the system
function importProject(projectName){

    return dispatch => {

        dispatch(request({projectName}));           
        userService.importProject(projectName)

            .then(
                projectName => {
                    dispatch(success());
                    console.log(projectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };


    function request(projectName) { return {type: userConstants.IMPPROJECT_REQUEST, projectName} }
    function success(projectName) { return { type: userConstants.IMPPROJECT_SUCCESS, projectName} }
    function failure(error) { return { type: userConstants.IMPPROJECT_FAILURE, projectName, error }
    }
}


//All Pages On Confluence
function AllPagesOnConfluence(projectName){
    return dispatch => {

        dispatch(request({projectName}));           
        userService.AllPagesOnConfluence(projectName)

            .then(
                projectName => {
                    dispatch(success());
                    console.log(projectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };


    function request(projectName) { return {type: userConstants.ALLPAGECONFLU_REQUEST, projectName} }
    function success(projectName) { return { type: userConstants.ALLPAGECONFLU_SUCCESS, projectName} }
    function failure(error) { return { type: userConstants.ALLPAGECONFLU_FAILURE, projectName, error }
    }

}


//Nunmber of Pages per member On Conflunece
function numPagesPerMember(username){
    return dispatch => {

        dispatch(request({username}));           
        userService.numPagesPerMember(username)

            .then(
                username => {
                    dispatch(success());
                    console.log(username);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };


    function request(username) { return {type: userConstants.PERPAGECONFLU_REQUEST, username} }
    function success(username) { return { type: userConstants.PERPAGECONFLU_SUCCESS, username} }
    function failure(error) { return { type: userConstants.PERPAGECONFLU_FAILURE, username, error }
    }
}


function totalCodeCommits(projectName){
    return dispatch => {

        dispatch(request({projectName}));           
        userService.totalCodeCommits(projectName)

            .then(
                projectName => {
                    dispatch(success());
                    console.log(projectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                } 
            );
    };

    function request(projectName) { return {type: userConstants.TOTALCOMMIT_REQUEST, projectName} }
    function success(projectName) { return { type: userConstants.TOTALCOMMIT_SUCCESS, projectName} }
    function failure(error) { return { type: userConstants.TOTALCOMMIT_FAILURE, projectName, error }}
}



function codeCommitsPerMember(projectName, MemberName){
    return dispatch => {

        dispatch(request({projectName, MemberName}));           
        userService.codeCommitsPerMember(projectName, MemberName)

            .then(
                projectName => {
                    dispatch(success());
                    console.log(projectName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
    function request(projectName) { return {type: userConstants.PERCOMMIT_REQUEST, projectName} }
    function success(projectName) { return { type: userConstants.PERCOMMIT_SUCCESS, projectName} }
    function failure(error) { return { type: userConstants.PERCOMMIT_FAILURE, projectName, error } }
}



function getSlackUser(team, user){
    return dispatch => {

        dispatch(request({team, user}));
        userService.getSlackUser(team, user)

            .then(
                user => {
                    dispatch(success());
                    console.log(team, user);
                    console.log("****************Get Slack Success*********");
                },
                error => {
                    dispatch(failure(error.toString()));
                } 
            );
    };

    function request(user) { return {type: userConstants.GETSLACK_REQUEST, user} }
    function success(user) { return { type: userConstants.GETSLACK_SUCCESS, user} }
    function failure(error) { return { type: userConstants.GETSLACK_FAILURE, user, error }}
}

function getSlackTeam(team, sprint){
    return dispatch => {

        dispatch(request({team, sprint}));
        userService.getSlackTeam(team, sprint)

            .then(
                team => {
                    dispatch(success());
                    console.log(team, sprint);
                    console.log("****************Get Team Slack Success*********");
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(team) { return {type: userConstants.GETSLACK_REQUEST, team} }
    function success(team) { return { type: userConstants.GETSLACK_SUCCESS, team} }
    function failure(error) { return { type: userConstants.GETSLACK_FAILURE, team, error }}
}





// Get JIRA tickets based on the team and user. e.g. SWEN90013-2020-SP
function getJiraUser(teamName, user){


    return dispatch => {

        dispatch(request({teamName, user}));
        userService.getJiraUser(teamName, user)
            .then(
                user => {
                    dispatch(success());
                    console.log(teamName, user);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETJIRA_REQUEST, id } }
    function success(id) { return { type: userConstants.GETJIRA_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETJIRA_FAILURE, id, error } }

}

// Get JIRA tickets based on the team. e.g. SWEN90013-2020-SP
function getJiraTeam(teamName){


    return dispatch => {

        dispatch(request({teamName}));
        userService.getJiraTeam(teamName)
            .then(
                teamName => {
                    dispatch(success());
                    console.log(teamName);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETJIRA_REQUEST, id } }
    function success(id) { return { type: userConstants.GETJIRA_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETJIRA_FAILURE, id, error } }
        
}

// Get list of team members based on the team id
function getTeamList(teamID) {
    return dispatch => {
        dispatch(request({ teamID }));
        userService.getTeamList(teamID)
            .then(
                teamID => {
                    dispatch(success());
                    console.log(teamID);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETTEAM_REQUEST, id } }
    function success(id) { return { type: userConstants.GETTEAM_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETTEAM_FAILURE, id, error } }

}
function getConfiguration(teamId, memberId) {
    return dispatch => {
        dispatch(request({ teamId, memberId }));
        userService.getConfiguration(teamId, memberId)
            .then(
                teamID => {
                    dispatch(success());
                    console.log(teamID);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETCONFIGURATION_REQUEST, id } }
    function success(id) { return { type: userConstants.GETCONFIGURATION_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.GETCONFIGURATION_FAILURE, id, error } }

}
function setConfiguration(teamId, memberId, gitName, slackEmail) {
    return dispatch => {
        dispatch(request({ teamId, memberId, gitName, slackEmail }));
        userService.getTeamList(teamId, memberId, gitName, slackEmail)
            .then(
                teamID => {
                    dispatch(success());
                    console.log(teamID);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.SETCONFIGURATION_REQUEST, id } }
    function success(id) { return { type: userConstants.SETCONFIGURATION_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.SETCONFIGURATION_FAILURE, id, error } }

}


// Get a member's IDs Configuration based on the team id
function getMemberConfiguration(teamID, memberID){
    return dispatch => {
        dispatch(request({teamID, memberID}));
        userService.getMemberConfiguration(teamID, memberID)
            .then(
                memberID => {
                    dispatch(success());
                    console.log(memberID);
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(id) { return { type: userConstants.GETMEMBERCONFIG_REQUEST, memberID } }
    function success(id) { return { type: userConstants.GETMEMBERCONFIG_SUCCESS, memberID } }
    function failure(id, error) { return { type: userConstants.GETMEMBERCONFIG_FAILURE, memberID, error } }

}
