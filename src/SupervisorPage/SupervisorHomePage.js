import React, { Component } from 'react';
import './SupervisorHomePage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import '../unimelb.css';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';



class SupervisorHomePage extends Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            subjects: [
                { subjectID: '' },
            ],
            currentSubject: '',
            year: [
                { year: '' },
            ],
            projects: [
                { name: '', proj_id: ''}
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle coordinator homepage changes based on the change of subjects
    handleChange(e) {
        var subjectID = e.target.value;
        this.setState({ currentSubject: subjectID });

        const user = storeGet('user');
        const user_id = user.data.account_id;

        this.props.getHomepage(user_id, '');
        
        // setting the projects in component state
        const copy = storeGet("project_list");
        const len = copy.length;
        var i;
        for (i = 0; i < len; i++) {
            var teamData = {};
            teamData.name = copy[i].name;
            teamData.proj_id = copy[i].proj_id;
            this.state.projects[i] = teamData;
        }
        console.log("TESTTTTT");   
        console.log(this.state.projects);
    }

    handleSubmit(e) {
        e.preventDefault();

    }



    renderTableHeader() {
        let header = Object.keys(this.state.projects[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.projects.map((projects, index) => {
            const { name, proj_id } = projects //destructuring
            return (
                <tr key={name}>
                    <td>{name}</td>
                    {/*need to link using project details*/}
                    <td><a class="button-small brand" href={"/ProjectHomePage"}>{proj_id}</a>{' '}</td>
                </tr>
            )
        })
    }

    renderSubjectSelectBar() {

        return this.state.subjects.map((subjects, index) => {
            const { subjectID } = subjects
            return (
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

    render() {
        return (
            <div className="uomcontent">
                {uomHeader("Supervisor Homepage")}
                <div role="main">
                    <div className="page-inner">
                        <div>
                            {this.renderSubjectSelectBar()}
                        </div>
                        <table id='projects' className="zebra" data-sortable="">
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
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
    getHomepage: userActions.getHomepage,
}

const homePage = connect(mapState, actionCreators)(SupervisorHomePage);
export {homePage as SupervisorHomePage};