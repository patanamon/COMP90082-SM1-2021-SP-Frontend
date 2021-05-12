

      This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CIS Software Engineering Project System

This project aims to have a software system that automatically gathers and summarise all aspects of the software engineering activities of CIS (Computing and Information Systems) Software Projects (COMP90082) developed. This will allow course coordinators to monitor and promptly provide meaningful feedback to teams, improve the quality of processes used in development and software systems developed, thus ensuring software deployment at the end of every project.


# Table of Contents
[1.0 Project Overview](#1.0)

[2.0 Installation](#2.0)

[3.0 Usage](#2.0)

  * [3.1 Database](#3.1)

  * [3.2 API Documentation](#3.2)

  * [3.3 Web Application](#3.3)

[4.0 Contributing / Extending](#4.0)

  * [4.1 APIs](#4.1)

  * [4.2 Web Application](#3.2)
 
[5.0 Architecture Diagrams](#5.0)

<h1 id="1.0"> 1.0 Project Overview </h1>

## Background
Software Projects Subject (COMP90082) is the subject for students to perform necessary Software Engineering practices to successfully build a high-quality software product for real-world clients. To monitor, evaluate, and provide feedback to students, a supervisor will observe the Software Projects activities of a student team through the software development tools used and through student-supervisor meetings. The involved software development tools include a Version Control System (Git, GitHub/BitBucket/GitLab), a Task Management Tool (JIRA/Trello) and a Documentation tool (Confluence). Some processes would be considered to assess students include Software Testing, Code Review, Continuous Integration, and Deployment.

## Problem
The tools and processes that students use for these projects (as stated in Background) are diverse and are all accessed on different websites/platforms. Currently, supervisors have to manually open each tool to analyse the complete tasks on each of them. It is an inefficient and tedious process, especially if a supervisor monitors more than ten teams. Although some development tools (e.g., JIRA) provide visual summaries of a team's work, the visualisation only shows data from a single activity. Thus, it is difficult and time-consuming for supervisors to offer detailed and insightful feedback to students, especially if a supervisor has more than one team to supervise.

## Project
This project aims to have a software system that automatically gathers and summarise all aspects of the software engineering activities of CIS (Computing and Information Systems) Software Projects (COMP90082) developed. This will allow course coordinators to monitor and promptly provide meaningful feedback to teams, improve the quality of processes used in development and software systems developed, thus ensuring software deployment at the end of every project.

<h1 id="2.0"> 2.0 Installation </h1>

## Packages used (to do)

|                                              Package                                               |       Install command       |
| :------------------------------------------------------------------------------------------------: | :-------------------------: |
|                               [bootstrap](https://getbootstrap.com/)                               |      `npm i bootstrap`      |
|                     [history](https://github.com/ReactTraining/history#readme)                     |       `npm i history`       |
|                     [js-cookie](https://github.com/js-cookie/js-cookie#readme)                     |      `npm i js-cookie`      |
|                          [md5](https://github.com/pvorb/node-md5#readme)                           |         `npm i md5`         |
|                       [react-bootstrap](https://react-bootstrap.github.io/)                        |   `npm i react-bootstrap`   |
|                [react-confirm-alert](https://github.com/GA-MO/react-confirm-alert)                 | `npm i react-confirm-alert` |
| [react-cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie/#readme) |    `npm i react-cookie`     |
|                       [react-redux](https://github.com/reduxjs/react-redux)                        |     `npm i react-redux`     |
|              [react-router-dom](https://github.com/ReactTraining/react-router#readme)              |  `npm i react-router-dom`   |
|                          [recharts](https://github.com/recharts/recharts)                          |      `npm i recharts`       |
|                                   [redux](https://redux.js.org/)                                   |        `npm i redux`        |
|                  [redux-logger](https://github.com/LogRocket/redux-logger#readme)                  |    `npm i redux-logger`     |
|                       [redux-thunk](https://github.com/reduxjs/redux-thunk)                        |     `npm i redux-thunk`     |
|                        [styled-components](https://styled-components.com/)                         |  `npm i styled-components`  |

Note: These packages should be automatically installed as they are part of the package.json file.

## Available Scripts (need update?)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

<h1 id="3.0"> 3.0 Usage (to do) </h1>

v1: 15/11/2020

<h1 id="3.1"> 3.1 Database </h1>

### Database Schema:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.0+Database+schema

### Connecting to SP's Database (to do)

Connection can be made to our Database using the below credentials:
[Image of DB Credentials](https://github.com/Jarrent/CIS_SP_frontend/blob/master/sp_database.PNG)

 <h1 id="3.2">3.2 API Documentation </h1>
<h2> Spring 1 </h2>

### Subject:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.1+Subject

### Project:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.2+Project

### Team:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.3+Team

### Confluence:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.4+Confluence

### Jira:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.5+Jira

### Git:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.6+Git


<h2> Spring 2 </h2>

### Acceptance Test

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.1+Acceptance+Test

### Confluence API Designer

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.2+Confluence+API+Design

### Database Design

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.3+Database+Design

### Data Sample

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.4+Data+Sample

### Mock API Constructor

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.5+Mock+API+Construction+Instructions

### Workload Separation

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2.6+Workload+Separation

<h2> Spring 3 </h2>

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.3+Sprint+2%3A+API

<h1 id="3.3"> 3.3 Web Application (working) </h1>

### Digital Prototype

Digital Prototype Package is able to download via below link:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/4+Prototypes


### Viewing Projects

As a coordinator, access your home page to view all imported projects.

### Importing Projects

As a coordinator, select projects that coordinator wants to import. The coordinator can search through the search bar for the project name that he/she wants to import, and then select the project name. The project is automatically loaded into the select project area below, allowing the coordinator to select multiple projects at once. Then click Import button to import multiple items at once. And all imported projects will show the name of the project, Confluence Link, in the table below.

Please note that the subject selection bar are currently not functional.

### Viewing Specific Imported Project

As a coordinator or a supervisor who is managing the team in question, click on the button under that team's ID column to access the details about that team. Currently, this button is hardcoded to link to team SP's details and will need to be extended in order to view the details of any team.

### Team Configuration Page (to do)

As a coordinator or a supervisor who is managing the team in question, you may update the team configuration by clicking on the 'Configuration' button on the sidebar. Here the URLs for each of the team's tools should be set (currently not implemented). The account names/ emails for each team member's Slack and github accounts must be set in order to access their individual details in the 'Individual Contribution' section.

### Viewing Team's Process Quality (to do)

As a coordinator or a supervisor who is managing the team in question, you may view a team's Process Quality by clicking on the 'Process Quality' button on the sidebar. Currently, you will be required to provide JIRA login details (PLEASE NOTE: these details are not securely encrypted currently!!!) that have access to the team's JIRA space each time you access this page. Here information about how the team has progressed with the project in terms of their processes should be displayed. As of now, current data on the breakdown of the team's JIRA tickets will be shown only.

### Viewing Team's Communication Quality (to do)

As a coordinator or a supervisor who is managing the team in question, you may view a team's Communication Quality by clicking on the 'Communication Quality' button on the sidebar. Authorization to access these details is currently hardcoded to use Team SP's Slack token. This token will need to be set in the configuration file to access any given team's Slack space information. Here information about how the team has communicated regarding the project will be displayed. 

Currently this feature is not properly bug fixed. Testing has shown that it only occasionally renders or pulls the Slack data correctly. The Both the backend and frontend code will need to be examined to bug fix this.

As of now, information regarding the number of messages sent by the team in all channels with over 20 messages will be shown graphically. This information can be filtered based on the sprint.

### Viewing Team Individuals' Contribution (to do)

As a coordinator or a supervisor who is managing the team in question, you may view a team's Individual Contributions by clicking on the 'Individual Contribution' button on the sidebar. Here the details for how each individual from the team has contributed to the project should be shown. 

Currently, this feature is not working as intended - it crashes upon trying to display the Radar Charts for all members of the team, or simply does not pull data for any tools besides Git. This is because authorization to access Slack, JIRA and Confluence are currently done manually. Login details for these tools should be stored in the database for a Coordinator or Supervisor user so that they can seamlessly use the API for accessing Slack, JIRA and Confluence without needing to manually login.

<h1 id="4.0"> 4.0 Contributing / Extending </h1>

v1: 15/11/2020

<h1 id="4.1"> 4.1 APIs </h1>

### API versions (to do)

The currently available API endpoints are written in "TeamSPBackend/api/urls_v1.py" in the backend repository. To create a new or updated set of API endpoints, create a new "urls_vX.py" for version X and add the corresponding version path in 'urlpatterns' in the "TeamSPBackend/api/urls.py" file.

### Structuring files (to do)

To create new APIs or extend existing ones, kindly put the API endpoints (URLs) in "TeamSPBackend/api/urls_vX.py" (for version X) with their corresponding API functions. Kindly refer to "TeamSPBackend/api/urls_v1.py" for more info.

The functions called by the API endpoints are created and reside in "TeamSPBackend/api/views". For example, the functions related to any Team APIs reside in "TeamSpBackendd/api/views/team.py". The functions for Confluence and JIRA APIs reside in their own sub-folders ("TeamSPBackend/api/views/confluence" & "TeamSPBackend/api/views/jira") as they are comprised of multiple files.

The database models for the objects used in our APIs are written as modules of their own in "TeamSPBackend".

To create new models and/or APIs utilizing them, kindly follow the current directory structure and format:

- Database models in its own module. E.g. "TeamSPBackend/newModel/" containing the files "app.py" and "models.py"
- Functions for new APIs under "TeamSPBackend/api/views/". E.g. "TeamSPBackend/api/views/newModel.py"
- API endpoints (URLs) in "TeamSPBackend/api/urls_vX.py" for version X
- For any API functions that require multiple files, put those files under a sub-folder in "TeamSPBackend/api/views/". E.g. "TeamSPBackend/api/views/newModel/"

<h1 id="4.2"> 4.2 Web Application (to do)</h1>

### Calling APIs

Please see /_services/user.service.js for API interfaces.

### Viewing Project list

Relevant files are: /CoordinatorPage/CoordinatorHomePage.js & /CoordinatorPage/CoordinatorHomePage.css 



### Importing Projects

Relevant files are: /CoordinatorPage/ImportProjectPage.js & /CoordinatorPage/ImportProjectPage.css

As of now, this page has not been able to be tested for abitrary projects, since confluence access to the project page of the project being imported is required. We only have access to the SP project page so have tested it with this project and it importss into the system successfully.

Currently, Confluence login in needed to be provided everytime. (PLEASE NOTE: these details are not securely encrypted currently!!!) This is due to the database not storing the login details for a user. There should be a settings page added to the web application to allow the user to input their Atlassian login so that it can be used for authorization automatically.
Relevant fields in the User table of the database already exist. API do not exist. 

### Inviting Supervisors

Relevant files are all found within the /ManageSupervisor/ folder.

Currently, this feature is working as intended and extensions can be made by making updates to the files in the above path.

### Assigning Supervisors to Projects

Relevant files are: /CoordinatorPage/CoordinatorHomePage.js & /CoordinatorPage/CoordinatorHomePage.css

Currently, this feature is working as intended. However, an edit supervisor button would be good to have. All relevant database field and API are available to make this change.

### Viewing Project Team

Relevant files are: /ProjectPage/ProjectHomePage.js & /ProjectPage/ProjectHomePage.css

Currently, this feature is working, however it requires polish. A Get Team button must be clicked in order to view the team. Ideally, it should automatically display. A button for updating the team (which calls the Confluence API to update the team member list) needs to be implemented.

### Team Configuration Page

Relevant files are /ProjectPage/ProjectSettingsPage.js & /ProjectPage/ProjectSettingsPage.css

Currently, this page is missing the fields to input a project team's URLs/ token for accessing their respective tools. The fields to input the slack email/ github account name for each teammember are present, however there is no way to submit these to the backend for processing/ storing in the database. Some APIs are developed to undertake these tasks (See the API Documentation), however they are not fully functional.

Also, an extension required for this feature is the functionality of adding multiple github accounts per user. This will require changes to the database and/or the API.

### Viewing Team's Product Quality

Currently, this feature was pushed to a future release. Requirements for this page/ feature are illustrated in the below user stories:

[Product Quality User Stories](https://github.com/Jarrent/CIS_SP_frontend/blob/master/productQuality.PNG)

### Viewing Team's Process Quality

Relevant files are: /qualityPages/ProcessQualityPage.js and /qualityPages/ProcessQualityPage.css

Currently, this feature is incomplete. It is missing the filtering by Sprint feature, because the JIRA APIs did not support filtering tickets by sprint/ date. These APIs will need to be updated first. Secondly, it is missing the link between JIRA data and GIT data. Please see the Digital Prototype for a better illustration of the expected behaviour for this page.

Additionally, similar to the issue with authorization we have run into with the 'Import Projects' feature, the user will need to log in before accessing this feature. Once that fix is implemented, this page should function without needing the login. PLEASE NOTE: these details are not securely encrypted currently!!!

### Viewing Team's Communication Quality

Relevant files are: /qualityPages/CommunicationQualityPage.js and /qualityPages/CommunicationQualityPage.css

Currently, this page is functioning as requested. It may have some integration issues with connecting to the configuration page data since it is currently using the Slack token for Team SP's workspace. The slack token will need to be inputted on the configuration page and stored by the system, so that the user is authorized to pull data from the team's slack channel.

Similar to the issue with authorization we have run into with the 'Import Projects' feature, the user will need to log in before accessing this feature. Once that fix is implemented, this page should function without needing the login.

### Viewing Team Individuals' Contribution

Relevant files are: /qualityPages/IndividualContributionPage.js and /qualityPages/IndividualContributionPage.css

Currently, this page is not functioning as requested. Authorisation to access Atlassian and Slack tools needs to be built into the system to be automatic. Currently, information required for authorisation is not built into the user's data nor are there any APIs to facilitate this. Each time data is accessed from the software engineering tools, authorisation to access the data needs to be provided - that is why no data is able to be automatically pulled. (Similar issue as above in Team Process quality and Importing projects feature.

<h1 id="5.0"> 5.0 Architecture Diagrams </h1>

### Use Case Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.1+Use+Case+Diagram

### Domain Model

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.2+Domain+Model

### Process Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.3+Process+Diagram

### Communication Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.4+Communication+Diagram
