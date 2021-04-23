import React from 'react';
import Banner from '../_utils/Banner';
import LineChart from '../_utils/LineChart'; 
import ButtonGroup from '../_utils/ButtonGroup';
import { storeGet } from '../_helpers/helper-funcs';
import uomHeader from '../header/uomheader';
import {userActions} from '../_actions';
import { connect } from 'react-redux';
import { commonConstants } from '../_constants';

class CommunicationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teamID : 1,

            confluenceMeeting : [{meetingName : "Frontend 23/04/21 meeting", time : "23/04/21", meetingMinutes: '#' }], 

            confluenceHeader : [
                {meetingName: [], time : [], meetingMinutes : []}
            ],

            btnNames: [
                commonConstants.CONFLUENCE,
                commonConstants.GITHUB,
            ],

            githubData : {
                labels: ["01/03", "10/03", "20/03", "30/03", "09/04", "19/04"],
                datasets : [
                    {
                        label : "Number of Comments",
                        data : [10, 20, 30, 40, 50, 70]
                    }
                ]
            }

        }
        this.reFetch = this.reFetch.bind(this);
    }

    render() {
        return(
            <div className="uomcontent">
                {uomHeader("Communication")}

                <div role="main">
                    <div className="page-inner">
                        <Banner projName="2021-SM1-Software-Project-Database" />
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
