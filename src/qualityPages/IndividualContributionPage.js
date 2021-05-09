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

      selectStudent: "All",
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

  studentListGenerator(type) {
    if (type === commonConstants.JIRA) {
      return this.props.individualJiraData.labels.slice().push("All");
    } else if (type === commonConstants.GITHUB) {
      return this.props.individualGithubData.labels.slice().push("All");
    } 
    return this.props.individualConfluenceData.labels.slice().push("All");
    
  }

  render() {
    const Student = () => {
      return (
        <Form inline>
          <Form.Label
            className="col-sm-3"
            htmlFor="inlineFormCustomSelectPref"   
          >
            Student     :
          </Form.Label>
          <Form.Control
            as="select"
            className="col-sm-5"
            id="inlineFormCustomSelectPref"
            custom
            onChange={this.selectStudent}
          >
            {this.studentListGenerator().map((student, index) => (
              <option key={index} value={index}>{student}</option>
            ))}
          </Form.Control>
        </Form>
      );
    };

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
                  <Col>{Student()}</Col>
                    {this.state.btnSelected === commonConstants.CONFLUENCE && (
                    <DonutChart data={this.state.dataset['confluence'][this.state.selectedStudent]} />
                    )} 
                    {this.state.btnSelected === commonConstants.GITHUB && (
                    <DonutChart data={this.state.dataset['git'][this.state.selectedStudent]} />
                    )}
                    {this.state.btnSelected === commonConstants.JIRA && (
                    <DonutChart data={this.state.dataset['jira'][this.state.selectedStudent]} />
                    )}
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
          </div>
        </div>
      </div>
    );
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
