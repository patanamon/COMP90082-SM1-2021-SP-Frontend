import { userConstants } from "../_constants";

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_TEAM_CONFLUENCE_PAGES_SUCCESS:
      return {
        ...state,
        teamConfluencePages: action.payload
      }
    case userConstants.GET_TEAM_CONFLUENCE_PAGES_FAILURE:
      return {
        ...state,
        teamConfluencePages: {}
      }
    case userConstants.GET_TEAM_GITHUB_COMMITS_SUCCESS:
      return {
        ...state,
        teamGithubCommits: action.payload
      }
    case userConstants.GET_TEAM_GITHUB_COMMITS_FAILURE:
      return {
        ...state,
        teamGithubCommits: {}
      }
    case userConstants.GET_TEAM_JIRA_TICKETS_SUCCESS:
      return {
        ...state,
        teamJiraTickets: action.payload
      }
    case userConstants.GET_TEAM_JIRA_TICKETS_FAILURE:
      return {
        ...state,
        teamJiraTickets: {}
      }
    case userConstants.GETCONFIGURATIONCON_SUCCESS:
      return {
        ...state,
        confluenceUrl: action.payload
      }
    case userConstants.GETCONFIGURATIONCON_FAILURE:
      return {
        ...state,
        confluenceUrl: {}
      }
    case userConstants.GETCONFIGURATIONGIT_SUCCESS:
      return {
        ...state,
        gitUrl: action.payload
      }
    case userConstants.GETCONFIGURATIONGIT_FAILURE:
      return {
        ...state,
        gitUrl: {}
      }
    case userConstants.GETCONFIGURATIONJIRA_SUCCESS:
      return {
        ...state,
        jiraUrl: action.payload
      }
    case userConstants.GETCONFIGURATIONJIRA_FAILURE:
      return {
        ...state,
        jiraUrl: {}
      }    
    case userConstants.SETCONFIGURATION_SUCCESS:
      return {
        ...state,
        teamUrl: action.payload
      }
    case userConstants.SETCONFIGURATION_FAILURE:
      return {
        ...state,
        teamUrl: {}
      }
    default:
      return state;
  }
}
