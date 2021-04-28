import { userConstants } from "../_constants";

const initState = {
  requestTeamConfluencePages: false,
  requestTeamGithubCommits: false,
  requestTeamJiraTickets: false,
  requestSetTeamUrl: false,
  currentTeamKey: "",
  currentTeamName: "",
  requestProjectId:false,
  requestProjectLink:false,
  requestProjectName:false,
};

export function user(state = initState, action) {
  switch (action.type) {
    case userConstants.GET_TEAM_CONFLUENCE_PAGES_REQUEST:
      return {
        ...state,
        requestTeamConfluencePages: true,
      };
    case userConstants.GET_TEAM_CONFLUENCE_PAGES_SUCCESS:
      return {
        ...state,
        requestTeamConfluencePages: false,
        teamConfluencePages: action.payload,
      };
    case userConstants.GET_TEAM_CONFLUENCE_PAGES_FAILURE:
      return {
        ...state,
        requestTeamConfluencePages: false,
        teamConfluencePages: {},
      };
    case userConstants.GET_TEAM_GITHUB_COMMITS_REQUEST:
      return {
        ...state,
        requestTeamGithubCommits: true,
      };
    case userConstants.GET_TEAM_GITHUB_COMMITS_SUCCESS:
      return {
        ...state,
        requestTeamGithubCommits: false,
        teamGithubCommits: action.payload,
      };
    case userConstants.GET_TEAM_GITHUB_COMMITS_FAILURE:
      return {
        ...state,
        requestTeamGithubCommits: false,
        teamGithubCommits: {},
      };
    case userConstants.GET_TEAM_JIRA_TICKETS_REQUEST:
      return {
        ...state,
        requestTeamJiraTickets: true,
      };
    case userConstants.GET_TEAM_JIRA_TICKETS_SUCCESS:
      return {
        ...state,
        requestTeamJiraTickets: false,
        teamJiraTickets: action.payload,
      };
    case userConstants.GET_TEAM_JIRA_TICKETS_FAILURE:
      return {
        ...state,
        requestTeamJiraTickets: false,
        teamJiraTickets: {},
      };
    case userConstants.GET_TEAM_GITHUB_COMMENTS_SUCCESS:
      return {
        ...state,
        teamGitHubComments: action.payload,
      };
    case userConstants.GET_TEAM_GITHUB_COMMENTS_FAILURE:
      return {
        ...state,
        teamGitHubComments: {},
      };
    case userConstants.GET_TEAM_CONFLUENCE_MEETINGS_SUCCESS:
      return {
        ...state,
        teamConfluenceMeeting: action.payload,
      };
    case userConstants.GET_TEAM_CONFLUENCE_MEETINGS_FAILURE:
      return {
        ...state,
        teamConfluenceMeeting: {},
      };

    case userConstants.GET_PRODUCT_QUALITY_PAGES_SUCCESS:
      return {
        ...state,
        teamProductPages: action.payload
      }
    case userConstants.GET_PRODUCT_QUALITY_PAGES_FAILURE:
      return {
        ...state,
        teamProductPages: []
      }
    case userConstants.SETTEAMURL_REQUEST:
      return {
        ...state,
        requestSetTeamUrl: true,
      };
    case userConstants.SETTEAMURL_SUCCESS:
      return {
        ...state,
        requestSetTeamUrl: false,
        teamUrl: JSON.parse(localStorage.getItem("TeamUrl")),
      };
    case userConstants.SETTEAMURL_FAILURE:
      return {
        ...state,
        requestSetTeamUrl: false,
      };
      
        case userConstants.GETPROJECTID_REQUEST:
      return {
        ...state,
        requestProjectId: true,
      };
    case userConstants.GETPROJECTID_SUCCESS:
      return {
        ...state,
        requestProjectId: false,
        projectId: action.payload,
      };
    case userConstants.GETPROJECTID_FAILURE:
      return {
        ...state,
        requestProjectId: false,
        projectId: {},
      };
    case userConstants.GETPROJECTNAME_REQUEST:
      return {
        ...state,
        requestProjectName: true,
      };
    case userConstants.GETPROJECTNAME_SUCCESS:
      return {
        ...state,
        requestProjectName: false,
        projectName: action.payload,
      };
    case userConstants.GETPROJECTNAME_FAILURE:
      return {
        ...state,
        requestProjectName: false,
        projectName: {},
      };
      
    case userConstants.GETPROJECTLINK_REQUEST:
      return {
        ...state,
        requestProjectLink: true,
      };
    case userConstants.GETPROJECTLINK_SUCCESS:
      return {
        ...state,
        requestProjectLink: false,
        projectLink: action.payload,
      };
    case userConstants.GETPROJECTLINK_FAILURE:
      return {
        ...state,
        requestProjectLink: false,
        projectLink: {},
      };  
    
        
    default:
      return state;
  }
}
