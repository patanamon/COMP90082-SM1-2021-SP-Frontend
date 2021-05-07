import React from 'react';
import Banner from '../_utils/Banner';
import uomHeader from '../header/uomheader';
import {userActions} from '../_actions';
import { connect } from 'react-redux';
import Table from '../_utils/Table';

class CommunicationPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            

            columns: [
                {
                    name: "Meeting Name",
                    selector: "title",
                },
                
                {
                    name: "Meeting Minutes",
                    selector: "link",
                    cell: row => <a href={row.link}>{row.link}</a>,
                }
            ],

        };
    }

    componentDidMount(){
        this.props.getTeamConfluenceMeeting("COMP900822021SM1SP");
    }


    render() {
        return(
            <div className="uomcontent">
                {uomHeader("Communication")}

                <div role="main">
                    <div className="page-inner">
                        <Banner projName="2021-SM1-Software-Project-Database" />     
                        <Table columns={this.state.columns} data={this.props.confluenceData} width={"80vw"} title={""}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    
    return {
      confluenceData: state.user.teamConfluenceMeeting,
      
    };
  }
  
  const actionCreators = {
    getTeamConfluenceMeeting: userActions.getTeamConfluenceMeeting,
  };


const Communication = connect(mapState, actionCreators)(CommunicationPage);
export { Communication as CommunicationQualityPage};
