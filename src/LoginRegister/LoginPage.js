import React from 'react';
import Banner from "../_utils/Banner";
import uomHeader from '../header/uomheader.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { ToastContainer } from "react-toastify";
import CircularProgress from '@material-ui/core/CircularProgress';

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

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            role: -1,
            submitted: false,
            // This info stand for the user is a valid user in the backend database
            validUser: false,
            loading: false
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
        this.setState({loading : true})
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, validUser, role } = this.state;
        const {loading} = this.state;
        return (
            <div className="uomcontent">
                {uomHeader("Welcome to SP")}
                <div role="main">
            <div className="page-inner">
                <Banner projName="Login with your username/email and your password"/>
                <form name="form">
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username" style={label}>Username or Email</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} style={input}/>
                        {submitted && !username &&
                            <div className="help-block">Username or Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password" style={label}>Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} style={input}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {/*login button hardcoded for the client meeting, needs to be changed when login feature is implemented*/}
                        <a className="button brand" onClick={this.handleSubmit} >Login</a>
                        {/*<Link to="/RegisterPage" manuallyclassName="btn btn-link">Update Password</Link>*/}
                        {loggingIn &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {loading && <CircularProgress size={68} />}
                </form>
            </div>
                </div>
                <ToastContainer limit={1} />
            </div>
        );
    }
}


function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};


const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
