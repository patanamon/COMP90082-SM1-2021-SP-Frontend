import React, { PureComponent }  from 'react';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { storeGet } from '../_helpers/helper-funcs.js';

import {
    Radar, RadarChart, PolarGrid, Legend,
    PolarAngleAxis, PolarRadiusAxis,
  } from 'recharts';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

// import Paper from '@material-ui/core/Paper';
// import {
//     Chart,
//     BarSeries,
//     Title,
//     ArgumentAxis,
//     ValueAxis,
//   } from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';
const team = 1;
const teamName = "SWEN90013-2020-SP";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
class IndividualContributionPage extends React.Component{
    constructor(props){ 
        super(props);
        this.state = {
            
            projectName: '',
            jirasubmitted: false,
            slacksubmitted: false,
            confluencesubmitted: false,
            gitsubmitted: false,
            total: [
                {student_id:'', fullname:''}
            ],
            Data:[
                {name: "Sara1", git: 30, jira: 24, slack: 15, confluence: 61, fill: 'red'},
                {name: "Sara2", git: 20, jira: 44, slack: 25, confluence: 63, fill: 'green'},
                {name: "Sara3", git: 40, jira: 34, slack: 50, confluence: 36, fill: 'blue'},
                {name: "Sara4", git: 50, jira: 19, slack: 25, confluence: 46, fill: 'orange'},
                {name: "Sara5", git: 60, jira: 31, slack: 35, confluence: 56, fill: 'brown'},
            ],
           
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleJiraSubmit = this.handleJiraSubmit.bind(this);
        this.handleSlackSubmit = this.handleSlackSubmit.bind(this);
        this.handleGitSubmit = this.handleGitSubmit.bind(this);
        this.handleConfluenceSubmit = this.handleConfluenceSubmit.bind(this);

    }

    handleChange(e) {
        
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleJiraSubmit(e) {
        
        e.preventDefault();
        const { projectName} = this.state;

        this.props.getTeamList(team);

        if (this.state.jirasubmitted === true) {
            this.setState({ jirasubmitted: false });
        }
        else if (this.state.jirasubmitted === false) {
            this.setState({ jirasubmitted: true });
        }
               
        if(storeGet("teamList")!=null){
            for(var i in storeGet("teamList")){
                // Get the member's configuration

                this.props.getMemberConfiguration(projectName,storeGet("teamList")[i].student_id);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(storeGet("memberConfig"));

                // Get the full name
                this.state.Data[i].name = storeGet("teamList")[i].fullname;
                console.log(this.state.Data[i].name);

                //Get SLACK - need User ID
                this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
                //Get JIRA data - need User ID
                this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

                // TODO
                // Get Git Data - need Git Username, currently hardcoded
                this.props.codeCommitsPerMember(projectName, "zhanglihuan");
                // TODO
                //Get Conflunece Data - need Username, currently hardcoded
                this.props.numPagesPerMember("yujuzhang");

        
                if(storeGet("jiraUser")!=null){
                    this.props.Data[i].jira = storeGet("jiraUser")['count_issues_done'];
                }
            }     
        }
    }


    handleSlackSubmit(e) {
        
        e.preventDefault();
        const { projectName} = this.state;
        if (this.state.slacksubmitted === true) {
            this.setState({ slacksubmitted: false });
        }
        else if (this.state.slacksubmitted === false) {
            this.setState({ slacksubmitted: true });
        }
        this.props.getTeamList(team);
        if(storeGet("teamList")!=null){
            for(var i in storeGet("teamList")){
                // Get the member's configuration

                this.props.getMemberConfiguration(projectName,storeGet("teamList")[i].student_id);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(storeGet("memberConfig"));

                // Get the full name
                this.state.Data[i].name = storeGet("teamList")[i].fullname;
                console.log(this.state.Data[i].name);

                //Get SLACK - need User ID
                this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
                //Get JIRA data - need User ID
                this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

                // TODO
                // Get Git Data - need Git Username, currently hardcoded
                this.props.codeCommitsPerMember(projectName, "zhanglihuan");
                // TODO
                //Get Conflunece Data - need Username, currently hardcoded
                this.props.numPagesPerMember("yujuzhang");
                if(storeGet("slackUser")!=null){
                    this.state.Data[i].slack = storeGet("slackUser")['total_number'];
                }
            }
                
        }
    }
    
    handleGitSubmit(e) {
        
        e.preventDefault();
        const { projectName} = this.state;

        this.props.getTeamList(team);

        if (this.state.gitsubmitted === true) {
            this.setState({ gitsubmitted: false });
        }
        else if (this.state.gitsubmitted === false) {
            this.setState({ gitsubmitted: true });
        }
               
        if(storeGet("teamList")!=null){
            for(var i in storeGet("teamList")){
                // Get the member's configuration

                this.props.getMemberConfiguration(projectName,storeGet("teamList")[i].student_id);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(storeGet("memberConfig"));

                // Get the full name
                this.state.Data[i].name = storeGet("teamList")[i].fullname;
                console.log(this.state.Data[i].name);

                //Get SLACK - need User ID
                this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
                //Get JIRA data - need User ID
                this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

                // TODO
                // Get Git Data - need Git Username, currently hardcoded
                this.props.codeCommitsPerMember(projectName, "zhanglihuan");
                // TODO
                //Get Conflunece Data - need Username, currently hardcoded
                this.props.numPagesPerMember("yujuzhang");

        
                if(storeGet("gitUsers")!=null){
                    this.state.Data[i].gitCommit = storeGet("gitUsers")['total_count'].total;
                }
               
            }     
        }
    }

    handleConfluenceSubmit(e) {
        
        e.preventDefault();
        const { projectName} = this.state;

        this.props.getTeamList(team);

        if (this.state.confluencesubmitted === true) {
            this.setState({ confluencesubmitted: false });
        }
        else if (this.state.confluencesubmitted === false) {
            this.setState({ confluencesubmitted: true });
        }
               
        if(storeGet("teamList")!=null){
            for(var i in storeGet("teamList")){
                // Get the member's configuration

                this.props.getMemberConfiguration(projectName,storeGet("teamList")[i].student_id);
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(storeGet("memberConfig"));

                // Get the full name
                this.state.Data[i].name = storeGet("teamList")[i].fullname;
                console.log(this.state.Data[i].name);

                //Get SLACK - need User ID
                this.props.getSlackUser(team, storeGet("teamList")[i].student_id);
                //Get JIRA data - need User ID
                this.props.getJiraUser(teamName, storeGet("teamList")[i].student_id);

                // TODO
                // Get Git Data - need Git Username, currently hardcoded
                this.props.codeCommitsPerMember(projectName, "zhanglihuan");
                // TODO
                //Get Conflunece Data - need Username, currently hardcoded
                this.props.numPagesPerMember("yujuzhang");

        
                if(storeGet("confluenceUsers")!=null){
                    this.state.Data[i].gitCommit = storeGet("confluenceUsers")['total_count'].total;
                }
               
            }     
        }
    }

    render() {
        const {jirasubmitted} = this.state;
        const {slacksubmitted} = this.state;
        const {gitsubmitted} = this.state;
        const {confluencesubmitted} = this.state;

        return (
            <div className="uomcontent">
                {uomHeader("Individual Contribution Page")}
                <div role="main">
                    <div className="page-inner">
                        <form name="form">   
                            <div>
                                <a className="button cta" onClick={this.handleJiraSubmit} >JIRA</a>
                            </div>
                            {jirasubmitted && 
                            <table id='projects' className="zebra" data-sortable="">
                                <tbody>
                                <tr>{this.renderChartHeader()}</tr>
                                {this.renderChart()}
                                </tbody>
                            </table>   
                            }
                        </form>
                    </div>
                    <div className="page-inner">
                        <form name="slackform">   
                            <div>
                                <a className="button cta" onClick={this.handleSlackSubmit} >SLACK</a>
                            </div>
                            {slacksubmitted && 
                            <table id='projects' className="zebra" data-sortable="">
                                <tbody>
                                <tr>{this.renderSlackChartHeader()}</tr>
                                {this.renderSlackChart()}
                                </tbody>
                            </table>   
                            }
                        </form>
                    </div>
                    <div className="page-inner">
                        <form name="gitform">   
                            <div>
                                <a className="button cta" onClick={this.handleGitSubmit} >GIT</a>
                            </div>
                            {gitsubmitted && 
                            <table id='projects' className="zebra" data-sortable="">
                                <tbody>
                                <tr>{this.renderGitChartHeader()}</tr>
                                {this.renderGitChart()}
                                </tbody>
                            </table>   
                            }
                        </form>
                    </div>
                    <div className="page-inner">
                        <form name="slackform">   
                            <div>
                                <a className="button cta" onClick={this.handleConfluenceSubmit} >CONFLUENCE</a>
                            </div>
                            {confluencesubmitted && 
                            <table id='projects' className="zebra" data-sortable="">
                                <tbody>
                                <tr>{this.renderConfluenceChartHeader()}</tr>
                                {this.renderConfluenceChart()}
                                </tbody>
                            </table>   
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    renderChartHeader() {
        let header = ['JIRA CHART'];//, 'Radar Chart'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      
    }
    
    renderChart(){
        //return this.state.Data.map((Data) => {
        return(
            <tr key="JIRA">
            {/* <td>{Data.name}</td> */}
            <td>
            <PieChart width={500} height={500}>
            <Pie
                dataKey="jira"
                isAnimationActive={true}
                data={this.state.Data}
                cx={300}
                cy={250}
                outerRadius={150}
                fill="#8884d8"
                label
            />
            
            <Tooltip />
            </PieChart>
            {/* <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={this.state.Data}
                >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                    name="JIRA"
                    dataKey="jira"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Legend />
            </RadarChart> */}
            </td>
            </tr>
        )
        //})
    }

    renderSlackChartHeader() {
        let header = ['SLACK CHART'];//, 'Radar Chart'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      
    }
    
    renderSlackChart(){
        //return this.state.Data.map((Data) => {
        return(
            <tr key="SLACK">
            {/* <td>{Data.name}</td> */}
            <td>
            <PieChart width={500} height={500}>
            <Pie
                dataKey="slack"
                isAnimationActive={true}
                data={this.state.Data}
                cx={300}
                cy={250}
                outerRadius={150}
                fill="#8884d8"
                label
            />
            <Tooltip />
            </PieChart>
            {/* <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={this.state.Data}
                >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                    name="SLACK"
                    dataKey="slack"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Legend />
            </RadarChart> */}
            </td>
            </tr>
        )
        //})
    }
    
    renderGitChartHeader() {
        let header = ['GIT CHART'];//, 'Radar Chart'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      
    }
    
    renderGitChart(){
        //return this.state.Data.map((Data) => {
        return(
            <tr key="GIT">
            {/* <td>{Data.name}</td> */}
            <td>
            <PieChart width={500} height={500}>
            <Pie
                dataKey="git"
                isAnimationActive={true}
                data={this.state.Data}
                cx={300}
                cy={250}
                outerRadius={150}
                fill="#fff"
                label
            />
            <Tooltip />
            </PieChart>
            {/* <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={this.state.Data}
                >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                    name="GIT"
                    dataKey="git"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Legend />
            </RadarChart> */}
            </td>
            </tr>
        )
        //})
    }

    renderConfluenceChartHeader() {
        let header = ['CONFLUENCE CHART'];//, 'Radar Chart'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      
    }
    
    renderConfluenceChart(){
        //return this.state.Data.map((Data) => {
        return(
            <tr key="CONFLUENCE">
            {/* <td>{Data.name}</td> */}
            <td>
            <PieChart width={500} height={500}>
            <Pie
                dataKey="confluence"
                isAnimationActive={true}
                data={this.state.Data}
                cx={300}
                cy={250}
                outerRadius={150}
                fill="#8884d8"
                label
            />
            <Tooltip />
            </PieChart>
            {/* <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={this.state.Data}
                >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar
                    name="CONFLUENCE"
                    dataKey="confluence"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                />
                <Legend />
            </RadarChart> */}
            </td>
            </tr>
        )
        //})
    }

}

function mapState(state) {
    
    const { projectName } = state;
    return { projectName };
}

const actionCreators = {
    loginGit: userActions.loginGit,
    totalCodeCommits: userActions.totalCodeCommits,
    codeCommitsPerMember: userActions.codeCommitsPerMember,
    AllPagesOnConfluence: userActions.AllPagesOnConfluence,
    getTeamList: userActions.getTeamList,
    getMemberConfiguration: userActions.getMemberConfiguration,
    getSlackUser: userActions.getSlackUser,
    getJiraUser: userActions.getJiraUser,
    numPagesPerMember: userActions.numPagesPerMember,
};


const Product = connect(mapState, actionCreators)(IndividualContributionPage);
export { Product as IndividualContributionPage };