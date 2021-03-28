import React from 'react';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { storeGet,} from '../_helpers/helper-funcs.js';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const user = 9020435;
const team = 1;
const messageMin = 20;

class CommunicationQualityPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            projectName: '',
            submitted: false,
            slack:'',
            slackTeam: '',
            authorHeader:[
                { authorName: '', pagesPerAuthor: []}
              ],
            pagesPerMember : "pages per person",
            sprint:'0',
            graphicData:[
                {chanelName: 'total Commits', num: 0},
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitSlack = this.handleSubmitSlack.bind(this);
    }

    handleChange(e) {
        // const { name, value } = e.target;
        // this.setState({ [name]: value });
        var newSprint = e.target.value;
        this.setState({sprint: newSprint});
    }

    handleSubmitSlack(e) {
        // this.props.getSlackUser(team, user);
        // this.setState({slack: storeGet("slackUser")});

        this.props.getSlackTeam(team, this.state.sprint);
        this.setState({slackTeam: storeGet("slackTeam")});

        this.setState({ submitted: true });
    }
    renderSlackDataHeader(){
        //This header hard coded for better sizing
        let header = ['cis-software-project-system', 'general', 'random', 'meeting-records', 'meetings', 'confluence', 'architecture', 'backend', 'frontend', 'presentation', 'testing', 'deadlines', 'endeavour2020', 'ideas', 'slack-api-test-channel', 'another-slack-api-test-channel', 'test-api-slack'];
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    renderSlackData(){

        var dict = this.state.slackTeam;
        var messages = [];

        for (var key in dict) {
            messages.push(dict[key]);
        }
        return messages.map((key, index) => {
            return <td key={index}>{key}</td>
        })
    }

    renderGraphHeading(){

        var dict = this.state.slackTeam;
        var channels = [];

        for (var key in dict) {
            if (dict[key] >= messageMin && key != 'sprint_end' && key != 'sprint_start' && key != 'total_number'){
                channels.push(key);
            }
        }
        return channels.map((key, index) => {
            return <td key={index}>{key}</td>
        })
    }

    renderGraphData(){

        var dict = this.state.slackTeam;
        var channels = [];

        for (var key in dict) {
            if (dict[key] >= messageMin && key != 'sprint_end' && key != 'sprint_start' && key != 'total_number'){
                channels.push(dict[key]);
            }
        }
        return channels.map((key, index) => {
            return <td key={index}>{key}</td>
        })
    }

    renderGraph(){
        var dict = this.state.slackTeam;
        var channels = [{channel: 'total_number', messages: dict['total_number']}];

        for (var key in dict) {
            if (dict[key] >= messageMin && key != 'sprint_end' && key != 'sprint_start' && key != 'total_number'){
                channels.push({channel: key, messages: dict[key]});
            }
        }
        return channels
    }



    render(){
        const {data, submitted, slack} = this.state;

        return (
            <div className="uomcontent">
                {uomHeader("Communication Quality")}
                <div role="main">
                    <div className="page-inner">
                    <form name="form">   
                    <div>
                        <a className="button cta" onClick={this.handleSubmitSlack} >Fetch Slack</a>           
                   </div>
                        <label>Choose Sprint
                            <select className="form-control" onClick={this.handleChange}>
                                <option value="0">Sprint 0</option>
                                <option value="1">Sprint 1</option>
                                <option value="2">Sprint 2</option>
                                <option value="3">Sprint 3</option>
                                <option value="4">Sprint 4</option>

                            </select>
                        </label>
                   {submitted
                       &&
                       <div>
                    <BarChart
                        width={800}
                        height={400}
                        data={this.renderGraph()}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="channel" scale="point" padding={{ left: 20, right: 20 }} />
                        <YAxis /> 
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="messages" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>


                           <table id='projects' className="zebra">
                               <tbody>
                               {/*<tr>{this.renderSlackDataHeader()}</tr>*/}
                               {/*{this.renderSlackData()}*/}
                               <tr>{this.renderGraphHeading()}</tr>
                               {this.renderGraphData()}
                               </tbody>
                           </table>
                           <h3>Total Number of Messages Team: {this.state.slackTeam['total_number']}</h3>
                           {/*<h3>Total Number of Messages: {this.state.slack['total_number']}</h3>*/}
                           <h3>Sprint No: {this.state.sprint}</h3>

                       </div>
                   }

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


function mapState(state) {
    const { projectName} = state;
    return { projectName };
}

const actionCreators = {
    numPagesPerMember: userActions.numPagesPerMember,
    getSlackUser: userActions.getSlackUser,
    getSlackTeam: userActions.getSlackTeam,
};



const Communication = connect(mapState, actionCreators)(CommunicationQualityPage);
export { Communication as CommunicationQualityPage };