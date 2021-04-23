import React from 'react';
import Banner from '../_utils/Banner';
import LineChart from '../_utils/LineChart'; 
import ButtonGroup from '../_utils/ButtonGroup';
import uomHeader from '../header/uomheader';
import {userActions} from '../_actions';
import { connect } from 'react-redux';
import { commonConstants } from '../_constants';
import Table from '../_utils/Table';

class CommunicationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamID : 1,

            confluenceMeeting: [ {id:1, meetingName: "Frontend 23/04/21 meeting", meetingTime: "23/04/21", meetingMinutes: '#' }], 

            btnNames: [
                commonConstants.CONFLUENCE,
                commonConstants.GITHUB,
            ],

            btnSelected : commonConstants.CONFLUENCE,

            columns: [
                {
                    name: "Meeting Name",
                    selector: "meetingName",
                },
                {
                    name: "Meeting Time",
                    selector: "meetingTime",
                },
                {
                    name: "Meeting Minutes",
                    selector: "meetingMinutes",
                }
            ],

            githubData : {
                labels: ["01/03", "10/03", "20/03", "30/03", "09/04", "19/04"],
                datasets : [
                    {
                        label : "Number of Comments",
                        data : [10, 20, 30, 40, 50, 70]
                    }
                ],
            }

        };
        this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
        
    }

    handleBtnGroupClick(e) {
        let selected = e.currentTarget.firstChild.innerHTML;
        this.setState({
            btnSelected: selected
        });
      }


    render() {
        return(
            <div className="uomcontent">
                {uomHeader("Communication")}

                <div role="main">
                    <div className="page-inner">
                        <Banner projName="2021-SM1-Software-Project-Database" />
                        <ButtonGroup 
                            btnNames={this.state.btnNames}
                            clickHandler={this.handleBtnGroupClick}
                        />
                        {
                            this.state.btnSelected === commonConstants.GITHUB &&
                                <LineChart data={this.state.githubData}/>
                        }
                        {
                            this.state.btnSelected === commonConstants.CONFLUENCE &&
                                <Table columns={this.state.columns} data={this.state.confluenceMeeting} title={""}/>
                        }
                    </div>
                </div>

            </div>
        )
    }
}

function mapState(state) {
    const {username, offset} = state;
    return {username, offset};
}

const actionCreators = {
    getTeamList: userActions.getTeamList,
    getConfiguration: userActions.getConfiguration,
    setConfiguration: userActions.setConfiguration,
}

const Communication = connect(mapState, actionCreators)(CommunicationPage);
export { Communication as CommunicationQualityPage};
