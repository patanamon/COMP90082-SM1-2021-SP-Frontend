import React from 'react';
import './ProjectSettingsPage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import '../unimelb.css';
import logo from '../unimelb_logo.jpg';
import styles from "../qualityPages/quality.module.css";
import { createStore } from 'redux';
import uomHeader from '../header/uomheader.js';

import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class ProjectSettingsPage extends React.Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            teamId: 1,
            settings: [
            ],
            settingHead: [
                { id: [], name: [], git: [], slack: [] }
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reFetch = this.reFetch.bind(this);

    }

    componentDidMount() {
        this.setState({ teamId: 1 })
        this.reFetch()
    }

    async reFetch() {
        console.log(this.state)
        let teamId = this.state.teamId
        await this.props.getTeamList(teamId)
        let teamList = storeGet("teamList")
        console.log(teamList)
        /*
        let teamList= [
            { student_id: 9020435, fullname: "Andre Simmonds", email:"fake@email.com" },
            { student_id: 9020436, fullname: "Jarren Toh", email: "fake@email.com"},
            { student_id: 9020437, fullname: "Jinxin Hu", email: "fake@email.com"},
            { student_id: 9020438, fullname: "Kairou Wang", email: "fake@email.com" },
            { student_id: 9020439, fullname: "Lihuan Zhang", email: "fake@email.com" },
            { student_id: 9020440, fullname: "Xinbo Sun", email: "fake@email.com" },
            { student_id: 9020441, fullname: "Yue Yang Ho", email: "fake@email.com" },
            { student_id: 9020442, fullname: "Yu Qiu", email: "fake@email.com" },
            { student_id: 9020443, fullname: "YUJUN ZHANG", email: "fake@email.com" },
            { student_id: 9020444, fullname: "Zhaochen Fan", email: "fake@email.com" }
        ]*/

        if (teamList == null) return
        let settings = []
        await teamList.forEach(async (value, index) => {
            await this.props.getConfiguration(teamId, value.student_id)
            let nextSetting = storeGet("setting");
            console.log(nextSetting)
            let setting = {
                id: value.student_id,
                name: value.fullname,
                git: "",
                slack: ""
            }
            if (nextSetting != null) {
                setting['git'] = nextSetting.git_name
                setting['slack'] = nextSetting.slack_email
            }
            settings.push(setting)
            localStorage.removeItem("setting")
        })
        console.log(settings)
        this.setState({ settings: settings });
    }

    handleChange(e) {
        const { name, value } = e.target;
        let a = name.split(".")
        let settings = this.state.settings
        if (a[1] == 'git') {
            settings[a[0]].git = value
        } else if (a[1] == 'slack') {
            settings[a[0]].slack = value
        } 
        this.setState({ settings: settings });
    }

    handleSubmit(e) {
        e.preventDefault();
        let teamId = this.state.teamId
        let settings = this.state.settings
        settings.forEach((value, index) => {
            const { id, name, git, slack } = value
            this.props.setConfiguration(teamId, id, git, slack)
        } )
        console.log("here")
        this.reFetch()
    }

    renderTableHeader() {
        let header = Object.keys(this.state.settingHead[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        console.log(this.state)

        return this.state.settings.map((item, index) => {
            console.log(item)
            const { id, name, git, slack } = item //destructuring
            const nameGit = index + ".git"
            const nameSlack = index + ".slack"
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name={nameGit}
                            value={git}
                            onChange={this.handleChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            name={nameSlack}
                            value={slack}
                            onChange={this.handleChange}
                        />
                    </td>
                </tr>
            )
        })

    }


    renderSaveChangesButton() {
        return (
            <td><a className="button-small brand" onClick={this.handleSubmit}>Save Changes</a></td>
        )
    }


    render() {

        return (
            <div class="uomcontent">
                {uomHeader("Coordinator Homepage")}
                <div role="main">
                    <div className="page-inner">
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
    getTeamList: userActions.getTeamList,
    getConfiguration: userActions.getConfiguration,
    setConfiguration: userActions.setConfiguration,
}

const settingPage = connect(mapState, actionCreators)(ProjectSettingsPage);
export { settingPage as ProjectSettingsPage };
