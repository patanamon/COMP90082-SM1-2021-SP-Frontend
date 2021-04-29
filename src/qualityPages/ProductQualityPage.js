import React from "react";
import uomHeader from "../header/uomheader.js";
import Banner from "../_utils/Banner";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import "react-confirm-alert/src/react-confirm-alert.css";
import Alert from "../_utils/Alert";

class ProductQualityPage extends React.Component {
  //This is just as an example to populate the table
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      ProjectName: "2021-SM1-Software-Project-Database",
      CodeMetrics: [
        {
          all: 1,
          classes: 0,
          decst: 0,
          excst: 0,
          file: 0,
          func: 0,
          pre: 0,
          ratio: 0,
        },
      ], //mock data*/
    };

    this.handleMatrix = this.handleMatrix.bind(this);
  }

  handleMatrix(e) {
    this.props.getTeamProductPages("COMP900822021SM1SP");
  }

  componentDidMount() {
    this.props.getTeamProductPages("COMP900822021SM1SP");
  }

  render() {
    console.log(this.state.CodeMatrix);
    console.log(this.props.productqualityData);
    const data = this.props.productqualityData;
    const columns1 = [
      {
        name: "Number of all lines",
        selector: "all",
        center: Boolean(true),
      },
      {
        name: "Number of classes",
        selector: "classes",
        center: Boolean(true),
      },
      {
        name: "Number of declarible statements",
        selector: "decst",
        center: Boolean(true),
      },
      {
        name: "Number of excutable statements",
        selector: "excst",
        center: Boolean(true),
      },
    ];
    const columns2 = [
      {
        name: "Number of files",
        selector: "file",
        center: Boolean(true),
      },
      {
        name: "Number of functions",
        selector: "func",
        center: Boolean(true),
      },
      {
        name: "Number of preprocessor lines",
        selector: "pre",
        center: Boolean(true),
      },
      {
        name: "Ratio of comment lines to code lines",
        selector: "ratio",
        center: Boolean(true),
      },
    ];
    const customStyles = {
      headCells: {
        style: {
          fontSize: "20px",
          background: "#EEEEEE",
        },
      },
      cells: {
        style: {
          fontSize: "20px",
        },
      },
    };

    return (
      <div className="uomcontent">
        {uomHeader("Product Quality")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="2021-SM1-Software-Project-Database" />
            {this.props.productqualityData && this.props.productqualityData.length != 0 && (
              <DataTable
                customStyles={customStyles}
                columns={columns1}
                data={this.props.productqualityData}
              />
            )}
            {this.props.productqualityData && this.props.productqualityData.length != 0 && this.props.productqualityData && (
              <DataTable
              customStyles={customStyles}
              columns={columns2}
              data={this.props.productqualityData}
            />
            )}
            {(!this.props.productqualityData || this.props.productqualityData.length == 0) && (
              <Alert/>
            )}
          </div>
        </div>
      </div>
    );
  }

  /*renderTableData() {
        console.log(this.props.productqualityData)
        const codematrix = this.state.CodeMatrix
        return codematrix.map((item, index) => {
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
    }*/

  /*render() {
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
    }*/
}

function mapState(state) {
  return {
    productqualityData: state.user.teamProductPages,
  };
}

const actionCreators = {
  getTeamProductPages: userActions.getTeamProductPages,
};

const ProductQuality = connect(mapState, actionCreators)(ProductQualityPage);
export { ProductQuality as ProductQualityPage };

