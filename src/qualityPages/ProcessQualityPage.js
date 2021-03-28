import React from 'react';

// import React, { PureComponent } from 'react';
import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Sector, Cell,
} from 'recharts';

import uomHeader from '../header/uomheader.js';
import {userActions} from "../_actions";
import { connect } from 'react-redux';
import {storeGet} from "../_helpers/helper-funcs";


// team name from confluenceç
const teamName = "SWEN90013-2020-SP";
//user is student_id from our db
const user = 9020436;
const t = "Process";

//Chart data
const userChartData = [
    {
        tool: 'Git Commits', val: 75,
    },
    {
        tool: 'Git Pull Requests', val: 50,
    },
    {
        tool: 'Confluence Contribution', val: 75,
    },
    {
        tool: 'Jira Tickets Completed', val: 100,
    },
    {
        tool: 'Slack Messages', val: 125,
    },
];

const teamChartData = [
    {
        tool: 'Git Commits', val: 125,
    },
    {
        tool: 'Git Pull Requests', val: 125,
    },
    {
        tool: 'Confluence Contribution', val: 125,
    },
    {
        tool: 'Jira Tickets Completed', val: 25,
    },
    {
        tool: 'Slack Messages', val: 75,
    },
];

const teamAreaChartData = [
    {
        time: 'Week 1', todo: 125, inProgress: 25, completed: 0,
    },
    {
        time: 'Week 2', todo: 100, inProgress: 50, completed: 25,
    },
    {
        time: 'Week 3', todo: 50, inProgress: 25, completed: 75,
    },
    {
        time: 'Week 4', todo: 0, inProgress: 50, completed: 100,
    },
];

class ProcessQualityPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            presentInfo : "Summary",

            //Empty Jira Team dict to populate
            jiraTeam : {
                team : "",
                count_issues_total : 0,
                count_issues_to_do : 0,
                count_issues_progress : 0,
                count_issues_in_review : 0,
                count_issues_done : 0,
                count_issues_review : 0,

            },

            jiraUser : {
                user : "",
                count_issues_total : 0,
                count_issues_to_do : 0,
                count_issues_progress : 0,
                count_issues_in_review : 0,
                count_issues_done : 0,
                count_issues_review : 0,

            },
            // The conflunece username and password
            confluenceUsername: '',
            confluencePassword: '',
            confluenceLogged: false,
            processSubmitted: false,
            userProcessSubmitted: false,

            //Dummy team data
            team: [
                { name: 'Bach (Supervisor)', individualJira: 'bach.le@unimelb.edu.au' },
                { name: 'Zhaochen Fan', individualJira: 'zhaochenf@student.unimelb.edu.au' },
                { name: 'Yue Yang Ho', individualJira: 'yho4@student.unimelb.edu.au' },
                { name: 'Jinxin Hu', individualJira: 'kinxinh@student.unimelb.edu.au' },
                { name: 'Yu Qiu', individualJira: 'yuqiu1@student.unimelb.edu.au' },
                { name: 'Andre Simmonds', individualJira: 'asimmonds@student.unimelb.edu.au' },
                { name: 'Xinbo Sun', individualJira: 'xinbos@student.unimelb.edu.au' },
                { name: 'Jarren Toh', individualJira: 'jarrent@student.unimelb.edu.au' },
                { name: 'Kairou Wang', individualJira: 'kairouw@student.unimelb.edu.au' },
                { name: 'Lihuan Zhang', individualJira: 'lihuganz@student.unimelb.edu.au' },
                { name: 'Yujun Zhang', individualJira: 'yujuzhang@student.unimelb.edu.au' }
            ]


        };

        this.fetchSummary = this.fetchSummary.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitJira = this.handleSubmitJira.bind(this);
        this.handleSubmitJiraUser = this.handleSubmitJiraUser.bind(this);
        this.handleSubmitConfluenceLogin = this.handleSubmitConfluenceLogin.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
    }

    //Submit function to get Jira Team data and set it in State
    handleSubmitJira(e) {
        this.props.getJiraTeam(teamName);
        this.setState({ jiraTeam: storeGet("jiraTeam") });
        this.setState({processSubmitted: true});

    }

    handleSubmitJiraUser(e) {
        this.props.getJiraUser(teamName, user);
        this.setState({ jiraUser: storeGet("jiraUser") });
        this.setState({userProcessSubmitted: true});

    }

    //Confluence login
    handleSubmitConfluenceLogin(e){
        e.preventDefault();

        this.setState({ confluenceLogged: true });
        const {confluenceUsername,confluencePassword} = this.state;
        this.props.loginConfluence(confluenceUsername,confluencePassword);

    }

    //Redner header for Jira Data
    renderJiraDataHeader(){
        //This one uses data headers, issues with positioning
        // let header = Object.keys(this.state.jiraTeam);
        // return header.map((key, index) => {
        //     return <th key={index}>{key.toUpperCase()}</th>
        // })

        //This header hard coded for better sizing
        let header = ['team', 'total', 'todo', 'progress', 'in_review', 'done', 'review']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
         })
    }

    //Render Jira data
    renderJiraData(){

        var dict = this.state.jiraTeam;
        var tickets = [];

        for (var key in dict) {
            tickets.push(dict[key]);
        }
        return tickets.map((key, index) => {
            return <td key={index}>{key}</td>
        })
    }

    //Redner header for Jira Data
    renderJiraUserDataHeader(){
        //This header hard coded for better sizing
        let header = ['user', 'total', 'todo', 'progress', 'in_review', 'done', 'review']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    //Render Jira user data
    renderJiraUserData(){

        var dict = this.state.jiraUser;
        var tickets = [];

        for (var key in dict) {
            tickets.push(dict[key]);
        }
        return tickets.map((key, index) => {
            return <td key={index}>{key}</td>
        })
    }

    //Example render for team
    renderTeamTableHeader() {
        let header = Object.keys(this.state.team[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTeamTableData() {
        return this.state.team.map((team, index) => {
            const { name, individualJira } = team //destructuring
            return (
                <tr key={name}>
                    <td>{name}</td>
                    <td><a className="button-small brand" onClick={this.handleSubmitJiraUser} >Individual JIRA</a></td>
                </tr>
            )
        })
    }

    getConfluenceSpace(){
        const react_this = this;
        var url = "/api/v1/confluence/space/SWEN900132020SP";
        var data = {
            'space_key' : 'SWEN900132020SP'
        };

        console.log("NANI");

        // HttpRequest.get(url, data, function (response) {
        // 
        //     console.log(response);
        // 
        // });

    }

    //Example radar chart
    renderUserRadar() {
        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={userChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="tool" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name={user} dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        )
    };

    renderTeamRadar() {
        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={teamChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="tool" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name={teamName} dataKey="val" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        )
    };

    renderTeamArea() {
        return (
            <AreaChart
                width={500}
                height={400}
                data={teamAreaChartData}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="todo" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
        )
    };

    renderPieGraph(){

        const data = [
            {name: 'Total', value: this.state.jiraTeam['count_issues_total']},
            {name: 'To Do', value: this.state.jiraTeam['count_issues_to_do']},
            {name: 'In Progress', value: this.state.jiraTeam['count_issues_progress']},
            {name: 'In Review', value: this.state.jiraTeam['count_issues_in_review']},
            {name: 'Done', value: this.state.jiraTeam['count_issues_done']},
            {name: 'Review', value: this.state.jiraTeam['count_issues_review']}
            ];
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B10DC9', '#2ECC40'];

        return (
            <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> )
                    }
                </Pie>
            </PieChart>
        );
    };


    getPagesbyConflueceSpace(){
        const react_this = this;
        var url = "/api/v1/account/login";
        var data = {};

    }

    getAPageAndItsContributors(){


    }

    getAllAccessibleUserGroups(){

    }

    getMembersByUserGroups(){
        
    }

    getAUsersDetails(){

    }

    fetchSummary(e) {
        e.preventDefault();
        console.log("NANI");

        this.setState({ submitted: true });
        const {  presentInfo  } = this.state;
        this.getConfluenceSpace();
        this.getPagesbyConflueceSpace();
        this.getAPageAndItsContributors();
        this.getAllAccessibleUserGroups();

        
    }

    
//OLD FRONT END DESIGN WIHTOUT CONFLUENCE AUTH
    // render(){
    //
    //     const { presentInfo } = this.state;
    //     return (
    //         <div className="uomcontent">
    //             {uomHeader("Process Quality")}
    //             <div role="main">
    //                 <div className="page-inner" align = "center">
    //                     <QualityPage
    //                         team={teamName}
    //                         qType={t}
    //                     />
    //                     <div>
    //                         {this.renderJiraDataHeader()}
    //                     </div>
    //                     <div>
    //                         {this.renderJiraData()}
    //                     </div>
    //                     <a className="button cta" onClick={this.fetchSummary} >Summary</a>
    //                     <a className="button cta" onClick={this.handleSubmit2} >Confluence</a>
    //                     <a className="button cta" onClick={this.handleSubmitJira} >Jira</a>
    //                     <a className="button cta" onClick={this.handleSubmit4} >Code Process</a>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    //NEW FRONT END WITH CONFLUENCE AUTH
    render(){
        const {confluenceLogged, processSubmitted, userProcessSubmitted, confluenceUsername, confluencePassword} = this.state;
        return (

            <div className="uomcontent">
                {uomHeader("Process Quality")}
                <div role="main">
                    <div className="page-inner">
                        <form action="" method="get">
                            { (!confluenceLogged) &&
                            <fieldset>
                                <div className={'form-group' + (confluenceLogged && !confluenceUsername ? ' has-error' : '')}>
                                    <label htmlFor="username">Confluence Username</label>
                                    <input type="text" className="form-control" name="confluenceUsername" value={confluenceUsername} onChange={this.handleChange} />
                                    {confluenceLogged && !confluenceUsername &&
                                    <div className="help-block">Confluence Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (confluenceLogged && !confluencePassword ? ' has-error' : '')}>
                                    <label htmlFor="password">Confluence Password</label>
                                    <input type="password" className="form-control" name="confluencePassword" value={confluencePassword} onChange={this.handleChange} />
                                    {confluenceLogged && !confluencePassword &&
                                    <div className="help-block">Confluence Password is required</div>
                                    }
                                    {hint2()}
                                    <a className="button cta" onClick={this.handleSubmitConfluenceLogin} >Confluence Login</a>
                                </div>
                            </fieldset>
                            }
                            { confluenceLogged &&
                            <fieldset>
                                <div className="inline attached">
                                    {/*<table id='team' className="zebra" data-sortable="">*/}
                                        {/*<h2>Team Member List</h2>*/}
                                        {/*<tbody>*/}
                                        {/*<tr>{this.renderTeamTableHeader()}</tr>*/}
                                        {/*{this.renderTeamTableData()}*/}
                                        {/*</tbody>*/}
                                    {/*</table>*/}
                                    <a className="button cta" onClick={this.handleSubmitJira} >Team JIRA</a>
                                    {this.renderPieGraph()}
                                    {/*{this.renderTeamArea()}*/}
                                </div>
                            </fieldset>
                            }

                            { confluenceLogged && processSubmitted &&
                            <table id='projects' className="zebra">
                                <tbody>
                                <tr>{this.renderJiraDataHeader()}</tr>
                                {this.renderJiraData()}
                                </tbody>
                                {/*{this.renderTeamRadar()}*/}
                            </table>
                            }

                            { confluenceLogged && userProcessSubmitted &&
                            <table id='projects' className="zebra">
                                <tbody>
                                <tr>{this.renderJiraUserDataHeader()}</tr>
                                {this.renderJiraUserData()}
                                </tbody>
                                {/*{this.renderUserRadar()}*/}
                            </table>
                            }
                        </form>
                    </div>
                </div>
            </div>


        );

    }
}

function hint2(){
    return(
        <p id="hint2">
            You need to input your Confluence username and password first,
            then this system can fetch data from Confluence.
        </p>
    )
}

function mapState(state) {
    // const { username, offset } = state;
    // return { username, offset };
    const { subjectName, name} = state;
    return { subjectName, name };
}

const actionCreators = {
    loginConfluence: userActions.loginConfluence,
    getJiraTeam: userActions.getJiraTeam,
    getJiraUser: userActions.getJiraUser,
    getHomepage: userActions.getHomepage,
}

const qualityPage = connect(mapState, actionCreators)(ProcessQualityPage);
export {qualityPage as ProcessQualityPage};
// export default ProcessQualityPage;