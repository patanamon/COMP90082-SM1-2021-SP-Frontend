import React from 'react';
import './ImportProjectPage.css';
import logo from "../unimelb_logo.jpg";
import { storeGet } from '../_helpers/helper-funcs.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';

class ImportProjectPage extends React.Component{
    constructor(props){

      super(props);
      this.state = {
        // The subject Name used to fetch subject from the confluence
        subjectName: '',
        // The returned detail of the group 
        groups:[
          { name: 'SP', import: ''}
        ],
        groupHead:[
          { name: 'SP', import: ''}
        ],
        // The conflunece username and password
        confluenceUsername: '',
        confluencePassword: '',
        confluenceLogged: false,
        subjectNameSubmitted: false,
        groupImported:false
      };


      this.handleSubmitName = this.handleSubmitName.bind(this);
      this.handleSubmitConfluenceLogin = this.handleSubmitConfluenceLogin.bind(this);
      this.handleSubmitImport = this.handleSubmitImport.bind(this);
      this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
      
    }

    handleSubmitConfluenceLogin(e){
      e.preventDefault();

      this.setState({ confluenceLogged: true });
      const {confluenceUsername,confluencePassword} = this.state;
      this.props.loginConfluence(confluenceUsername,confluencePassword);

    }

    // Submit subject Name to return the available project lists
    handleSubmitName(e) {
      e.preventDefault();

      this.setState({ subjectNameSubmitted: true });
      const {subjectName} = this.state;
      this.props.returnProjects(subjectName);
      this.setState({ groups: storeGet("confluenceData") });

    }
    
    // TODO: Submit team name import request
    handleSubmitImport(e){
      e.preventDefault();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(e.target.value);
      this.setState({ groupImported: true });
      const {name} = e.target.value;
      this.props.importProject(e.target.value);


    }

    renderTableHeader() {
      let header = Object.keys(this.state.groupHead[0])
      return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      })
    }
  
    renderTableData() {
      //var data = storeGet("project_list");
      console.log(this.state.groups);
      
      return this.state.groups.map((groups, index) => {
        const { name } = groups //destructuring
        return (
            <tr key={name}>
                <td>{name}</td>
                <td>
                  <button className="button-small brand" value={name} onClick={this.handleSubmitImport}>Import</button>
                </td>     
            </tr>

        )
      })
    }



    render(){    
      const {subjectName, projectDetail, groupImported, confluenceLogged, subjectNameSubmitted, confluenceUsername, confluencePassword} = this.state; 
      return (

        <div className="uomcontent">
        <div role="main">
            {uomHeader("Import Projects")}
            <div className="page-inner">     
              <form action="" method="get">
                { (!confluenceLogged) && (!subjectNameSubmitted) && (!groupImported) &&
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
                { confluenceLogged && (!subjectNameSubmitted) && (!groupImported) &&
                  <fieldset>
                  <input name="Project-Name" type="hidden" value="project-name"/>
                  <div className="inline attached">

                      <input id = "searchBar" value = {subjectName} aria-label="Search" aria-required="true" autoComplete="off" data-error="Please enter a keyword" 
                              name="subjectName" placeholder="Search Project" type="text" onChange={this.handleChange}/>
                    <a className="button cta" onClick={this.handleSubmitName} >Search</a>

                        {/*<span><button className="inline-button">                          
                          <span className="small icon--hide-label" data-icon="search" onClick={this.handleSubmitName}>Go</span>
                        </button></span>*/}
                    
                  </div>
                  {hint()}
                  </fieldset>
                }
                
                { confluenceLogged && subjectNameSubmitted &&
                  <table id='projects' className="zebra" data-sortable=""> 
                      <tbody>
                      <tr>{this.renderTableHeader()}</tr>
                      {this.renderTableData()}
                      </tbody>
                  </table>
                }
              </form>
          </div>
        </div>
      </div>


      );
      
    }


  

}

 
function uomHeader(pageName){
  return (
      <header className="header">
        <img src={logo} className="logo" id="logo" alt="logo"/>
        <h1 id='title'>{pageName}</h1>
      </header>
  )
}

function hint(){
  return(
    <p id="hint">
      Search for a project using its Subject code, year and name.<br/>
      E.g. Try typing SWEN90013_2020
    </p>
  )
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
  const { subjectName, name} = state;
  return { subjectName, name };
}

const actionCreators = {
  loginConfluence: userActions.loginConfluence,
  returnProjects: userActions.returnProjects,
  importProject: userActions.importProject
}


const ManageSupervisor = connect(mapState, actionCreators)(ImportProjectPage);
export { ManageSupervisor as ImportProjectPage };