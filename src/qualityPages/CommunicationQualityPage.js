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

        };
        this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
        
    }

    handleBtnGroupClick(e) {
        let selected = e.currentTarget.firstChild.innerHTML;
        if (selected === commonConstants.CONFLUENCE) {
          this.props.getTeamConfluenceMeeting("COMP900822021SM1SP");
        } else  {
          this.props.getTeamGitHubComments("COMP900822021SM1SP");
        } 
        this.setState({
          btnSelected: selected,
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
                                <LineChart data={this.props.githubData}/>
                        }
                        {
                            this.state.btnSelected === commonConstants.CONFLUENCE &&
                                <Table columns={this.state.columns} data={this.state.confluenceData} title={""}/>
                        }
                    </div>
                </div>

            </div>
        )
    }
}

function mapState(state) {
    console.log(state.user.teamGitHubComments);
    return {
      confluenceData: state.user.teamConfluenceMeeting,
      githubData: state.user.teamGitHubComments,
    };
  }
  
  const actionCreators = {
    getTeamGitHubComments: userActions.getTeamGitHubComments,
    getTeamConfluenceMeeting: userActions.getTeamConfluenceMeeting,
  };


const Communication = connect(mapState, actionCreators)(CommunicationPage);
export { Communication as CommunicationQualityPage};
