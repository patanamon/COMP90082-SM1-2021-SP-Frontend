import React from "react";
import { Nav } from "react-bootstrap";
import styles from "./navbar.module.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { commonConstants } from "../_constants";

const NavIcon = styled.div`
  text-align: center;
`;

const NavTitle = styled.p`
  text-align: center;
  font-size: 14px;
  font-family: Lato Regular;
  font-weight: 100;
  color: white;
`;

const BarLayout = styled.div`
  display: grid;
  grid-template-columns: 120px;
  grid-template-rows: repeat(${props => props.number}, auto);
`;

class NavButton extends React.Component {
  render() {
    return [
      <Nav.Link
        bsPrefix
        className={styles.navbutton}
        href={this.props.link}
        key={this.props.identifier}
        onClick={this.props.clickHandler}
      >
        <NavIcon>
          <img className={styles.filterwhite} src={this.props.imgsrc} />
        </NavIcon>
        <NavTitle>{this.props.title}</NavTitle>
      </Nav.Link>,
    ];
  }
}

class GridNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: props.height };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
    this.setState({ height: window.innerHeight + "px" });
  }

  handleResize() {
    this.setState({ height: window.innerHeight + "px" });
  }

  handleClick() {
    this.props.logout();
  }

  render() {
    var isCoorinatorView = false;
    var isProjectView = false;

    var url = GetUrlRelativePath();
    if (url == "/coordinator") {
      isCoorinatorView = true;
    } else if (
      url == "/project" ||
      url == "/product" ||
      url == "/process" ||
      url == "/communication" ||
      url == "/individual" ||
      url == "/config"
    ) {
      isProjectView = true;
      isCoorinatorView = false;
    }

    return (
      <div style={{ backgroundColor: "#014085", minHeight: this.state.height, width: "120px" }}>
        <img
          src="icons/logo.jpg"
          className="logo"
          id="logo"
          alt="logo"
          height="120"
          width="120"
        />
        {isCoorinatorView && (
          <BarLayout number={2}>
            <NavButton
              link="/coordinator"
              imgsrc="icons/home.png"
              title="Home"
              identifier={commonConstants.COORDINATOR_HOME}
            />
            <NavButton
              clickHandler={this.handleClick}
              link="/login"
              imgsrc="icons/logout.png"
              title="Logout"
              identifier={commonConstants.LOGIN}
            />
          </BarLayout>
        )}

        {isProjectView && (
          <BarLayout number={8}>
            <NavButton
              link="/coordinator"
              imgsrc="icons/home.png"
              title="Home"
              identifier={commonConstants.COORDINATOR_HOME}
            />
            <NavButton
              link="/project"
              imgsrc="icons/dashboard.png"
              title="Project"
              identifier={commonConstants.PROJECT_HOME}
            />
            <NavButton
              link="/product"
              imgsrc="icons/product.png"
              title="Product"
              identifier={commonConstants.PRODUCT_QUALITY}
            />
            <NavButton
              link="/process"
              imgsrc="icons/process.png"
              title="Process"
              identifier={commonConstants.PROCESS_QUALITY}
            />
            <NavButton
              link="/communication"
              imgsrc="icons/communication.png"
              title="Communication"
              identifier={commonConstants.COMMUNICATION_QUALITY}
            />
            <NavButton
              link="/individual"
              imgsrc="icons/individual.png"
              title="Individual"
              identifier={commonConstants.INDIVIDUAL_CONTRIBUTION}
            />
            <NavButton
              link="/config"
              imgsrc="icons/config.png"
              title="Configuration"
              identifier={commonConstants.PROJECT_SETTING}
            />
            <NavButton
              clickHandler={this.handleClick}
              link="/login"
              imgsrc="icons/logout.png"
              title="Logout"
              identifier={commonConstants.LOGIN}
            />
          </BarLayout>
        )}
      </div>
    );
  }
}

function GetUrlRelativePath() {
  var url = document.location.toString();
  var arrUrl = url.split("//");

  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

function mapState(state) {
  return {};
}

const actionCreators = {
  logout: userActions.logout,
};

const TempNavbar = connect(mapState, actionCreators)(GridNavbar);
export { TempNavbar as GridNavbar };
