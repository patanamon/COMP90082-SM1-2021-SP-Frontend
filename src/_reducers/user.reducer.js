import { userConstants } from "../_constants";
import { commonConstants } from "../_constants";

const initState = {
  requestIndividualConfluencePages: false,
  requestIndividualGitHubCommits: false,
  requestIndividualJiraCounts: false,
  requestTeamConfluencePages: false,
  requestTeamGithubCommits: false,
  requestTeamJiraTickets: false,
  requestSetTeamInfo: false,
  requestTeamCodeMetrics: false,
  requestConfluenceSpaceByKeyWord: false,
  importProject: false,
  requestImportedProject: false,
  currentTeamKey: "",
  currentTeamName: "",
  requestProjectInfo:false,
  sendImportRequest:false,
  
};

export function user(state = initState, action) {
  switch (action.type) {
    case userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_REQUEST:
      return {
        ...state,
        requestIndividualConfluencePages: true,
      }

    case userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_SUCCESS:
      return {
        ...state,
        requestIndividualConfluencePages: false,
        individualConfluencePages: action.payload,
      }
    case userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_FAILURE:
      return {
        ...state,
        requestIndividualConfluencePages: false,
        individualConfluencePages: {},
      }
    case userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_REQUEST:
      return {
        ...state,
        requestIndividualGitHubCommits: true,
      }
  
    case userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_SUCCESS:
      return {
        ...state,
        requestIndividualGitHubCommits: false,
        individualGitHubCommits: action.payload,
      }
    case userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_FAILURE:
      return {
        ...state,
        requestIndividualGitHubCommits: false,
        individualGitHubCommits: {},
      }
    case userConstants.GET_INDIVIDUAL_JIRA_COUNTS_REQUEST:
      return {
        ...state,
        requestIndividualJiraCounts: true,
      }
    
    case userConstants.GET_INDIVIDUAL_JIRA_COUNTS_SUCCESS:
      return {
          ...state,
          requestIndividualJiraCounts: false,
          individualJiraCounts: action.payload,
        }
      case userConstants.GET_INDIVIDUAL_JIRA_COUNTS_FAILURE:
        return {
          ...state,
          requestIndividualJiraCounts: false,
          individualJiraCounts: {},
        }
    case userConstants.SEND_IMPORT_REQUEST:
      return {
        ...state,
        sendImportRequest: true,
      };
    case userConstants.SEND_IMPORT_SUCCESS:
      return {
        ...state,
        sendImportRequest: false,
        importRequest: action.payload,
      };
    case userConstants.SEND_IMPORT_FAILURE:
      return {
        ...state,
        sendImportRequest: false,
        importRequest: {},
      };
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

    case userConstants.GET_TEAM_CODE_METRICS_REQUEST:
      return {
        ...state,
        requestTeamCodeMetrics: true,
      };
    case userConstants.GET_TEAM_CODE_METRICS_SUCCESS:
      return {
        ...state,
        teamCodeMetrics: action.payload,
        requestTeamCodeMetrics: false,
      };
    case userConstants.GET_TEAM_CODE_METRICS_FAILURE:
      return {
        ...state,
        requestTeamCodeMetrics: false,
      };
    case userConstants.SETTEAMINFO_REQUEST:
      return {
        ...state,
        requestSetTeamInfo: true,
      };
    case userConstants.SETTEAMINFO_SUCCESS:
      return {
        ...state,
        requestSetTeamInfo: false,
        teamInfo: JSON.parse(
          localStorage.getItem(commonConstants.TEAM_CONFIG_INFO)
        ),
      };
    case userConstants.SETTEAMINFO_FAILURE:
      return {
        ...state,
        requestSetTeamInfo: false,
      };
    case userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_REQUEST:
      return {
        ...state,
        requestConfluenceSpaceByKeyWord: true,
      };
    case userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_SUCCESS:
      return {
        ...state,
        confluenceSpaceSearchResult: action.payload,
        requestConfluenceSpaceByKeyWord: false,
      };
    case userConstants.GET_CONFLUENCE_SPACE_BY_KEY_WORD_FAILURE:
      return {
        ...state,
        requestConfluenceSpaceByKeyWord: false,
      };
    case userConstants.GET_TEAM_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        teamMemberList: action.payload,
      };
    case userConstants.GET_TEAM_MEMBER_LIST_FAILURE:
      return {
        ...state,
        teamMemberList: {},
      };
    case userConstants.GET_TEAM_MEMBER_NUMBER_SUCCESS:
      return {
        ...state,
        teamMemberNumber: action.payload,
      };
    case userConstants.GET_TEAM_MEMBER_NUMBER_FAILURE:
      return {
        ...state,
        teamMemberLNumber: {},
      };
    case userConstants.IMPORT_PROJECT_REQUEST:
      return {
        ...state,
        importProject: true,
      };
    case userConstants.IMPORT_PROJECT_SUCCESS:
      return {
        ...state,
        importProject: false,
      };
    case userConstants.IMPORT_PROJECT_FAILURE:
      return {
        ...state,
        importProject: false,
      };
    case userConstants.GET_IMPORTED_PROJECT_REQUEST:
      return {
        ...state,
        requestImportedProject: true,
      };
    case userConstants.GET_IMPORTED_PROJECT_SUCCESS:
      return {
        ...state,
        importedProject: action.payload,
        requestImportedProject: false,
      };
    case userConstants.GET_IMPORTED_PROJECT_FAILURE:
      return {
        ...state,
        requestImportedProject: false,
      };
    case userConstants.SET_CURRENT_TEAM_NAME:
      return {
        ...state,
        currentTeamName: action.payload,
      };
    case userConstants.SET_CURRENT_TEAM_KEY:
      return {
        ...state,
        currentTeamKey: action.payload,
      };
      
    case userConstants.GETPROJECTINFO_REQUEST:
      return {
        ...state,
        requestProjectInfo: true,
      };
    case userConstants.GETPROJECTINFO_SUCCESS:
      return {
        ...state,
        requestProjectInfo: false,
        projectInfo: action.payload,
      };
    case userConstants.GETPROJECTINFO_FAILURE:
      return {
        ...state,
        requestProjectInfo: false,
        projectInfo: {},
      };  
    default:
      return state;
  }
}
