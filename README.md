

      This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# CIS Software Engineering Project System

This project aims to have a software system that automatically gathers and summarise all aspects of the software engineering activities of CIS (Computing and Information Systems) Software Projects (COMP90082) developed. This will allow course coordinators to monitor and promptly provide meaningful feedback to teams, improve the quality of processes used in development and software systems developed, thus ensuring software deployment at the end of every project.


# Table of Contents
[1.0 Project Overview](#1.0)

[2.0 Deployment](#2.0)

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

<h1 id="2.0"> 2.0 Deployment </h1>

<h2> Overview </h2>
The Software Project application is developed by JavaScript in the front-end and Python3 Django framework and MySQL databases in the back-end.

The steps for installing and deploying Software Project easily is as follows:

<h2>1. To start a front-end for developing: </h2>

1. install npm, can refer to https://www.npmjs.com/get-npm  
2. Install the front-end project, in CLI:  npm install   
3. npm start  The front-end is now running on hhttp://18.167.74.23:18000/api/v1  

<h2>2. To start a back-end for developing:</h2>

1. Install Python3.7 and MySQL  
2. Install all packages needed pip install -r requirements.txt (Do not install another version of packages which can help you miss many unwanted mistakes) If multiple version of python are installed, use python3 and pip3 or python3.x and pip3.x instead.  
3. Start MySQL server on localhost:3306, and create a database named "sp90013", i.e., run "CREATE DATABASE sp90013;"  
4. Modify the MySQL username and password config in TeamSPBackend/settings/dev.py and TeamSPBackend/settings/prod.py (don't forget to modify 'DATABASES/default/TEST/PASSWORD' in prod.py)  
5. Create MySQL tables python manage.py migrate. If the database changes, use command python manage.py makemigrations to update metadata of database, then python manage.py migrate to update database structure.  
6. Start server python manage.py runserver,  the back-end is now running on http://127.0.0.1:8000/  


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
<h2> Sprint 0</h2>

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


<h2> Sprint 1 </h2>

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

<h2> Sprint 2 </h2>

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.3+Sprint+2%3A+API

<h1 id="3.3"> 3.3 Web Application (working) </h1>

### Digital Prototype

Digital Prototype Package is able to download via below link:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/4+Prototypes


## 1. Coordinator Homepage:

In coordinator homepage: Shows the list of team members and their corresponding projects.
A coordinator can Viewing Project, Importing Project and Viewing Specific Imported Project.
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-1.Coordinatorhomepage 

### 1.1 Viewing Projects

As a coordinator, access your home page to view all imported projects.

### 1.2 Importing Projects

As a coordinator, select projects that coordinator wants to import. The coordinator can search through the search bar for the project name that he/she wants to import, and then select the project name. The project is automatically loaded into the select project area below, allowing the coordinator to select multiple projects at once. Then click Import button to import multiple items at once. And all imported projects will show the name of the project, Confluence Link, in the table below.

Please note that the subject selection bar are currently not functional.

### 1.3 Viewing Specific Imported Project

As a coordinator, click on the specific project name to access the details about that team. Currently, this button is hardcoded to link to team SP's details and will need to be extended in order to view the details of any team.

## 2. Viewing Team's Product Quality
In product quality page includes statistical and/or graphical summaries by code analysed tool (TBC) on: Code quality, Test code quality. For Software Engineering tools include Git (Team's choice of GitHub, GitLab or Bitbucket).
Here is the link to the UI of the product quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-4.Productquality 

## 3. Team Configuration Page 

As a coordinator, you may update the team configuration by clicking on the 'Configuration' button on the sidebar. Here the URLs for each of the team's tools should be set (currently not implemented). The account names/ emails for each team member's Slack and github accounts must be set in order to access their individual details in the 'Individual Contribution' section.

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-7.Configuration

## 4. Viewing Team's Process Quality

In process quality page includes statistical and/or graphical summaries on sprint velocity and burndown, documentation on Confluence, code review frequency and coverage and code commits. 
For software engineering tools include GitHub, JIRA and Confluence.
Here is the link to the UI of the process quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-3.Processquality

## 5. Viewing Team's Communication Quality

In communication quality page includes statistical and/or graphical summaries on comments from engineering tools which are GitHub, Confluence.
Here is the link to the UI of the current communication quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-5.Communicationquality

## 6. Viewing Team Individuals' Contribution

In individuals' contribution page includes statistical and/or graphical summaries of every team member's activities which are: task completion on JIRA, Code reviews on Git and Documentation contribution on Confluence.
For software engineering tools include Git (Team's choice of GitHub, GitLab or BitBucket), JIRA, and Confluence.
Here is the link to the UI of the current individuals' contribution page.
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-6.Individualcontributionpage


<h1 id="4.0"> 4.0 Contributing / Extending </h1>

v1: 15/11/2020

<h1 id="4.1"> 4.1 APIs </h1>

### API versions

Sprint 0 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1+Sprint+0%3A+API

Sprint 1 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2+Sprint+1%3A+API

Sprint 2 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.3+Sprint+2%3A+API


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
