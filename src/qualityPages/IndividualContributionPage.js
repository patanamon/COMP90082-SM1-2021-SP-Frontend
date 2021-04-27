import React from "react";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
//import { storeGet } from "../_helpers/helper-funcs.js";
import { Nav, Tab, Col, Row, Container, Form } from "react-bootstrap";
import ButtonGroup from "../_utils/ButtonGroup";
import { commonConstants } from "../_constants";
import { ToastContainer } from "react-toastify";
import Banner from "../_utils/Banner";
import DonutChart from "../_utils/DonutChart";

import "./IndividualContributionPage.css";

class IndividualContributionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnNames: [
        commonConstants.CONFLUENCE,
        commonConstants.GITHUB,
        commonConstants.JIRA,
      ],
      btnSelected: commonConstants.CONFLUENCE,
      total: [{ student_id: "", fullname: "" }],
      students : ["All", "Sara1", "Sara2", "Sara3"],
      dataset: {
        git: [
            {
                labels: [
                    'Sara1', 'Sara2', 'Sara3'
                  ],
                datasets: [{
                    label: "All",
                    data: [30, 50, 60],
                    fill: true,
                    backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                              ],
                    hoverOffset: 4
                }]
            },
            {
                labels: [
                    'Sara1'
                  ],
                datasets: [{
                    label: "Sara1",
                    data: [30],
                    fill: true,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara2'
                  ],
                datasets: [{
                    label: "Sara2",
                    data: [50],
                    fill: true,
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara3'
                  ],
                datasets: [{
                    label: "Sara3",
                    data: [60],
                    fill: true,
                    backgroundColor: "rgb(255, 205, 86)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            }
        ],
        jira: [
            {
                labels: [
                    'Sara1', 'Sara2', 'Sara3'
                  ],
                datasets: [{
                    label: "All",
                    data: [58, 89, 85],
                    fill: true,
                    backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                              ],
                    hoverOffset: 4
                }]
            },
            {
                labels: [
                    'Sara1'
                  ],
                datasets: [{
                    label: "Sara1",
                    data: [58],
                    fill: true,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara2'
                  ],
                datasets: [{
                    label: "Sara2",
                    data: [89],
                    fill: true,
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara3'
                  ],
                datasets: [{
                    label: "Sara3",
                    data: [85],
                    fill: true,
                    backgroundColor: "rgb(255, 205, 86)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
        ],
        confluence: [
            {
                labels: [
                    'Sara1', 'Sara2', 'Sara3'
                  ],
                datasets: [{
                    label: "All",
                    data: [78, 90, 45],
                    fill: true,
                    backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                              ],
                    hoverOffset: 4
                }]
            },
            {
                labels: [
                    'Sara1'
                  ],
                datasets: [{
                    label: "Sara1",
                    data: [78],
                    fill: true,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara2'
                  ],
                datasets: [{
                    label: "Sara2",
                    data: [90],
                    fill: true,
                    backgroundColor: "rgb(54, 162, 235)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
            {
                labels: [
                    'Sara3'
                  ],
                datasets: [{
                    label: "Sara3",
                    data: [45],
                    fill: true,
                    backgroundColor: "rgb(255, 205, 86)",
                    borderColor: "rgba(75,192,192,1)" 
                }]
            },
        ]
      },
      selected: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.handleBtnGroupClick = this.handleBtnGroupClick.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleBtnGroupClick(e) {
    let picked = e.currentTarget.firstChild.innerHTML;
    if (picked == commonConstants.CONFLUENCE) {
        this.props.getConfluenceIndividualPages("COMP900822021SM1SP");
        console.log(this.props.individualConfluenceData)
    } else if (picked == commonConstants.GITHUB) {
        this.props.getGithubIndividualCommits("COMP900822021SM1SP");
    } else {
        this.props.getJiraIndividualCount("COMP900822021SM1SP");
    }
    this.setState({
        btnSelected: picked
    });
  }

  selectStudent(e) {
    this.setState({ selected: e.target.value });
  }

  render() {
    const {
        students,
      selected,
    } = this.state;

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
            {students.map((student, index) => (
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
                    {this.state.btnSelected == commonConstants.CONFLUENCE && (
                    <DonutChart data={this.state.dataset['confluence'][this.state.selected]} />
                    )} 
                    {this.state.btnSelected == commonConstants.GITHUB && (
                    <DonutChart data={this.state.dataset['git'][this.state.selected]} />
                    )}
                    {this.state.btnSelected == commonConstants.JIRA && (
                    <DonutChart data={this.state.dataset['jira'][this.state.selected]} />
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
        individualGithubData: state.user.individualGithubCommits,
        individualConfluenceData: state.user.individualConfluencePages,
        individualJiraData: state.user.individualJiraCount
    };
}

const actionCreators = {
    getGithubIndividualCommits: userActions.getGithubIndividualCommits,
    getConfluenceIndividualPages: userActions.getConfluenceIndividualPages,
    getJiraIndividualCount: userActions.getJiraIndividualCount
};

const Product = connect(mapState, actionCreators)(IndividualContributionPage);
export { Product as IndividualContributionPage };
