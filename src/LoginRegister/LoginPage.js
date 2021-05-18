import React from "react";
import Banner from "../_utils/Banner";
import uomHeader from "../header/uomheader.js";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { ToastContainer } from "react-toastify";

const input = {
  width: "642px",
  margin: "10px auto",
  borderRadius: "4px",
  padding: "4px",
};

const label = {
  width: "50px",
  textAlign: "left",
  fontWeight: "bold",
  margin: "10px",
};

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: -1,
      submitted: false,
      validUser: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { username, password, submitted } = this.state;

    return (
      <div className="uomcontent">
        {uomHeader("Welcome to SP")}
        <div role="main">
          <div className="page-inner">
            <Banner projName="Login" />
            <form name="form">
              <div
                className={
                  "form-group" + (submitted && !username ? " has-error" : "")
                }
              >
                <label htmlFor="username" style={label}>
                  Username or Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  style={input}
                />
                {submitted && !username && (
                  <div className="help-block">
                    Username or Email is required
                  </div>
                )}
              </div>
              <div
                className={
                  "form-group" + (submitted && !password ? " has-error" : "")
                }
              >
                <label htmlFor="password" style={label}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  style={input}
                />
                {submitted && !password && (
                  <div className="help-block">Password is required</div>
                )}
              </div>
              <div className="form-group">
                {/*login button hardcoded for the client meeting, needs to be changed when login feature is implemented*/}
                <a className="button brand" onClick={this.handleSubmit}>
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer limit={1} />
      </div>
    );
  }
}

function mapState(state) {
  return { isLogin: state.user.isLogin };
}

const actionCreators = {
  login: userActions.login,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
