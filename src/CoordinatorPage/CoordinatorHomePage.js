import React, { Component } from 'react';
import './CoordinatorHomePage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import '../unimelb.css';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux'; 
import { userActions } from '../_actions';
import 'react-confirm-alert/src/react-confirm-alert.css';


class CoordinatorHomePage extends Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            subjects:[
                { subjectID : ''},
            ],
            currentSubject: '',  
            year: [
                { year: '' },
            ],
            projects: [
                { id : [], name: [], project_name: [], supervisor: [], secondary_supervisor: [], year: [] }
            ],
            projectHead: [
                { id : [], name: [], project_name: [], supervisor: [], secondary_supervisor: [], year: [] }
            ],
            projectList: [],
            supervisors: {
                ids: []
            },
            offset: '' 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitSupervisor = this.handleSubmitSupervisor.bind(this);
        this.handleSubmitCoSupervisor = this.handleSubmitCoSupervisor.bind(this);

    }

    // Handle coordinator homepage changes based on the change of subjects
    handleChange(e) {
        var subjectID = e.target.value;
        this.setState({ currentSubject: subjectID });

        const user = storeGet('user');
        const user_id = user.data.account_id;

        this.props.getHomepage(user_id, '');
        this.setState({ projects: storeGet("project_list") });

        this.props.getSupervisors();
        this.setState({ supervisors: storeGet("supervisor_list") });

        // update names of supervisors in storage
        var supervisor_list = storeGet("supervisor_list");
        supervisor_list.forEach((item) => this.props.getSupervisor(item));

    }

    handleSubmitSupervisor(e) {
        e.preventDefault();

        //assigned supervisor update
        let projID = e.target.parentNode.parentNode.firstChild.textContent;
        let superID = e.target.value;

        if (projID != null && superID != null) {
            let projSupervisorID = "proj_" + projID + "_supervisor";
            storePut(projSupervisorID, superID);
            this.props.setSupervisor(projID, superID);
        }

    }

    handleSubmitCoSupervisor(e) {
        e.preventDefault();

        //assigned supervisor update
        let projID = e.target.parentNode.parentNode.firstChild.textContent;
        let cosuperID = e.target.value;

        if (projID != null && cosuperID != null) {
            let projCoSupervisorID = "proj_" + projID + "_cosupervisor";
            storePut(projCoSupervisorID, cosuperID);
            this.props.setCoSupervisor(projID, cosuperID);
        }

    }

    handleSubmit(e) {
        e.preventDefault();

    }

    renderTableHeader() {
        let header = Object.keys(this.state.projectHead[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
     
   
    }

    renderTableData() {
        if (this.state.currentSubject != '') {

            return this.state.projects.map((projects, index) => {
                const { id, name, project_name, supervisor, secondary_supervisor, year } = projects //destructuring

                return (

                    <tr key={id}>
                        <td><a className="button-small brand" href={"/ProjectHomePage"}>{id}</a></td>
                        <td>{name}</td>
                        <td>{project_name}</td>
                        <td>
                            {this.renderSupervisor(supervisor)}
                        </td>
                        <td>
                            {this.renderCoSupervisor(secondary_supervisor)}
                        </td>

                        <td>{year}</td>
                    </tr>

                )
            })
        }
    }

    renderSubjectSelectBar(){

        return this.state.subjects.map((subjects,index) => {
            const { subjectID } = subjects
            return(
                    <div align="center">
                    <label>Choose Subject
                            <select className="form-control" onChange={this.handleChange}>
                            <option value="6">SWEN90013</option>
                            <option value="7">SWEN90014</option>
                            </select>
                        </label>
                        <label>Choose Year
                                <select className="form-control" value={this.state.year} onChange={this.handleChange}>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                            </select>
                        </label>
                    </div>
            )
        })
    }

    renderSupervisor(supervisor) {
        if (supervisor != null) {
            return (
                <div>{supervisor.name}</div>
            )
        }
        else {
            return (
                <select onChange={this.handleSubmitSupervisor}>
                    <option selected value={supervisor}>Assign</option>
                    {this.renderSelectSuper(supervisor)}
                </select>
            )
        }
    }

    renderCoSupervisor(supervisor) {
        if (supervisor != null) {
            return (
                <div>{supervisor.name}</div>
            )
        }
        else {
            return (
                <select onChange={this.handleSubmitCoSupervisor}>
                    <option selected value={supervisor}>Assign</option>
                    {this.renderSelectSuper(supervisor)}
                </select>
            )
        }
    }

    renderSelectSuper(currentSuper) {
        let head = this.state.supervisors;
        return Object.keys(head).map((key, index) => {
            let storeName = "supervisor_" + head[key] + "_name";
            let supervisorName = storeGet(storeName);

            if (key == currentSuper) {
                return (
                    <option selected value={head[key]}>{supervisorName}</option>
                )
            }
            else {
                return (
                    <option value={head[key]}>{supervisorName}</option>
                )
            }
        })
    }

    renderSaveChangesButton(){
        return(
            <td><a className="button-small brand" onClick={this.handleChange}>Save Changes</a></td>
        )
    }


    render() {
        
        return (
            <div class="uomcontent">
                {uomHeader("Coordinator Homepage")}
                    <div role="main">
                        <div className="page-inner">
                            <div>
                                {this.renderSubjectSelectBar()}  
                            </div>
                            <div>                        
                                <table id='projects' class="zebra" data-sortable="">
                                    <tbody>
                                    <tr>{this.renderTableHeader()}</tr>
                                    {this.renderTableData()}
                                    </tbody>
                                </table>
                            </div>
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
    getCoordinatorHomepage: userActions.getCoordinatorHomepage,
    getSupervisor: userActions.getSupervisor,
    setSupervisor: userActions.setSupervisor,
    setCoSupervisor: userActions.setCoSupervisor,
    getSupervisors: userActions.getSupervisors,
    getHomepage: userActions.getHomepage,
}

const homePage = connect(mapState, actionCreators)(CoordinatorHomePage);
export { homePage as CoordinatorHomePage };
