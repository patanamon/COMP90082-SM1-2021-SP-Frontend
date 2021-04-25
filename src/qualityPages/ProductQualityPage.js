import React from 'react';
import './ProductQualityPage.css';
import { storeGet, storePut } from '../_helpers/helper-funcs.js';
import uomHeader from '../header/uomheader.js';
import Banner from "../_utils/Banner";
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import 'react-confirm-alert/src/react-confirm-alert.css';


class ProductQualityPage extends React.Component {
    //This is just as an example to populate the table
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            teamId: 1,
            product_quality: [ { all: 221552, classes: 0, decst: 2345, excst: 345654, file: 23, func: 23, pre: 67, ratio: 568 }
            ],//mock data
        }
        this.reFetch = this.reFetch.bind(this);
    }

    componentDidMount() {
        this.setState({ teamId: 1 })
        this.reFetch()
    }

    //not modified yet
    async reFetch() {
        console.log(this.state)
        let teamId = this.state.teamId
        await this.props.getTeamList(teamId)
        let teamList = storeGet("teamList")
        console.log(teamList)

        if (teamList == null) return
        let product_quality = []
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
            product_quality.push(setting)
            localStorage.removeItem("setting")
        })
        console.log(product_quality)
        this.setState({ product_quality: product_quality });
    }

    renderTableData() {
        console.log(this.state)

        return this.state.product_quality.map((item, index) => {
            console.log(item)
            const { all, classes, decst, excst, file, func, pre, ratio} = item
            return (
                <td key={all}>
                    <tr><td>{"Number of all lines"}</td>{all}</tr>
                    <tr><td>{"Number of classes"}</td>{classes}</tr>
                    <tr><td>{"Number of declarible statements"}</td>{decst}</tr>
                    <tr><td>{"Number of excutable statements"}</td>{excst}</tr>
                    <tr><td>{"Number of files"}</td>{file}</tr>
                    <tr><td>{"Number of functions"}</td>{func}</tr>
                    <tr><td>{"Number of preprocessor lines"}</td>{pre}</tr>
                    <tr><td>{"Ratio of comment lines to code lines"}</td>{ratio}</tr>
                </td>
            )
        })
    }

    render() {
        return (
            <div class="uomcontent">
                {uomHeader("Product Quality")}
                <div role="main">
                    <div className="page-inner">
                    <Banner projName="2021-SM1-Software-Project-Database" />
                        <div>
                            <table id='codematrix' class="zebra" data-sortable="">
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
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

function convert(key){
    if(key == "all")return "Number of all lines"
    if(key == "classes")return "Number of classes"
    if(key == "decst")return "Number of declarible statements"
    if(key == "excst")return "Number of excutable statements"
    if(key == "file")return "Number of files"
    if(key == "func")return "Number of functions"
    if(key == "pre")return "Number of preprocessor lines"
    if(key == "ratio")return "Ratio of comment lines to code lines"
}

const actionCreators = {
    getTeamList: userActions.getTeamList,
    getConfiguration: userActions.getConfiguration,
    setConfiguration: userActions.setConfiguration,
}

const ProductQuality = connect(mapState, actionCreators)(ProductQualityPage);
export { ProductQuality as ProductQualityPage };
