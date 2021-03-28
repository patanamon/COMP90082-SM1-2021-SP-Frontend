import React from 'react';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { storeGet,} from '../_helpers/helper-funcs.js';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  } from 'recharts';
const team = 1;
const teamName = "SWEN90013-2020-SP";

class IndividualContributionPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            submitted: false,
            total: [
                {student_id:'', fullname:'', student_id:''}
            ],
            // The Array to store the data
            Data:[
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},
                {name: '', gitCommit: '', gitPull: '', jira: '', slack: '', confluence: ''},            
            ],            
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    handleSubmit(e) {
        e.preventDefault();
        const { projectName} = this.state;

        this.props.getTeamList(team);
        this.setState({ submitted: true });
        
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

        
                if(storeGet("commitsPerMember")!=null){
                    this.state.Data[i].gitCommit = storeGet("commitsPerMember").total;
                    // TODO: No pull request in the return value, so using the file_changed in temporary
                    this.state.Data[i].gitPull = storeGet("commitsPerMember").file_changed;
                }


                // console.log(this.state.Data[i].gitCommit);
                // console.log(this.state.Data[i].gitPull);

                if(storeGet("slackUser")!=null){
                    this.state.Data[i].slack = storeGet("slackUser")['total_number'];
                }
                // if(storeGet("jiraUser")!=null){
                //     this.props.Data[i].jira = storeGet("jiraUser")['count_issues_done'];
                // }
                // console.log(storeGet("numPagesPerMember"));
                // if(storeGet("numPagesPerMember")!=null){
                //     this.props.Data[i].confluence = storeGet("numPagesPerMember");
                // }
               
            }
                
        }



    }
    
    render() {
        const {submitted} = this.state;

        return (
            <div className="uomcontent">
                {uomHeader("Individual Contribution Page")}
                <div role="main">
                    <div className="page-inner">
                        <form name="form">   
                            <div>
                                <a className="button cta" onClick={this.handleSubmit} >Fetch</a>
                            </div>
                            {submitted && 
                            <table id='projects' className="zebra" data-sortable="">
                                <tbody>
                                <tr>{this.renderChartHeader()}</tr>
                                {this.renderChart()}
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
        let header = ['Student Name', 'Radar Chart'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
      
    }

    renderChart(){
        
        return this.state.Data.map((Data, index) => {
            return(
                <tr key={Data.name}>
                <td>{Data.name}</td>
                <td>
                <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={
                    [
                        {type: 'Git Commit', num: Data.gitCommit},
                        {type: 'Git Pull Request', num: Data.gitPull},
                        {type: 'Jira Tickets Completed', num: Data.jira},
                        {type: 'Slack Messaging', num: Data.slack},
                        {type: 'Confluence Contribution', num: Data.confluence},
                    ]
                }>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis />
                    <Radar name="Git Overview" dataKey="num" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
                </td>
                </tr>
            )
        })
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