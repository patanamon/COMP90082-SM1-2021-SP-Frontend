import React from 'react';
import Banner from '../_utils/Banner';
import LineChart from '../_utils/LineChart'; 
import ButtonGroup from '../_utils/ButtonGroup';
import { storeGet } from '../_helpers/helper-funcs';
import uomHeader from '../header/uomheader';
import {userActions} from '../_actions';
import { connect } from 'react-redux';

class CommunicationPage extends React.Component {
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
