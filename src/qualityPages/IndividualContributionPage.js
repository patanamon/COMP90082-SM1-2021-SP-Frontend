import React from "react";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
//import { storeGet } from "../_helpers/helper-funcs.js";
import { Tab, Col, Row, Container, Form } from "react-bootstrap";
import ButtonGroup from "../_utils/ButtonGroup";
import { commonConstants } from "../_constants";
import { ToastContainer } from "react-toastify";
import Banner from "../_utils/Banner";
import DonutChart from "../_utils/DonutChart";
import { formatDonutChartDataForOneStudent } from "../_utils/formatDonutChartData"
import DropdownMenus from "../_utils/DropdownMenus";

class IndividualContributionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      btnNames: [
        commonConstants.CONFLUENCE,
        commonConstants.GITHUB,
        commonConstants.JIRA,
      ],
      btnSelected: commonConstants.CONFLUENCE,

      selectedStudent: "All",
    }

    this.selectStudent = this.selectStudent.bind(this);
    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
  }

  handleBtnGroupClick(e) {
    let picked = e.currentTarget.firstChild.innerHTML;
    if (picked === commonConstants.CONFLUENCE) {
        this.props.getConfluenceIndividualData("COMP900822021SM1SP");
        
    } else if (picked === commonConstants.GITHUB) {
        this.props.getGithubIndividualData("COMP900822021SM1SP");
    } else {
        this.props.getJiraIndividualData("COMP900822021SM1SP");
    }
    this.setState({
        btnSelected: picked
    });
  }

  selectStudent(e) {
    this.setState({ selectedStudent: e.target.value });
  }

  componentDidMount() {
    this.props.getConfluenceIndividualData("COMP900822021SM1SP");
    
  }

  render() {
    if (typeof this.props.individualConfluenceData !== "undefined") {
    return (
      <div className="uomcontent">
        <ToastContainer limit={1} />
        {uomHeader("Individual Contribution Page")}
        <div role="main">
          <div className="page-inner">
          <Banner projName="2021-SM1-Software-Project" />
            <Container>
              <Tab.Container id="left-tabs-example">
                <Row>
                  <Col>
                  <ButtonGroup
                    btnNames={this.state.btnNames}
                    clickHandler={this.handleBtnGroupClick}
                  />
                  </Col>
                  <Col>
                      {this.state.btnSelected === commonConstants.CONFLUENCE && (
                        <DropdownMenus data={this.props.individualConfluenceData.labels} onChange={this.selectStudent} />
                      )}
                      {this.state.btnSelected === commonConstants.GITHUB && (
                          <DropdownMenus data={this.props.individualGithubData.labels.slice().push("All")} onChange={this.selectStudent} />
                      )}

                      {this.state.btnSelected === commonConstants.JIRA && (
                     <DropdownMenus data={this.props.individualGithubData.labels.slice().push("All")} onChange={this.selectStudent} />
                      )}
                    </Col>
                  <Col>
                
                    {this.state.btnSelected === commonConstants.CONFLUENCE && (
                    <DonutChart data={formatDonutChartDataForOneStudent(this.props.individualConfluenceData, this.state.selectedStudent)} />
                    )} 
                    {this.state.btnSelected === commonConstants.GITHUB && (
                    <DonutChart data={formatDonutChartDataForOneStudent(this.props.individualGithubData, this.state.selectedStudent)} />
                    )}
                    {this.state.btnSelected === commonConstants.JIRA && (
                    <DonutChart data={formatDonutChartDataForOneStudent(this.props.individualJiraData, this.state.selectedStudent)} />
                    )}
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="uomcontent">
      {uomHeader("Individual Contribution Page")}

      <div role="main">
          <div className="page-inner">
              <Banner projName="2021-SM1-Software-Project-Database" />     
             
          </div>
      </div>
  </div>
    )
  }
}
}

function mapState(state) {
    return{
        individualGithubData: state.user.individualGitHubCommits,
        individualConfluenceData: state.user.individualConfluencePages,
        individualJiraData: state.user.individualJiraCounts
    };
}

const actionCreators = {
    getGithubIndividualData: userActions.getGithubIndividualData,
    getConfluenceIndividualData: userActions.getConfluenceIndividualData,
    getJiraIndividualData: userActions.getJiraIndividualData
};

const Product = connect(mapState, actionCreators)(IndividualContributionPage);
export { Product as IndividualContributionPage };
