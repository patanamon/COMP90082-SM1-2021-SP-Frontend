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
    case userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_SUCCESS:
      return {
        ...state,
        individualGithubCommits: action.payload
      }
    case userConstants.GET_INDIVIDUAL_GITHUB_COMMITS_FAILURE:
      return {
        ...state,
        individualGithubCommits: {}
      }
    case userConstants.GET_INDIVIDUAL_JIRA_COUNT_SUCCESS:
      return {
        ...state,
        individualJiraCount: action.payload
      }
    case userConstants.GET_INDIVIDUAL_JIRA_COUNT_FAILURE:
      return {
        ...state,
        individualJiraCount: {}
      }
    case userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_SUCCESS:
      return {
        ...state,
        individualConfluencePages: action.payload
      }
    case userConstants.GET_INDIVIDUAL_CONFLUENCE_PAGES_FAILURE:
      return {
        ...state,
        individualConfluencePages: {}
      }
    default:
      return state;
  }
}
