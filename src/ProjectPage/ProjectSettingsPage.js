import React from 'react';
import Banner from "../_utils/Banner";
import './ProjectSettingsPage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import '../unimelb.css';
import logo from '../unimelb_logo.jpg';
import { createStore } from 'redux';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


class ProjectSettingsPage extends React.Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props); 
        
        this.state = { 
           confluenceWebsite: "https://confluence.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
           githubWebsite: "https://bitbucket.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
           jiraWebsite: "https://jira.cis.unimelb.edu.au:8443/display/SWEN900132020SP"          
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        

    }

    handleChange(e) {
        this.setState({value: e.target.value});
      }
    
    handleSubmit(e) {
        e.preventDefault();
    }

    renderTeamTableHeader() {
        let header = Object.keys(this.state.team[0]);
        return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>;
        });
      }
    
    renderTeamTableData() {
    return this.state.team.map((team, index) => {
        const { name, individualJira } = team; //destructuring
        return (
        <tr key={name}>
            <td>{name}</td>
            <td>
            <a
                className="button-small brand"
                onClick={this.handleSubmitJiraUser}
            >
                Individual JIRA
            </a>
            </td>
        </tr>
        );
    });
    }
    
    renderSaveChangesButton() {
        return (
            <td><a className="button-small brand" onClick={this.handleSubmit}>Save Changes</a></td>
        )
    }

    render() {
        return (
            <div class="uomcontent">
                {uomHeader("Configure")}
                <div role="main">
                    <div className="page-inner">
                    <Banner projName="2021-SM1-Software-Project-Database" />
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Confluence:
                        </label>
                        <input type="text" defaultValue={this.state.confluenceWebsite} onChange={this.handleChange} />
                        
                        
                    </form>
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Git: 
                        </label>    
                        <input type="text" defaultValue={this.state.githubWebsite} onChange={this.handleChange} />
                        
                        
                    </form>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                        Jira:  
                        </label>    
                        <input type="text" defaultValue={this.state.jiraWebsite} onChange={this.handleChange} />
                        
                        
                    </form>

                    <div id='savechanges'>
                        {this.renderSaveChangesButton()}
                    </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapState(state) {
    const { username, offset } = state;
    return { username, offset };
}

const actionCreators = {
    getTeamList: userActions.getTeamList,
    getConfiguration: userActions.getConfiguration,
    setConfiguration: userActions.setConfiguration,
}

const settingPage = connect(mapState, actionCreators)(ProjectSettingsPage);
export { settingPage as ProjectSettingsPage };
