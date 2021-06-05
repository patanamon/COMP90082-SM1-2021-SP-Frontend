

      This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# COMP90082 Software Project - Software Project Databases

This project aims to have a software system that automatically gathers and summarise all aspects of the software engineering activities of CIS (Computing and Information Systems) Software Projects (COMP90082) developed. This will allow course coordinators to monitor and promptly provide meaningful feedback to teams, improve the quality of processes used in development and software systems developed, thus ensuring software deployment at the end of every project.


# Table of Contents
[1.0 Project Overview](#1.0)

[2.0 Deployment](#2.0)

[3.0 Usage](#2.0)

  * [3.1 Database](#3.1)

  * [3.2 API Documentation](#3.2)

  * [3.3 Digital Prototype](#3.3)

[4.0 Contributing / Extending](#4.0)

  * [4.1 APIs](#4.1)

  * [4.2 Web Application](#4.2)
 
[5.0 Architecture Diagrams](#5.0)

[6.0 Change Log](#6.0)

<h1 id="1.0"> 1.0 Project Overview </h1>

## Background

Software Projects Subject (COMP90082) is the subject for students to perform necessary Software Engineering practices to successfully build a high-quality software product for real-world clients. To monitor, evaluate, and provide feedback to students, a supervisor will observe the Software Projects activities of a student team through the software development tools used and through student-supervisor meetings. The involved software development tools include a Version Control System (Git, GitHub/BitBucket/GitLab), a Task Management Tool (JIRA/Trello) and a Documentation tool (Confluence). Some processes would be considered to assess students include Software Testing, Code Review, Continuous Integration, and Deployment.

## Problem

The tools and processes that students use for these projects (as stated in Background) are diverse and are all accessed on different websites/platforms. Currently, supervisors have to manually open each tool to analyse the complete tasks on each of them. It is an inefficient and tedious process, especially if a supervisor monitors more than ten teams. Although some development tools (e.g., JIRA) provide visual summaries of a team's work, the visualisation only shows data from a single activity. Thus, it is difficult and time-consuming for supervisors to offer detailed and insightful feedback to students, especially if a supervisor has more than one team to supervise.

## Project

This project aims to have a software system that automatically gathers and summarise all aspects of the software engineering activities of CIS (Computing and Information Systems) Software Projects (COMP90082) developed. This will allow course coordinators to monitor and promptly provide meaningful feedback to teams, improve the quality of processes used in development and software systems developed, thus ensuring software deployment at the end of every project.

<h1 id="2.0"> 2.0 Deployment </h1>

## Overview 

The Software Project application is developed by JavaScript in the front-end and Python3 Django framework and MySQL databases in the back-end.

The steps for installing and deploying Software Project easily is as follows:

### 1. To start a front-end for developing:

1. install npm, can refer to https://www.npmjs.com/get-npm  
2. Install the front-end project, in CLI:  npm install   
3. npm start  The front-end is now running on hhttp://18.167.74.23:18000/api/v1  

### 2. To start a back-end for developing:

1. Install Python3.7 and MySQL  
2. Install all packages needed pip install -r requirements.txt (Do not install another version of packages which can help you miss many unwanted mistakes) If multiple version of python are installed, use python3 and pip3 or python3.x and pip3.x instead.  
3. Start MySQL server on localhost:3306, and create a database named "sp90013", i.e., run "CREATE DATABASE sp90013;"  
4. Modify the MySQL username and password config in TeamSPBackend/settings/dev.py and TeamSPBackend/settings/prod.py (don't forget to modify 'DATABASES/default/TEST/PASSWORD' in prod.py)  
5. Create MySQL tables python manage.py migrate. If the database changes, use command python manage.py makemigrations to update metadata of database, then python manage.py migrate to update database structure.  
6. Start server python manage.py runserver,  the back-end is now running on http://127.0.0.1:8000/  


## Available Scripts

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

<h1 id="3.0"> 3.0 Usage </h1>


<h1 id="3.1"> 3.1 Database </h1>

### Database Schema:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1.0+Database+schema


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


## Sprint 1: 

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

## Sprint 2:

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.3+Sprint+2%3A+API

<h1 id="3.3"> 3.3 Digital Prototype </h1>

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


## 2. Viewing Team's Process Quality

In process quality page includes statistical and/or graphical summaries on sprint velocity and burndown, documentation on Confluence, code review frequency and coverage and code commits. 
For software engineering tools include GitHub, JIRA and Confluence.
Here is the link to the UI of the process quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-3.Processquality

## 3. Viewing Team's Product Quality
In product quality page includes statistical and/or graphical summaries by code analysed tool (TBC) on: Code quality, Test code quality. For Software Engineering tools include Git (Team's choice of GitHub, GitLab or Bitbucket).
Here is the link to the UI of the product quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-4.Productquality 

## 4. Viewing Team's Communication Quality

In communication quality page includes statistical and/or graphical summaries on comments from engineering tools which are GitHub, Confluence.
Here is the link to the UI of the current communication quality page. 
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-5.Communicationquality

## 5. Viewing Team Individuals' Contribution

In individuals' contribution page includes statistical and/or graphical summaries of every team member's activities which are: task completion on JIRA, Code reviews on Git and Documentation contribution on Confluence.
For software engineering tools include Git (Team's choice of GitHub, GitLab or BitBucket), JIRA, and Confluence.
Here is the link to the UI of the current individuals' contribution page.
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-6.Individualcontributionpage

## 6. Team Configuration Page 

As a coordinator, you may update the team configuration by clicking on the 'Configuration' button on the sidebar. Here the URLs for each of the team's tools should be set (currently not implemented). The account names/ emails for each team member's Slack and github accounts must be set in order to access their individual details in the 'Individual Contribution' section.
Here is the link to the UI of the current configuration page.
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team#DesignupdateFrontendteam-7.Configuration

## 7. Login Page

On the Login page, you can log in to the SP project by entering your email address and password. 
Here is the link to the UI of the current login page.
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/Design+update+-+Front-end+team+S2#DesignupdateFrontendteamS2-8.Loginpage


<h1 id="4.0"> 4.0 Contributing / Extending </h1>

<h1 id="4.1"> 4.1 APIs </h1>

### API versions

Sprint 0 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.1+Sprint+0%3A+API

Sprint 1 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.2+Sprint+1%3A+API

Sprint 2 API:
https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/6.3+Sprint+2%3A+API


<h1 id="4.2"> 4.2 Web Application </h1>

## Calling APIs

Relevant file is for API interfaces: 
src/_services/user.service.js

You can use this Url to call the API http://18.167.74.23:18000/api/v1 

## 1. Coordinator Home Page

Relevant files are: 
src/CoordinatorPage/CoordinatorHomePage.js 
& src/CoordinatorPage/CoordinatorHomePage.css 
& src/CoordinatorPage/ImportProjectPage.js
& src/CoordinatorPage/ImportProjectPage.css
& src/CoordinatorPage/ProjectList.js

The project list page shows all the projects that the coordinator is responsible for. Details of the project provide the information of confluence link and "Delete" buttons. The homepage also supports importing projects by a search bar.

## 2. Project Overview Page

Relevant files is: 
src/ProjectPage/ProjectHomePage.js

The form provides student information including student name, student profile, student ID and email address for the project.

## 3. Process Quality Page

Relevant files is: 
src/ProjectPage/ProcessQualityPage.js

This part helps coordinators to evaluate the process quality of the project through Jira, Confluence, and Github. Different buttons present different charts of the tool, and the selected button is dark to let the user know which platform is on the screen. By clicking on the Github filter, coordinators can make a view of the line chart of commit times over time. Jira filter illustrates the line chart of items on the To-do-list. The confluence filter shows the line chart of the number of pages.  

## 4. Product Quality Page

Relevant files is: 
src/ProjectPage/ProductQualityPage.js

This page helps coordinators to evaluate the product quality based on static code analysis. Includes project name and a list of criteria that measures product quality. 

## 5. Communication Page

Relevant files is: 
src/qualityPages/CommunicationQualityPage.js

This page shows the activeness of communication on Confluence and Github. Check the Confluence button, it will show a list of every meeting with meeting time and meeting minutes, the cells of meeting minutes will be links that are able to be clicked. Check the Github card, it will show a line chart of the number of comments over time.

## 6. Individual Contribution Page

Relevant files are: 
src/qualityPages/IndividualContributionPage.js
& src/qualityPages/IndividualContributionPage.css

This page helps coordinators to see the proportion of individual contribution directly. It has a drop-down option bar that has a list of student names to select. The button group of three platforms represents Github, Jira, and Confluence. Check the drop-down option bars to see every student’s contribution in the three channels. The contribution is shown in a pie chart. The pie chart shows the contribution of the selected student.

## 7. Project Configuration Page 

Relevant files is: 
src/ProjectPage/ProjectSettingsPage.js

This page allows the user to check and update the link of Github, Jira. Paste the link of the two channels on this page to get all the information easily on other pages. 

## 8. Login Page 

Relevant files are:
src/LoginRegister/LoginPage.js
& src/LoginRegister/RegisterPage.js

This page is the entry page to an SP project that requires user identification and authentication, performed by entering a username which is an email address and password combination.

<h1 id="5.0"> 5.0 Architecture Diagrams </h1>

### Use Case Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.1+Use+Case+Diagram

### Domain Model

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.2+Domain+Model

### Process Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.3+Process+Diagram

### Communication Diagram

https://confluence.cis.unimelb.edu.au:8443/display/COMP900822021SM1SP/3.4+Communication+Diagram

<h1 id="6.0"> 6.0 Change Log </h1> 


## Version 1: (2021.April.02)
### 2021.3.27  
•	Initial GitHub Project created  
•	Digital Prototype 1.0 Completed  
•	Digital Prototype 2.0 Completed according to Client’s feedback  
### 2021.4.02  
•	Created Data Sample: JSON format in an API level for each API  


## Version 2: (2021.April.30)
### 2021.4.22  
•	Created configure page  
### 2021.4.24  
•	Communication page UI was finished   
•	Updated UI and added showing history function for configure page  
### 2021.4.26  
•	Finished project overview page  
### 2021.4.27  
•	Changed layout for Individual Page  
•	Coordinator homepage completed a part of API connections with backend   
•	Communication quality page can interact with backend locally  
### 2021.4.28  
•	Coordinator Homepage UI updated  
•	Product quality completed API connections  
•	Updated Coordinator Homepage UI  
### 2021.4.29  
•	Updated API code for Individual Contribution Page  
•	Coordinator Home page removed box shadow  
### 2021.4.30  
•	Modified project homepage  
•	Coordinator homepage local API deployment  
•	Project homepage API code completed  


## Version 3: (2021.May.31)

### 2021.5.01  
•	Bug fix communication quality page  
### 2021.5.05  
•	Product quality API unify testing with backend  

### 2021.5.06  
•	Bugfix communication quality page  
### 2021.5.07  
•	Bugfix communication quality page  
•	Added saving git username and password function  
•	Changed the context of the column of meeting minutes to clickable URLs  
### 2021.5.08  
•	Completed Sprint 2 communication quality page  
### 2021.5.13  
•	Coordinator Homepage UI added a drawer for showing student information  
•	Updated API for Configure page  
### 2021.5.28
•	Added input check   
•	Added a no_meeting_minutes alert message  
•	Updated data sample  
