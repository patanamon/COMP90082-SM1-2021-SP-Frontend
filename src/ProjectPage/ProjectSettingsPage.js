import React from 'react';
import Banner from "../_utils/Banner";
import './ProjectSettingsPage.css';
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
           confluenceWebsite: "https://confluence.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
           githubWebsite: "https://bitbucket.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
           jiraWebsite: "https://jira.cis.unimelb.edu.au:8443/display/SWEN900132020SP",
               
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
        
        const web = {
            confluenceWebsite : this.state.confluenceWebsite,
            githubWebsite: this.state.githubWebsite,
            jiraWebsite: this.state.jiraWebsite,
        }
        console.log(web)
        alert('submitted: ' + this.state.confluenceWebsite);
        alert('submitted: ' + this.state.githubWebsite);
        alert('submitted: ' + this.state.jiraWebsite);

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
