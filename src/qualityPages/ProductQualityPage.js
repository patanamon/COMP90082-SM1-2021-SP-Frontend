import React from "react";
import uomHeader from "../header/uomheader.js";
import Banner from "../_utils/Banner";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { InformationalNote } from "../_utils/Alert";
import BarChartPlot from "../_utils/DonutChart";
import { alertConstants } from "../_constants";

class ProductQualityPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ],
      data: [
        {
          all: 10,
          classes: 30,
          decst: 40,
          excst: 50,
          file: 50,
          func: 60,
          pre: 30,
          ratio: 50,
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getTeamCodeMetrics(this.props.currentTeamKey);
  }

  render() {
    const columns1 = [
      {
        name: "Number of all lines",
        selector: "code_lines_count",
        center: Boolean(true),
      },
      {
        name: "Number of classes",
        selector: "class_count",
        center: Boolean(true),
      },
      {
        name: "Number of files",
        selector: "file_count",
        center: Boolean(true),
      },
      {
        name: "Number of functions",
        selector: "function_count",
        center: Boolean(true),
      },
    ];
    const columns2 = [
      {
        name: "Number of comment lines",
        selector: "comment_lines_count",
        center: Boolean(true),
      },
      {
        name: "Ratio of comment lines to code lines",
        selector: "comment_to_code_ratio",
        center: Boolean(true),
      },
      {
        name: "Number of declarible statements",
        selector: "declarative_lines_count",
        center: Boolean(true),
      },
      {
        name: "Number of excutable statements",
        selector: "executable_lines_count",
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
            <Banner projName={this.props.currentTeamName} />
            {this.props.teamCodeMetrics &&
              this.props.teamCodeMetrics.length != 0 && (
                <DataTable
                  customStyles={customStyles}
                  columns={columns1}
                  data={this.state.teamCodeMetrics}
                />
              )}
            {this.props.teamCodeMetrics &&
              this.props.teamCodeMetrics.length != 0 && (
                <DataTable
                  customStyles={customStyles}
                  columns={columns2}
                  data={this.props.teamCodeMetrics}
                />
              )}
            {(!this.props.teamCodeMetrics ||
              this.props.teamCodeMetrics.length == 0) && (
              <InformationalNote message={alertConstants.NO_DATA} />
            )}
            {/* {this.props.teamCodeMetrics &&
              this.props.teamCodeMetrics.length != 0 && (
                <BarChartPlot data={this.props.teamCodeMetrics} />
              )} */}
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
    teamCodeMetrics: state.user.teamCodeMetrics,
    currentTeamKey: state.user.currentTeamKey,
    currentTeamName: state.user.currentTeamName,
  };
}

const actionCreators = {
  getTeamCodeMetrics: userActions.getTeamCodeMetrics,
};

const ProductQuality = connect(mapState, actionCreators)(ProductQualityPage);
export { ProductQuality as ProductQualityPage };
