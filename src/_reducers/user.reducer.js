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

    case userConstants.GET_TEAM_GITHUB_COMMENTS_SUCCESS:
      return {
        ...state,
        teamGitHubComments: action.payload
      }

    case userConstants.GET_TEAM_GITHUB_COMMENTS_FAILURE:
      return {
        ...state,
        teamGitHubComments : {}
      }

    case userConstants.GET_TEAM_CONFLUENCE_MEETINGS_SUCCESS:
      return {
        ...state,
        teamConfluenceMeeting: action.payload
      }

    case userConstants.GET_TEAM_CONFLUENCE_MEETINGS_FAILURE:
      return {
        ...state,
        teamConfluenceMeeting: {}
      }
    default:
      return state;
  }
}
