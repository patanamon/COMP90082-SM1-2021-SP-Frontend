import React from 'react';
import Banner from "../_utils/Banner";
import './ProjectSettingsPage.css';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { storeGet } from "../_helpers/helper-funcs";

const input = {
    width: "600px",
    margin: "10px auto",
    borderRadius: "4px",
    padding: "4px"
  }

const label ={
    width: "50px",
    textAlign: "left", 
    fontWeight: "bold",
    margin: "10px"
}

class ProjectSettingsPage extends React.Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props); 
        
        this.state = { 
        //    confluenceWebsite: "https://confluence.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
        //    githubWebsite: "https://bitbucket.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
        //    jiraWebsite: "https://jira.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
           confluenceWebsite: "",
           githubWebsite: "",
           jiraWebsite: "",       
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    handleChange(e) {
        console.log(e.target.name)
        this.setState({
            [e.target.name] : e.target.value
        })
      }
    
    handleSubmit(e) {
        
        this.setState({confluenceWebsite: e.target.value});
        e.preventDefault()
    }
    

    render() {
        return (
            <div class="uomcontent">
                {uomHeader("Configure")}
                <div role="main">
                    <div className="page-inner">
                        <Banner projName="2021-SM1-Software-Project-Database" />
                        <div className="web">
                            <form onSubmit={this.handleSubmit}>
                                <label style = {label}>
                                Confluence:
                                <input type="text" style={input} value= {this.state.confluenceWebsite} name="confluenceWebsite" onChange={this.handleChange} />   
                                </label>

                                <br />
                            
                                <label style = {label}>
                                Git:    
                                <input type="text" style={input} value= {this.state.githubWebsite} name="githubWebsite" onChange={this.handleChange} />  
                                </label>
                                
                                <br />

                                <label style = {label}>
                                Jira:    
                                <input type="text" style={input} value= {this.state.jiraWebsite} name="jiraWebsite" onChange={this.handleChange} />   
                                </label>    

                                <br />

                                <div id='savechanges'>
                                    <input type="submit" value="Submit" />
                                </div>
                            
                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapState(state) {
    return {
        confluenceWebsite: state.user.configureConfluence,
        githubWebsite: state.user.configureGithub,
        jiraWebsite: state.user.configureJira,
      };
}

const actionCreators = {
    getConfigurationConfluence: userActions.getConfigurationConfluence,
    getConfigurationGit: userActions.getConfigurationGit,
    getConfigurationJira: userActions.getConfigurationJira,
    //setConfiguration: userActions.setConfiguration,
}

const settingPage = connect(mapState, actionCreators)(ProjectSettingsPage);
export { settingPage as ProjectSettingsPage };
